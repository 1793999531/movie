const md5 = require("md5");

const salt = "ajadsfj231lsadf.;asdfjiweua";
console.log(md5(md5("hxz")+salt));