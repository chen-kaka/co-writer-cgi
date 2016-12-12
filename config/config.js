const ENV = process.env;

module.exports = {
  log: {
    level: 'silly', // error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5
  },
  mongoose: {
    options: {
      db: {
        native_parser: true
      },
      server: {
        poolSize: 5
      }
    }
  }
}
