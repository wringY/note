# Date对象
- Date对象 和 Math 对象不一样，他是一个构造函数。  所以我们需要 实例化使用。
- 创建 Date 实例用来处理日期和时间。Date 对象基于1970年1月1日（世界标准时间）起的毫秒数。
- Date 是构造函数（有实例）。
- 注意：日期格式字符串，返回的是对象。
1. 如果Date()不写参数，就返回当前时间。
2. 如果Date()里面写参数，就返回 括号里面输入的时间，如 new Date（'2018-8-8'）;
     new Date（'2018/8/8'）;
      new Date（'2018-8-8 08:08:08'）。
3. 所谓不写参数就能得到日期，其实是Date构造函数模拟了Date.parse() 。
- GMT+0800 代表中国地区的意思，
- GMT+0700 代表美国地区
- Date对象方法根据地区不同而不同。
## Date.parse()
- Date.parse()方法接收一个表示日期的字符串参数。我们可以这么写这个日期字符串。
~~~
var cc = new Date("2004/5/25");
console.log(cc);
//这两种方法等价的
var mm = new Date(Date.parse("May 25, 2004"));;
console.log(mm);
~~~
- 注意：
1. 不同地区，日期字符串的格式不同，例如美国地区需要这么写：''月/日/年'' "6/13/2004"
  中国地区需要这么写："年/月/日" 或者"年-月-日"
  "2018-8-8"
2. 如果想使用该方法得到更具体的时间需要这么写：
  Sat Jan 01 2000 08:00:00 GMT+0800

3. ECMA5支持这种格式
  new Date（'2018-8-8 00:00:00'）;
4. 我们可以省略该方法，因为一旦参数是字符就默认是该方法。
## Date.UTC()
- 该方法同样也返回表示日期的对象。
- Date.UTC()方法参数分别是年份、基于0的月份（0~11），月中的哪一天（1~31），小时数（0到23）、分钟、秒、以及毫秒。
~~~
 //这些参数中只有年和月是必需的，其他的可以省略。天数默认为1，其余为0    
var ss = new Date(Date.UTC(2000,0));
console.log(ss);

// 使用Date.UTC方法时，月的参数是从0开始的。
var mm = new Date(Date.UTC(2005,4,5,17,55,55));
console.log(mm);
~~~
- 注意：
1. 该方法的参数是数值。
2. 我们可以省略该方法，因为Date对象可以模拟该方法，一旦参数是数字就默认使用该方法。
## 获得毫秒数
- 获得的毫秒数都是 距离1970年1月1号的毫秒数。
  有4种方法：
~~~
//    1.valueOf()方法
 var date = new Date();
 console.log(date.valueOf());
 //2.getTime()方法
 console.log(date.getTime());
 //3.可以通过 + new Date（）
 var dtae1 = + new Date();
 console.log(dtae1);    //直接得到毫秒数
 //4.HTML5有一种新方法可以直接得到毫秒数，不需要new   有兼容性问题
 直接这么写，简单粗暴
 console.log(Date.now());
~~~
## 格式化日期
- 格式化日期就是获得new Date 返回值的指定部分（number）。
- 注意：月份和星期 取值范围是从0开始的。
- 举例：
~~~
var date = new Date();
    console.log(date);   // 当前日期 2019-3-21
    console.log(date.getFullYear());   //获得日期的指定部分，获得当前年份
    console.log(date.getMonth() + 1);     //月份和星期从 0 开始，月份会比实际月份少 1
    console.log(date.getDate());        //获得日期
    console.log(date.getDay());    //获得周几 ，从 0 开始，0表示星期天。
~~~
### setTime
~~~
var mm = new Date(Date.UTC(2005,4,5,17,55,55));
console.log(mm);
//设置毫秒数，来改变整个日期。原对象会被修改
mm.setTime(1000000000000000);
console.log(mm);
~~~
### setFullYear()
~~~
var mm = new Date(Date.UTC(2005,4,5,17,55,55));
console.log(mm);
//设置年数，注意必须写成4位数值，原对象会被修改
mm.setFullYear(1980);
console.log(mm);
~~~
### setMonth()
- 设置月份，必须有意义的数字，如果大于进制则向上一级，进1。
### setDate
### setHours
### setMinutes
### setSecond
### 倒计时案例
- 倒计时案例的目的在于：1.结束时间减去当前时间。2.时间不能相加减，需要转换成毫秒来相减。需要注意的部分
~~~
// 输入时间一个小注意点
var date = new Date();
console.log(date);
// 1 .我们输入的是字符串
var date1 = new Date('2018-7-6');
console.log(date1);
var date2 = new Date('2018/7/6');
console.log(date2);
// 2. 我们还可以输入 数值型(尽可能不用) 
var date3 = new Date(2018, 7, 6);
console.log(date3); // 返回的 不是 7月份 而是 8月份
// 所以我们如果输入的是数值型（使用UTC方法）， 实际的月份要 小1个月才行
var date4 = new Date(2018, 6, 6); // 输入的是 6月 返回的才是  7月
console.log(date4); //
~~~

## toJSON()
- 把一个字符串的date实例，转换为json格式字符串。
- 注意：字符串的date实例使用toJSON与toString的区别。
- toString:
  Mon Jun 24 2019 02:44:14 GMT+0800 (中国标准时间) 显然很难进行字符串的格式操作。
- toJSON: 2019-06-23T18:44:14.671Z  我们可以很方便的进行字符串的格式操作。
# 基本包装类型
- 为了方便操作基本数据类型，JavaScript还提供了三个特殊的引用类型：String/Number/Boolean。
- 基本不使用Number/Boolean类型，容易出问题。
- 基本包装类型就是 把简单数据类型包装成为复杂数据类型。 这样 基本数据类型就有了属性和方法
~~~
// 下面代码的问题？
var str = 'andy';
console.log(str.length);
// 按道理 基本数据类型 是 没有属性和方法的
// 对象才有属性和方法的
// 这个原因是因为， js 会把 基本数据类型包装为复杂数据类型
//  执行过程如下  生成临时变量 把简单类型包装为复杂数据类型
var temp = new String('andy');
// 赋值给 我们声明的 字符变量
str = temp;
// 销毁给临时变量
temp = null;
~~~
