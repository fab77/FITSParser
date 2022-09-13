// import { readdirSync, existsSync, copyFileSync } from 'fs';

// import { fileURLToPath } from 'url';
// import { join, dirname } from 'path';
// const url = require ('url');
const path = require( 'path');

const fs = require ('fs');
// const __filename = url.fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const TARGET = './dist';

fs.readdirSync(TARGET).forEach((file) => {
  const entry = path.join(TARGET, file);
  const output = path.join(__dirname, file);

  if (fs.existsSync(output)) {
    throw new Error(
      `Can't unwrap dist. File "${file}" already exists in root folder.`,
    );
  } else {
    fs.copyFileSync(entry, output);
  }
});

