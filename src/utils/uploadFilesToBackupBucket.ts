import { initializeApp } from "firebase/app";
import {
  getBytes,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  type StorageReference
} from "firebase/storage";

async function uploadFile(
  file: Uint8Array | Blob | ArrayBuffer,
  fileName: string
) {
  const destinyFirebaseConfig = {
    apiKey: process.env.DESTINY_API_KEY,
    authDomain: process.env.DESTINY_AUTH_DOMAIN,
    projectId: process.env.DESTINY_PROJECT_ID,
    storageBucket: process.env.DESTINY_STORAGE_BUCKET,
    messagingSenderId: process.env.DESTINY_MESSAGING_SENDER_ID,
    appId: process.env.DESTINY_APP_ID
  };

  const destinyApp = initializeApp(destinyFirebaseConfig, 'Destiny bucket');
  const storage = getStorage(destinyApp);
  const storageRef = ref(storage, fileName);

  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef).then((url) => url);
};

export async function uploadFilesToBackupBucket(folderName: string, fileRef: StorageReference) {
  const FgRed = "\x1b[31m";

  const fileName = fileRef.name;
  console.log(`🚚 Uploading ${fileName} to ${folderName} at backup storage...\n`)

  try {
    const fileBytes = await getBytes(fileRef)
    await uploadFile(fileBytes, `${folderName}/${fileName}`);
    console.log(`✅ ${fileName} uploaded successfully backup storage!!\n`)
  } catch (err) {
    console.log(`❌ ${FgRed} Uh-oh, an error occurred! ${FgRed}`)
    throw new Error(err as string)
  }
}
