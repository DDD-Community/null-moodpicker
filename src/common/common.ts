import AWS from "aws-sdk";
import { S3Secret } from "../secret";
import jwt_decode from "jwt-decode";

export const BASE_URL = "https://www.moodof.net";

export const getQueryVariable = (query: string, variable: string) => {
  const vars = query.split('&');
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    if (decodeURIComponent(pair[0]) == variable) {
      return decodeURIComponent(pair[1]);
    }
  }
  console.log('Query variable %s not found', variable);
}

export const imageUpload = async (base64: string, token: string) => {
  const { ACCESS_KEY_ID, SECRET_ACCESS_KEY, AWS_REGION, S3_BUCKET } = S3Secret;

  AWS.config.setPromisesDependency(require("bluebird"));
  AWS.config.update({ accessKeyId: ACCESS_KEY_ID, secretAccessKey: SECRET_ACCESS_KEY, region: AWS_REGION });

  const s3 = new AWS.S3();

  // @ts-ignore
  const base64Data = new Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ""), 'base64');

  const type = base64.split(';')[0].split('/')[1];

  // @ts-ignore
  const userId = jwt_decode(token).sub;
  const params = {
    Bucket: S3_BUCKET,
    Key: `${userId}-${new Date()}.${type}`,
    Body: base64Data,
    ACL: 'public-read',
    ContentEncoding: 'base64',
    ContentType: `image/${type}`
  }

  let location = '';
  let key = '';
  try {
    const { Location, Key } = await s3.upload(params).promise();
    location = Location;
    key = Key;
  } catch (error) {
    console.log(error)
  }
  return location;
}