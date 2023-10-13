import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";

export async function getOriginRef() {
  const config = {
    apiKey: process.env.ORIGIN_API_KEY,
    authDomain: process.env.ORIGIN_AUTH_DOMAIN,
    projectId: process.env.ORIGIN_PROJECT_ID,
    storageBucket: process.env.ORIGIN_STORAGE_BUCKET,
    messagingSenderId: process.env.ORIGIN_MESSAGING_SENDER_ID,
    appId: process.env.ORIGIN_APP_ID
  };


  const app = initializeApp(config, 'ORIGIN');
  const storage = getStorage(app);
  const auth = getAuth(app);
  await signInAnonymously(auth);
  return ref(storage);
}

export async function getDestinyRef(fileName?: string) {
  const config = {
    apiKey: process.env.DESTINY_API_KEY,
    authDomain: process.env.DESTINY_AUTH_DOMAIN,
    projectId: process.env.DESTINY_PROJECT_ID,
    storageBucket: process.env.DESTINY_STORAGE_BUCKET,
    messagingSenderId: process.env.DESTINY_MESSAGING_SENDER_ID,
    appId: process.env.DESTINY_APP_ID
  };

  const app = initializeApp(config, 'DESTINY');
  const storage = getStorage(app);
  return ref(storage, fileName);
}
