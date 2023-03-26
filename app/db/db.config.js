module.exports = {
  name: "books",
  host: process.env.DB_HOST || "127.0.0.1",
  port: process.env.DB_PORT || 27017,
  opts: {
    useNewUrlParser: true,
    //useCreateIndex: true,
    promiseLibrary: global.promise,
  },
};
