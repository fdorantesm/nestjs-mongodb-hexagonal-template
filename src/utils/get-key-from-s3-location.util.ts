export function getKeyFromS3Location(url: string): string {
  const regex = /https?:\/\/(.+?)\/(.+)/;
  const match = url.match(regex);
  if (!match) {
    return '';
  }

  const path = match[2];

  if (match[1].endsWith('.amazonaws.com')) {
    if (match[1].startsWith('s3.')) {
      return path.split('/').slice(1).join('/');
    }
    return path;
  }

  if (/^(127.0.0.1|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}):(\d+)/.test(match[1])) {
    return path.split('/').slice(1).join('/');
  }

  const subdomain = match[1].split('.')[0];
  if (subdomain.includes('s3')) {
    return path.split('/').slice(1).join('/');
  }
  return path.slice(1);
}
