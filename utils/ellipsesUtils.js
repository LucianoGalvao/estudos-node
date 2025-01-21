function ellipsisUtils(message, success, duration = 3000) {
  return new Promise((resolve) => {
    const intervalTime = 500;
    let count = 0;

    process.stdout.write(message);
    const interval = setInterval(() => {
      process.stdout.write(".");
      count++;

      if (count === 4) {
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write(message);
        count = 0;
      }
    }, intervalTime);

    setTimeout(() => {
      clearInterval(interval);
      process.stdout.write("\n");
      process.stdout.write(success);
      process.stdout.write("\n");

      resolve();
    }, duration);
  });
}

module.exports = ellipsisUtils;
