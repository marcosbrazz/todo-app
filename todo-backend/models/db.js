var axios = require("axios");

var params = {
  dbname: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST
};

module.exports = axios.create({
  baseURL: 'https://' + params.username + ':' + params.password + '@' + params.host + '/' + params.dbname
});