module.exports = {
  racePromise: (cb, args, opts = {}) => (
    Promise.race([
      cb(...args),
      new Promise((resolve, reject) => {
        setTimeout(
          () => reject(new Error('Request has timed out')),
          opts.countdown || 30000,
        );
      }),
    ])
  ),
};
