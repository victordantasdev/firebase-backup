import fs from 'fs';
import { parseBuffer } from "./parseBuffer.js";

export function getEnvs() {
  const env = process.env.NODE_ENV
  const bufferEnv = fs.readFileSync(env || '.env');
  const envObject = parseBuffer(bufferEnv);

  Object.keys((envObject || {})).map(key => {
    if (!process.env[key] && process.env[key] !== envObject[key]) {
      process.env[key] = envObject[key];
    }
  });
}
