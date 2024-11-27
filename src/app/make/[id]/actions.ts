"use server";

import crypto from "crypto";

import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { baseURL } from "@/lib/utils/constants";

// utilities
const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");
export const computeSHA256 = async (file: File) => {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
};

// create s3 client
const s3Client = new S3Client({
  region: process.env.AWS_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_KEY!,
  },
});

const acceptedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const maxFileSize = 1024 * 1024 * 10; // 10MB

export async function getSignedUploadUrl(
  type: string,
  size: number,
  checksum: string
) {
  if (!acceptedTypes.includes(type)) return { failure: "Invalid file type" };
  if (size > maxFileSize) return { failure: "File too large" };

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: generateFileName(),
    ContentType: type,
    ContentLength: size,
    ChecksumSHA256: checksum,
    Metadata: {},
  });
  const signedURL = await getSignedUrl(s3Client, putObjectCommand, {
    expiresIn: 60,
  });

  return { success: { url: signedURL } };
}

export async function deleteImageById(id: string) {
  const deleteObjectCommand = new DeleteObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: id,
  });
  const signedURL = await getSignedUrl(s3Client, deleteObjectCommand, {
    expiresIn: 60,
  });
  await fetch(signedURL, {
    method: "DELETE",
  });
}

export async function getUploadedImageURL(file: File) {
  try {
    if (file) {
      const checksum = await computeSHA256(file);

      // get AWS S3 url
      const signedURLResult = await getSignedUploadUrl(
        file.type,
        file.size,
        checksum
      );

      if (signedURLResult.failure !== undefined) {
        return signedURLResult.failure;
      }
      const url = signedURLResult.success.url;

      // upload image using url
      await fetch(url, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      return url.split("?")[0];
    }
  } catch (e) {
    console.log(e);
    return `Error: ${e}`;
  }
}

export async function updateWrapPage(id: string, data: object) {
  try {
    const res = await fetch(`${baseURL}/api/wrap?id=${id}`, {
      method: "PUT",
      body: JSON.stringify({ query: data }),
    });
    return await res.json();
  } catch (e) {
    console.log(e);
    return e;
  }
}
