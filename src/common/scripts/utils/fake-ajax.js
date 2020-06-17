export function fakeAjax(error) {
  return new Promise(((resolve, reject) => {
    setTimeout(() => {
      if (error) {
        reject(error);
      }
      resolve();
    }, 1000);
  }));
}
