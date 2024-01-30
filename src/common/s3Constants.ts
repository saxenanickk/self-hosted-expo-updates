import dotenv from "dotenv";

dotenv.config();

export const bucketName: any = process.env.BUCKET_NAME;
export const bucketRegion: any = process.env.BUCKET_REGION;
export const accessKey: any = process.env.ACCESS_KEY;
export const secretAccessKey: any = process.env.SECRET_ACCESS_KEY;
