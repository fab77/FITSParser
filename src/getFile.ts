import fetch from 'cross-fetch';


// export async function getFile(uri: string): Promise<ArrayBuffer | Buffer> {
export async function getFile(uri: string) {
  // let response: Response;
  // response = await fetch(uri);

  // if (!response.ok) {
  //   return new ArrayBuffer(0);
  // } else {
  //   return response.arrayBuffer();
  // }

  let buffer: ArrayBuffer;
  buffer = await (await fetch(uri)).arrayBuffer();
  return buffer;
  
}

