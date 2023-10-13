import {
  getBytes,
  getDownloadURL,
  uploadBytes,
  type StorageReference
} from "firebase/storage";
import { colorize } from "./colorize.js";
import { getDestinyRef } from "./getRefs.js";

async function uploadFile(
  file: Uint8Array | Blob | ArrayBuffer,
  fileName: string
) {
  const storageRef = await getDestinyRef(fileName);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef).then((url) => url);
};

export async function uploadFilesToBackupBucket(folderName: string, fileRef: StorageReference) {
  const fileName = fileRef.name;
  console.log(`🚚 Uploading ${colorize(fileName, 'bgGreen')} to ${colorize(folderName, 'bgGreen')} at backup storage...\n`)

  try {
    const fileBytes = await getBytes(fileRef)
    await uploadFile(fileBytes, `${folderName}/${fileName}`);
    console.log(`✅ ${colorize(fileName, 'bgGreen')} uploaded successfully backup storage!!\n`)
  } catch (err) {
    console.log(`❌ ${colorize('Uh-oh, an error occurred!', 'fgRed')}`)
    throw new Error(err as string)
  }
}
