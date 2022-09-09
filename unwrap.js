import { readdirSync, existsSync, copyFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const TARGET = './dist';

readdirSync(TARGET).forEach((file) => {
  const entry = join(TARGET, file);
  const output = join(__dirname, file);

  if (existsSync(output)) {
    throw new Error(
      `Can't unwrap dist. File "${file}" already exists in root folder.`,
    );
  } else {
    copyFileSync(entry, output);
  }
});

