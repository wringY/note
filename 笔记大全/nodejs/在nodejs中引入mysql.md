### 在nodejs中操作mysql数据库
- 首先本机需要有一个mysql的数据库。
- 如果想在nodejs中操作mysql数据库，我们需要去下载mysql第三方包。
- 首先通过npm命令安装mysql模块。npm install mysql
- npm上查看说明文档<https://github.com/mysqljs/mysql>
### nodejs中mysql的用法
#### 建立数据库连接：createConnection(Object)方法
- 该方法接受一个对象作为参数，该对象有四个常用的属性host，user，password，database。与php中链接数据库的参数相同。属性列表如下：
~~~
host:　　　　　　 连接数据库所在的主机名. (默认: localhost)
    port: 　　　　　　连接端口. (默认: 3306)
    localAddress: 　　用于TCP连接的IP地址. (可选)
    socketPath: 　　　　链接到unix域的路径。在使用host和port时该参数会被忽略.
    user: 　　　　　　　　MySQL用户的用户名.
    password:　　　　 　　MySQL用户的密码.
    database: 　　　　　　链接到的数据库名称 (可选).
    charset: 　　　　　　连接的字符集. (默认: 'UTF8_GENERAL_CI'.设置该值要使用大写!)
    timezone: 　　　　　　储存本地时间的时区. (默认: 'local')
    stringifyObjects: 　　是否序列化对象. See issue #501. (默认: 'false')
    insecureAuth: 　　　　是否允许旧的身份验证方法连接到数据库实例. (默认: false)
    typeCast: 　　　　　　确定是否讲column值转换为本地JavaScript类型列值. (默认: true)
    queryFormat: 　　　　自定义的查询语句格式化函数.
    supportBigNumbers: 数据库处理大数字(长整型和含小数),时应该启用 (默认: false).
    bigNumberStrings: 启用 supportBigNumbers和bigNumberStrings 并强制这些数字以字符串的方式返回(默认: false). 
    dateStrings: 强制日期类型(TIMESTAMP, DATETIME, DATE)以字符串返回，而不是一javascript Date对象返回. (默认: false)
    debug: 是否开启调试. (默认: false)
    multipleStatements: 是否允许在一个query中传递多个查询语句. (Default: false)
    flags: 链接标志.
~~~
- 还可以使用字符串来连接数据库
~~~
var connection = mysql.createConnection('mysql://user:pass@host/db?debug=true&charset=BIG5_CHINESE_CI&timezone=-0700');
~~~
#### 结束数据库连接end()和destroy()
- end()接受一个回调函数，并且会在query结束之后才触发，如果query出错，仍然会终止链接，错误会传递到回调函数中处理。
- destroy()立即终止数据库连接，即使还有query没有完成，之后的回调函数也不会在触发。
#### 基本的操作流程

~~~javascript
const mysql = require('mysql');
//创建数据库连接//createConnection。参数是一个对象。与phpmysqli—_connect一样
let connect = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 3306, //默认是3306
    database: 'student_manger'
});
//启动连接
connect.connect();
//执行sql语句
connect.query();
//结束连接
connect.end();
-------------------------------新增操作-----------------------
const mysql = require('mysql');
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 3306, //默认是3306
    database: 'student_manger'
});
let data = {username: '小明',password:'123', name:'rose', school:'千峰',age: 18};
//其中? 是占位符。
//必须使用set，这样才能把把数据这个对象，成功的添加到数据库中。
//注意set这种语法只在nodejs中的mysql模块支持，其他不支持。
//如果是values的话，数据不能为对象。
let sqlStr = 'INSERT INTO student set ?';
conn.query(sqlStr,data,(err,result)=>{
    if(err) throw err;
    console.log(result);
    // OkPacket {
    //     fieldCount: 0,
    //     affectedRows: 1,  //受影响的行数
    //     insertId: 88,     //插入行的id
    //     serverStatus: 2,
    //     warningCount: 0,
    //     message: '',
    //     protocol41: true,
    //     changedRows: 0 }
});
conn.end();
-------------------------修改操作-----------------------
const mysql = require('mysql');
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 3306, //默认是3306
    database: 'student_manger'
});
let data = {id: 100,username: '小红',password:'1311'};
let sqlStr = 'UPDATE student SET ? where id=?';
//当sql语句中的占位符为2个及以上时，query的第二个参数需要是一个数组。
conn.query(sqlStr,[data,data.id],(err, result)=>{
    if(err) throw err;
    console.log(result);
});
~~~

### 其余扩展

#### 创建连接池 createPool(Object)  

- Object和createConnection参数相同，可以监听connection事件，并设置session值
~~~
pool.on('connection', function(connection) {  
        connection.query('SET SESSION auto_increment_increment=1')  
});  
~~~
- connection.release()释放链接到连接池。如果需要关闭连接并且删除，需要使用connection.destroy()
- pool除了接受和connection相同的参数外，还接受几个扩展的参数
    - createConnection: 用于创建链接的函数. (Default: mysql.createConnection)  
    - waitForConnections: 决定当没有连接池或者链接数打到最大值时pool的行为. 为true时链接会被放入队列中在可用是调用，为false时会立即返回error. (Default: true)  
    - connectionLimit: 最大连接数. (Default: 10)  
    - queueLimit: 连接池中连接请求的烈的最大长度，超过这个长度就会报错，值为0时没有限制. (Default: 0)  
 #### 连接池集群
- 允许不同的host链接
~~~
// create
    var poolCluster = mysql.createPoolCluster();

    poolCluster.add(config); // anonymous group
    poolCluster.add('MASTER', masterConfig);
    poolCluster.add('SLAVE1', slave1Config);
    poolCluster.add('SLAVE2', slave2Config);

    // Target Group : ALL(anonymous, MASTER, SLAVE1-2), Selector : round-robin(default)
    poolCluster.getConnection(function (err, connection) {});

    // Target Group : MASTER, Selector : round-robin
    poolCluster.getConnection('MASTER', function (err, connection) {});

    // Target Group : SLAVE1-2, Selector : order
    // If can't connect to SLAVE1, return SLAVE2. (remove SLAVE1 in the cluster)
    poolCluster.on('remove', function (nodeId) {
      console.log('REMOVED NODE : ' + nodeId); // nodeId = SLAVE1 
    });

    poolCluster.getConnection('SLAVE*', 'ORDER', function (err, connection) {});

    // of namespace : of(pattern, selector)
    poolCluster.of('*').getConnection(function (err, connection) {});

    var pool = poolCluster.of('SLAVE*', 'RANDOM');
    pool.getConnection(function (err, connection) {});
    pool.getConnection(function (err, connection) {});

    // destroy
    poolCluster.end();
~~~
- 链接集群的可选参数
~~~
canRetry: 值为true时，允许连接失败时重试(Default: true)
removeNodeErrorCount: 当连接失败时 errorCount 值会增加. 当errorCount 值大于 removeNodeErrorCount 将会从PoolCluster中删除一个节点. (Default: 5)
defaultSelector: 默认选择器. (Default: RR)
RR: 循环. (Round-Robin)
RANDOM: 通过随机函数选择节点.
ORDER: 无条件地选择第一个可用节点.
~~~
#### 切换用户/改变连接状态
~~~
Mysql允许在比断开连接的的情况下切换用户
    connection.changeUser({user : 'john'}, function(err) {
          if (err) throw err;
});
~~~
- 参数  
  user: 新的用户 (默认为早前的一个).  
  password: 新用户的新密码 (默认为早前的一个).  
  charset: 新字符集 (默认为早前的一个).  
  database: 新数据库名称 (默认为早前的一个)
#### 处理服务器连接断开
~~~
var db_config = {
          host: 'localhost',
        user: 'root',
        password: '',
        database: 'example'
    };

    var connection;

    function handleDisconnect() {
      connection = mysql.createConnection(db_config); // Recreate the connection, since
                                                      // the old one cannot be reused.

      connection.connect(function(err) {              // The server is either down
        if(err) {                                     // or restarting (takes a while sometimes).
          console.log('error when connecting to db:', err);
          setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
        }                                     // to avoid a hot loop, and to allow our node script to
      });                                     // process asynchronous requests in the meantime.
                                              // If you're also serving http, display a 503 error.
      connection.on('error', function(err) {
        console.log('db error', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
          handleDisconnect();                         // lost due to either server restart, or a
        } else {                                      // connnection idle timeout (the wait_timeout
          throw err;                                  // server variable configures this)
        }
      });
    }

    handleDisconnect();
~~~
#### 转义查询值
- 为了避免SQL注入攻击，需要转义用户提交的数据。可以使用connection.escape() 或者 pool.escape()。
~~~
var userId = 'some user provided value';
    var sql    = 'SELECT * FROM users WHERE id = ' + connection.escape(userId);
    connection.query(sql, function(err, results) {
      // ...
    });
    或者使用？作为占位符
    connection.query('SELECT * FROM users WHERE id = ?', [userId], function(err, results) {
      // ...
    });
    不同类型值的转换结果
    Numbers 不变
    Booleans 转换为字符串 'true' / 'false' 
    Date 对象转换为字符串 'YYYY-mm-dd HH:ii:ss'
    Buffers 转换为是6进制字符串
    Strings 不变
    Arrays => ['a', 'b'] 转换为 'a', 'b'
    嵌套数组 [['a', 'b'], ['c', 'd']] 转换为 ('a', 'b'), ('c', 'd')
    Objects 转换为 key = 'val' pairs. 嵌套对象转换为字符串.
    undefined / null ===> NULL
    NaN / Infinity 不变. MySQL 不支持这些值,  除非有工具支持，否则插入这些值会引起错误.
    转换实例：
    var post  = {id: 1, title: 'Hello MySQL'};
    var query = connection.query('INSERT INTO posts SET ?', post, function(err, result) {
      // Neat!
    });
    console.log(query.sql); // INSERT INTO posts SET `id` = 1, `title` = 'Hello MySQL'
    或者手动转换
    var query = "SELECT * FROM posts WHERE title=" + mysql.escape("Hello MySQL");

    console.log(query); // SELECT * FROM posts WHERE title='Hello MySQL'
~~~
#### 转换查询标识符
- 如果不能信任SQL标识符(数据库名、表名、列名)，可以使用转换方法mysql.escapeId(identifier)；
~~~
var sorter = 'date';
    var query = 'SELECT * FROM posts ORDER BY ' + mysql.escapeId(sorter);

    console.log(query); // SELECT * FROM posts ORDER BY `date`
    支持转义多个
    var sorter = 'date';
    var query = 'SELECT * FROM posts ORDER BY ' + mysql.escapeId('posts.' + sorter);

    console.log(query); // SELECT * FROM posts ORDER BY `posts`.`date`
    可以使用??作为标识符的占位符
    var userId = 1;
    var columns = ['username', 'email'];
    var query = connection.query('SELECT ?? FROM ?? WHERE id = ?', [columns, 'users', userId], function(err, results) {
      // ...
    });

    console.log(query.sql); // SELECT `username`, `email` FROM `users` WHERE id = 1
~~~
#### 准备查询
- 可以使用mysql.format来准备查询语句，该函数会自动的选择合适的方法转义参数。
~~~
var sql = "SELECT * FROM ?? WHERE ?? = ?";
    var inserts = ['users', 'id', userId];
    sql = mysql.format(sql, inserts);
    10、自定义格式化函数
    connection.config.queryFormat = function (query, values) {
      if (!values) return query;
      return query.replace(/\:(\w+)/g, function (txt, key) {
        if (values.hasOwnProperty(key)) {
          return this.escape(values[key]);
        }
        return txt;
      }.bind(this));
    };

    connection.query("UPDATE posts SET title = :title", { title: "Hello MySQL" });
~~~
#### 获取插入行的id
- 当使用自增主键时获取插入行id，如：
~~~
connection.query('INSERT INTO posts SET ?', {title: 'test'}, function(err, result) {
      if (err) throw err;

      console.log(result.insertId);
    });
~~~
#### 流处理
- 有时你希望选择大量的行并且希望在数据到达时就处理他们，你就可以使用这个方法
~~~
var query = connection.query('SELECT * FROM posts');
    query
      .on('error', function(err) {
        // Handle error, an 'end' event will be emitted after this as well
      })
      .on('fields', function(fields) {
        // the field packets for the rows to follow
      })
      .on('result', function(row) {
        // Pausing the connnection is useful if your processing involves I/O
        connection.pause();

        processRow(row, function() {
          connection.resume();
        });
      })
      .on('end', function() {
        // all rows have been received
      });
~~~
#### 混合查询语句（多语句查询）
 因为混合查询容易被SQL注入攻击，默认是不允许的，可以使用var connection = mysql.createConnection({multipleStatements: true});开启该功能。
 混合查询实例：
 ~~~
 connection.query('SELECT 1; SELECT 2', function(err, results) {
      if (err) throw err;

      // `results` is an array with one element for every statement in the query:
      console.log(results[0]); // [{1: 1}]
      console.log(results[1]); // [{2: 2}]
    });
 ~~~
- 同样可以使用流处理混合查询结果：
~~~
var query = connection.query('SELECT 1; SELECT 2');  
  
    query  
      .on('fields', function(fields, index) {  
        // the fields for the result rows that follow  
      })  
      .on('result', function(row, index) {  
        // index refers to the statement this result belongs to (starts at 0)  
      });
~~~
- 如果其中一个查询语句出错，Error对象会包含err.index指示错误语句的id，整个查询也会终止。混合查询结果的流处理方式是做实验性的，不稳定。
#### 事务处理
- connection级别的简单事务处理
~~~
connection.beginTransaction(function(err) {
      if (err) { throw err; }
      connection.query('INSERT INTO posts SET title=?', title, function(err, result) {
        if (err) { 
          connection.rollback(function() {
            throw err;
          });
        }

        var log = 'Post ' + result.insertId + ' added';

        connection.query('INSERT INTO log SET data=?', log, function(err, result) {
          if (err) { 
            connection.rollback(function() {
              throw err;
            });
          }  
          connection.commit(function(err) {
            if (err) { 
              connection.rollback(function() {
                throw err;
              });
            }
            console.log('success!');
          });
        });
      });
    });
~~~