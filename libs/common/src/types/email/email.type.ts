export type EmailConfig = {
  from: string;
  region?: string;
  credentials: {
    publicKey: string;
    secretKey: string;
  };
  bcc?: string[];
};
