function isString(x) {
  return typeof x === "string" || x instanceof String;
}

function normaliseString(obj) {
  let ans = {};
  Object.keys(obj).forEach(function(key) {
    let value = obj[key];
    if (isString(value)) {
      value = value.trim();
    }
    ans[key] = value;
  });
  return ans;
}
function create_UUID(){
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (dt + Math.random()*16)%16 | 0;
      dt = Math.floor(dt/16);
      return (c=='x' ? r :(r&0x3|0x8)).toString(16);
  });
  return uuid;
}
function decode_base64(base64str, file) {
  
  var bitmap = new Buffer(base64str, 'base64');
  
  fs.writeFileSync(file, bitmap);
  console.log('****** File created from base64 encoded string ******');
}
function encode_base64(filename) {
  fs.readFile(path.join(__dirname, filename), function (error, data) {
    if (error) {
      throw error;
    } else {
      //console.log(data);
      var dataBase64 = Buffer.from(data).toString('base64');
      return dataBase64
    }
  });
}

module.exports = {
  isString,
  normaliseString,
  create_UUID, 
  decode_base64,
  encode_base64
};
