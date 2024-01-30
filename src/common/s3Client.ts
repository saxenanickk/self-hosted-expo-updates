import { S3Client } from "@aws-sdk/client-s3";
import { accessKey, bucketRegion, secretAccessKey } from "./s3Constants";

export const s3Client = new S3Client({
  region: bucketRegion,
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
});
