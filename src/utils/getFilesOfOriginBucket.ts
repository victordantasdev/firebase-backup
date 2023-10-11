import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getStorage, listAll, ref } from "firebase/storage";

export async function getFilesOfOriginBucket() {
  const originFirebaseConfig = {
    apiKey: process.env.ORIGIN_API_KEY,
    authDomain: process.env.ORIGIN_AUTH_DOMAIN,
    projectId: process.env.ORIGIN_PROJECT_ID,
    storageBucket: process.env.ORIGIN_STORAGE_BUCKET,
    messagingSenderId: process.env.ORIGIN_MESSAGING_SENDER_ID,
    appId: process.env.ORIGIN_APP_ID
  };

  const originApp = initializeApp(originFirebaseConfig);
  const storage = getStorage(originApp);
  const listRef = ref(storage);

  const auth = getAuth(originApp);
  await signInAnonymously(auth);

  return listAll(listRef);
}
