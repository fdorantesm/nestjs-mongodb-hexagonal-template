#!/bin/bash

if [ -z "$DOCKER_REGISTRY_URI" ]; then
    echo "Error: DOCKER_REGISTRY_URI variable is not defined"
    exit 1
fi

if [ -z "$COMPOSE_PROJECT_NAME" ]; then
    echo "Error: COMPOSE_PROJECT_NAME variable is not defined"
    exit 1
fi

get_remote() {
    echo $(docker image ls --filter "reference=$PUBLISH_TAG" --format "{{.Repository}}:{{.Tag}}")
}

get_tag() {
    BRANCH=$(git branch --show-current)

    if [ "$BRANCH" == "main" ] || [ "$BRANCH" == "master" ]; then
        echo ""
    elif [ "$BRANCH" == "develop" ]; then
        echo "develop"
    else
        echo "$BRANCH"
    fi
}

TAG=$(get_tag)
VERSION=$(awk -F'"' '/"version": ".+"/{ print $4; exit; }' package.json)
DOCKER_REGISTRY_HOST=$(echo $DOCKER_REGISTRY_URI | awk -F/ '{print $1}')
REGION=$(echo $DOCKER_REGISTRY_URI | awk -F[/.] '{print $4}')
HASH=$(git rev-parse HEAD)
IMAGE_NAME=$COMPOSE_PROJECT_NAME

if [ -n "$TAG" ]; then
    IMAGE_NAME="$IMAGE_NAME:$TAG-$HASH"
    REGISTRY_IMAGE_TAG=$DOCKER_REGISTRY_URI:$TAG
    PUBLISH_TAG=$REGISTRY_IMAGE_TAG-$HASH
else
    IMAGE_NAME="$IMAGE_NAME:$HASH"
    REGISTRY_IMAGE_TAG=$DOCKER_REGISTRY_URI:$HASH
    PUBLISH_TAG=$REGISTRY_IMAGE_TAG
fi


if [ -z "$IMAGE_NAME" ]; then
    echo "There's no local image to delete"
else
    docker rmi $IMAGE_NAME
fi

if [ -z $(get_remote) ]; then
    echo "There's no remote tag to delete"
else
    docker rmi $(get_remote)
fi

docker build --platform linux/amd64 -t $IMAGE_NAME .
docker tag $IMAGE_NAME $PUBLISH_TAG
aws ecr get-login-password --region $REGION --profile $1 | docker login --username AWS --password-stdin $DOCKER_REGISTRY_HOST
docker push $PUBLISH_TAG

UNTAGGED_IMAGES=$(aws ecr list-images --no-cli-pager --region $REGION --profile $1 --repository-name $COMPOSE_PROJECT_NAME --filter "tagStatus=UNTAGGED" --query 'imageIds[*].[imageDigest]' --output text | sed -e 's/^/imageDigest=/')

if [ -z "$UNTAGGED_IMAGES" ]; then
    echo "There's no remote images to delete"
else
    aws ecr batch-delete-image --no-cli-pager --region $REGION --profile $1 --repository-name $COMPOSE_PROJECT_NAME --image-ids $UNTAGGED_IMAGES >/dev/null
fi

for image in $(get_remote); do
    docker rmi -f "$image"
done
