import { listAll } from "firebase/storage";

import { getEnvs } from "./utils/getEnvs.js";
import { getFilesOfOriginBucket } from "./utils/getFilesOfOriginBucket.js";
import { uploadFilesToBackupBucket } from './utils/uploadFilesToBackupBucket.js';

async function main() {
  getEnvs();

  const originFolders = await getFilesOfOriginBucket();

  for (const folderRef of originFolders.prefixes) {
    const folderName = folderRef.name;

    const filesInFolderRef = await listAll(folderRef);
    const filesInFolder = filesInFolderRef.items;

    const downloadPromises: Promise<void>[] = [];

    for (const fileRef of filesInFolder) {
      const promise = uploadFilesToBackupBucket(folderName, fileRef);
      downloadPromises.push(promise);

      if (downloadPromises.length >= 5) {
        await Promise.all(downloadPromises);
        downloadPromises.length = 0;
      }
    }
  }
}

main();
