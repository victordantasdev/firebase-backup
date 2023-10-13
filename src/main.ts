
import { colorize } from "./utils/colorize.js";
import { getEnvs } from "./utils/getEnvs.js";
import { getFilesOfOriginBucket } from "./utils/getFilesOfOriginBucket.js";
import { uploadFilesToBackupBucket } from './utils/uploadFilesToBackupBucket.js';

const MAX_UPLOAD_RATE = 50;

async function main() {
  getEnvs();

  const originFiles = await getFilesOfOriginBucket();
  const downloadPromises: Promise<void>[] = [];

  const bar = colorize('%'.repeat(30), 'bgYellow')

  if (originFiles?.length === 0) {
    console.log(bar);
    console.log(`\tNothing to do!`)
    console.log(bar);
    return;
  }

  const nFilesToUpload = originFiles.length < MAX_UPLOAD_RATE
    ? originFiles.length
    : MAX_UPLOAD_RATE

  console.log(bar);
  console.log(`  Uploading ${nFilesToUpload} files...`)
  console.log(bar);
  console.log('\n\n')

  originFiles.forEach(async (fileRef, index) => {
    if (index === MAX_UPLOAD_RATE) {
      return;
    }

    uploadFilesToBackupBucket(fileRef.parent.name, fileRef);
  })
}

main();
