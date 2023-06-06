import { Injectable } from '@nestjs/common';
import { InjectS3, S3 } from 'nestjs-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { GetObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';

@Injectable()
export class S3Service {
  constructor(
    @InjectS3()
    private readonly s3: S3,
  ) {}

  public async headObject(bucket: string, key: string) {
    const file = await this.s3.headObject({
      Bucket: bucket,
      Key: key,
    });

    return {
      contentLength: file.ContentLength,
      contentType: file.ContentType,
      contentEncoding: file.ContentEncoding,
    };
  }

  public async upload(
    key: string,
    buffer: Buffer,
    bucket?: string,
    options?: Partial<PutObjectCommandInput>,
  ): Promise<void> {
    await this.s3.putObject({
      Key: key,
      Bucket: bucket,
      Body: buffer,
      ...options,
    });
  }

  public getLocation(bucket: string, key: string, region?: string, endpoint?: string): string {
    let baseUrl = '';

    if (endpoint) {
      baseUrl = `${endpoint}/${bucket}`;
    } else {
      baseUrl = `https://${bucket}.s3${region ? `.${region}` : ''}.amazonaws.com`;
    }

    return `${baseUrl}/${key}`;
  }

  public async getSignedUrl(bucket: string, key: string): Promise<string> {
    const signedUrl = await getSignedUrl(
      this.s3,
      new GetObjectCommand({
        Bucket: bucket,
        Key: key,
      }),
    );

    return signedUrl;
  }

  public async deleteObject(bucket: string, key: string): Promise<boolean> {
    await this.s3.deleteObject({
      Key: key,
      Bucket: bucket,
    });

    return true;
  }
}
