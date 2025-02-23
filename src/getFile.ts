import fetch from 'cross-fetch';

export async function getFile(uri: string) {
  
  let buffer: ArrayBuffer;
  
  let response = await fetch(uri)
  if (response?.ok){
    buffer = await response.arrayBuffer();
  } else {
    console.log("No file found "+ uri)
    return null
  }
  
  return buffer;
  
}

