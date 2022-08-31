export function imageToBase64(file: File): Promise<string> {

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    let base64: string | null = null;

    reader.readAsDataURL(file);
    
    reader.addEventListener('load', () => {
      let result = reader.result;

      if (result && typeof result === 'string') {
        base64 = result.replace("data:", "")
          .replace(/^.+,/, "");
      }

      if (base64) {
        resolve(base64);
      }
    });

    reader.addEventListener('error', () => {
      reject(base64);
    });
  });
}