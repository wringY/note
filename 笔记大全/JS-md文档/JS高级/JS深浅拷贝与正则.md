# 深拷贝、浅拷贝
## 浅拷贝
- 对于对象或数组类型，当我们将a赋值给b，然后更改b中的属性，a也会随着变化。也就是说，a和b指向了同一块堆内存，所以修改其中任意的值，另一个值都会随之变化，这就是浅拷贝。
## 深拷贝
- 如果给b放到新的内存中，将a的各个属性都复制到新内存里，就是深拷贝。也就是说，当b中的属性有变化的时候，a内的属性不会发生变化。
- JSON对象的parse和stringify可以实现深度拷贝
- jQuery.extend()方法 可以实现深度拷贝。
## 例子
~~~
var obj1 = {
      name: "zzzz",
      age: 18,
      job: "teacher",
      friend: ["zs","ls","ww"],
      dog: {
          name: "大毛",
          age: 3
      }
  };
-----------------
// obj1对象有开辟了多层内存空间，本身开辟一个，friend属性开辟了一个,dog属性开辟了一个。
    // 所以：我们需要深拷贝obj1必须要 拷贝这个三个内存。
    var obj2 = {};
    // 深拷贝 把o1 深度拷贝到 o2
    function deepCopy (o1,o2) {
        for(var k in o1){
//因为数组即使Array 又是 Object。
            //如果k是数组类型 Array
            if(o1[k] instanceof Array){
                o2[k] = [];
                // 因为数组也是对象，需要遍历成员。
                // 如果数组里面也有对象或者数组，还是需要深拷贝，所以再次调用 deepCopy。
                deepCopy(o1[k],o2[k]);
            }else if (o1[k] instanceof Object){
            // 如果k是复杂类型Object
                o2[k] = {};
                // 如果对象里面，还有复杂数据类型，还是需要深拷贝，所以再次调用 deepCopy。
                deepCopy(o1[k],o2[k]);
            } else {
            // 如果k是基本类型  
            o2[k] = o1[k];
            }
        }
    }
~~~
# （正则对象）RegExp
- RegExp 类型是ECMAScript 支持的一个正则表达式接口，提供了最基本和一些高级的正则表达式功能。
- 该对象是一个内置对象，是动态成员。
## 创建对象的方法和传入的参数
var regulaExpression = new RegExp('ab[a-z]','i');
- 该对象有两个参数，都是字符串类型
1. 模式 pattern  （正则表示式模式）
2. 标识 falg  i 忽略大小写（ignore）  g 全局匹配（global），m 多行模式
- 可以这么写 gi
- 注意：第二个参数是可忽略的，如果忽略默认区别大小写。
- 创建对象的简单方法：
var regulaExpressio = /ab[a-z]/i;
## 正则对象的方法
### 分组提取
#### RegExp.$
~~~
var date = '2019-9-1';
    var rge = /(\d{4})-(\d{1,2})-(\d{1,2})/;
    rge.test(date);
	当我们使用正则表达式相关方法时，RegExp.$1~$9会被自动赋值。
    console.log(RegExp.$1);
    console.log(RegExp.$2);
    console.log(RegExp.$3);
注意：这里的小括号代表分组，分组结果存储在RegExp.$1~$9中。
输出结果:
2019
9
1
~~~
#### String.split()
- split可以用正则表达式作为参数。
~~~
var date = '2019/9-1';
    console.log(date.split(/[/-]/));
    // 2019 
    // 9
    // 1

 var email = "xxx@qq.com";
console.log(email.split(/[@\.]/));
~~~
### test()
- test() 方法，传入要匹配的字符串，
- 返回结果：如果通过传入对象的（正则）模式，匹配到了指定模式的字符，返回true，否则返回false。
### exec()
- exec() 只返回一个匹配到的结果    如果没有匹配的内容返回null
- exec() 方法，传入要匹配的字符串，返回结果：如果通过传入对象的（正则）模式，匹配到了指定模式的字符，以数组形式返回被匹配到的字符，只返回第一个匹配的结果。如果没有匹配到返回null。
- 注意：exec方法默认是局部匹配，所以只返回第一个匹配到的字符，我们可以设为全局匹配g。这样每次第一次调用得到第一个被匹配到的字符，第二次调用得到第二个被匹配到的字符，依次类推。
- 返回的这个数组有：index属性，被匹配到的字符的首个字符位置。input：原始字符串。
## JS中跟正则表达式相关的方法
### RegExp对象：
test()  //匹配
exec() //提取
String对象中：
match()    //提取多个内容
replace()  //提取
serach()  
split()        //切割
#### String.math()全部提取
~~~
var str = '张三：5000，李四：900，王五：8646';  
var  rge = /\d+/;
//   提取多个内容
console.log(str.match(rge));
~~~
#### String.replace()替换
- replace(),两个参数，第一个参数: 被替换的字符 第二个参数：新的字符。
- 注意：只能替换到第一个被查找到的字符。
~~~
var str = "    123AD   ASSFSF SSF FSFGO";
console.log(str.replace(/\s/g, 'x'));

var str = "    123AD   ASSFSF SSF FSFGO";
console.log(str.split(' ').join(''));
~~~
#### String.split()分组提取
- split可以用正则表达式作为参数。
~~~
 var date = '2019/9-1';
    console.log(date.split(/[/-]/));
    // 2019 
    // 9
    // 1

 var email = "xxx@qq.com";
    console.log(email.split(/[@\.]/));
~~~

##贪婪模式和非贪婪模式
- /<.+>/ 贪婪模式,尽可能多的匹配
/<.+?>/ 非贪婪模式,尽可能少的匹配
- 主要是指：我们使用 * + . 等元字符时，会尽可能向后匹配。
- 贪婪模式
~~~
var str = '<title>Document</title>';
var reg = /<.+>/;
console.log(str.match(reg));
//<title>Document</title>
~~~
- 非贪婪模式
~~~
 var str = '<title>Document</title>';
  var reg = /<.+?>/;
  console.log(str.match(reg));
//<title>
~~~