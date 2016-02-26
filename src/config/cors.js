const whitelist = process.env.TRUSTED_DOMAINS;

if (whitelist === undefined) {
  throw new Error('A comma-separated list of trusted domains is required.');
}

export default {
  origin: (origin, callback) => {
    let originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  }
};
