// 设置允许跨域访问该服务

app.all('*', function (req, res, next) {

  res.header("Access-Control-Allow-Origin", "*");

  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');

  res.header("Access-Control-Allow-Headers", "X-Requested-With");

  res.header('Access-Control-Allow-Headers', 'Content-Type');

  res.header('Access-Control-Allow-Headers', 'mytoken');

  next();

});