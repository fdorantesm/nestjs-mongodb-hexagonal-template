export type SesConfiguration = {
  from: string;
  region?: string;
  credentials: {
    accessKey: string;
    secretAccessKey: string;
  };
  bcc?: string[];
};
