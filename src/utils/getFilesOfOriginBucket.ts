import { getDownloadURL, listAll } from "firebase/storage";
import { getDestinyRef, getOriginRef } from "./getRefs.js";

export async function getFilesOfOriginBucket() {
  const originAppRef = await getOriginRef();
  const filesOnOrigin = await listAll(originAppRef);

  const filteredDirs = await Promise.all(
    filesOnOrigin?.prefixes?.flatMap(async (dirRef) => {
      const dirName = dirRef.name;
      const filesOnDirRef = await listAll(dirRef);
      const filesOnDir = filesOnDirRef.items;

      const filesThatAreNotOnBackupBucket = await Promise.all(filesOnDir.map(async (fileRef) => {
        const destinyAppRef = await getDestinyRef(`${dirName}/${fileRef.name}`);
        const fileURLOnDestiny = await getDownloadURL(destinyAppRef)
          .then(url => url)
          .catch((error) => {
            switch (error.code) {
              case 'storage/object-not-found':
                return null;
              default:
                break;
            }
          });

        return fileURLOnDestiny === null ? fileRef : null
      }));

      return filesThatAreNotOnBackupBucket.filter(file => file !== null);
    })
  );

  return filteredDirs.flatMap(dir => dir.map(f => f));
}
