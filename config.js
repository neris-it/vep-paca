module.exports = function () {
  var client = "vep";

  console.log(" *** Client is " + client);
  console.log("(It should be specified in CLIENT env variable)");


  try {
    var customConfig = require('./custom_config_' + client + '.js');
  } catch (e) {
    var customConfig = {};

    if(client){
      console.log("*** NOTICE: Custom config file for this client not found!");
    }
  }



  return Object.assign(customConfig, getDbAndPort());
}

function getDbAndPort() {
  // if (!process.env.IS_PROD) {
    return {
      // db_url: 'mongodb://localhost:27017/neris-crm',
      db_url: 'postgres://jzscyagmvecevr:e9ecacd9b8aadf9c694b2dd3f1de0f38592bcb7f429a8d5be888c5e58ec726fd@ec2-54-75-229-28.eu-west-1.compute.amazonaws.com:5432/d80vv2ntpjbuij',
      port: 5432
    }
  // } else {
  //   return {
  //     db_url: process.env.MONGODB_URI ? process.env.MONGODB_URI : process.env.MONGOLAB_URI,
  //     port: process.env.PORT || 8080
  //   }
  // }
}