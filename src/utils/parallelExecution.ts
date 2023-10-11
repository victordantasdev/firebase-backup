/**
 * Executes asynchronous tasks in parallel on an array of items, limiting the number
 * of concurrent executions to a specified maximum.
 *
 * @param items - The array of items to process asynchronously.
 * @param downloadItem - A function that takes an item from the array and
 *   returns a Promise representing an asynchronous task.
 * @param maxParallelDownloads - The maximum number of parallel
 *   asynchronous executions.
 * @returns A Promise that resolves when all asynchronous tasks are
 *   completed.
 * @throws If downloadItem is not a function or if maxParallelDownloads is not
 *   a positive integer.
 */
export async function parallelExecution<T>(
  items: T[],
  downloadItem: (item: T) => Promise<void>,
  maxParallelDownloads = 3
): Promise<void> {
  const downloadPromises: Promise<void>[] = [];

  for (const item of items) {
    const promise = downloadItem(item);
    downloadPromises.push(promise);

    if (downloadPromises.length >= maxParallelDownloads) {
      await Promise.all(downloadPromises);
      downloadPromises.length = 0;
    }
  }

  await Promise.all(downloadPromises);
}
