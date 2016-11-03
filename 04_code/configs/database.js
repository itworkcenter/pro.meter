module.exports = {
    mongoose:{
      uri: "mongodb://localhost:27017/meter",
      options:{
          server: {poolSize: 5}
      }
    }
};
