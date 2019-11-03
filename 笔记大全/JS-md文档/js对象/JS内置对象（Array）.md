
# 数组对象Array
## 创建数组对象的两种方式
- 字面量方式
- new Array()
~~~
//    空数组 
var arr = new Array(); 
// 数组长度为3 但是内容为空
var arr = new Array(3); 
// 创建数组  [3,4,6]
var arr = new Array(3, 4, 6); 
// 2. 使用字面量创建数组对象
var arr = [1, 2, 3];
// 获取数组中元素的个数
console.log(arr.length);
~~~
## 检测一个对像的类型
因为 Array 也是对象，所以我们可以检测这个对象是不是数组，以此来区分。
- instanceof     instanceof 运算符   就是判断一个对象是否属于某种类型。
- Array.isArray()     HTML5中提供的方法，有兼容性问题。
- 注意：  instanceof     Array.isArray()  有区别的（具体看书）。
- 函数的参数，如果要求是一个数组的话，可以用这种方式来进行判断。
~~~
var arr = [1, 23];
var obj = {};
console.log(arr instanceof Array); // true
console.log(obj instanceof Array); // false
console.log(Array.isArray(arr)); // true
console.log(Array.isArray(obj)); // false
~~~
- 注意：检测基本类型用typeof ，检测对象类型用 instanceof
## 添加删除数组元素方法
### push(参数1，参数,...)
- 需要注意：1这些方法是否需要参数 2.是否修改原数组 3.返回值是什么
~~~
    //push(参数1，参数,...)     可以数组末尾添加一个或多个参数，并返回新数组的长度。
    var ss = [1,2];
    ss.push(3);   //把数组元素添加到arr数组的末尾

    console.log(ss.push(3));  //ss.push(3) 有一个返回值，就是新数组的长度 3

    console.log(ss);  
~~~
### pop()
- 该函数可以删除数组最后一个元素，把数组长度减1。
- 特点：无参数、修改原数组、返回被删除的数组元素。
~~~
/* var ss = [1,2,3]; 
       // 可以删除数组最后一个元素，把数组长度减1， 无参数、修改原数组 ，并返回被删除的元素
    console.log(ss.pop());
    console.log(ss.pop());
    
    console.log(ss.length);

这是典型的栈方法，后进先出。
~~~
### unshift(参数1,参数2...)
- 该函数可以给数组的开头添加一个或多个元素。
~~~
var ss = [1,2,3,4];
    console.log(ss.unshift(-1,0));    //可以给数组的开头添加一个或多个元素。
                                    //函数特点：可以有一个或多个参数、修改原数组、返回新数组的长度。
    console.log(ss);
~~~
### shift()
- 该函数可以把数组的第一个元素删除，并返回。
~~~
var ss = [1,2,3,4];
    console.log(ss.shift());   //把数组的第一个元素删除。特点：无参数、修改原数组、返回删除的元素。
    console.log(ss.length);
    console.log(ss.shift()); 

这是典型的队列方法，先进先出。
~~~
- 一些问题
~~~

 //工资的数组[1500, 1200, 2000, 2100, 1800],把工资超过2000的删除
var ss = [1500, 1200, 2000, 2100, 1800];   //因为没有删除指定数组元素的方法，所以我们需要新建一个数组
var mm = [];
alert(mm.length);
for (var i = 0; i < ss.length; i++) {   //遍历数组，把符合条件的，添加到一个新数组
    if (ss[i] < 2000) {
        // console.log( mm.unshift(ss[i]));   //对于一个空数组，用往数组开头添加元素的方法，结果出来的顺序是倒序
                                        // 1800 ， 1200， 1500                   
         mm.push(ss[i]);        //对于一个空数组，用往数组开头添加元素的方法，结果出来的顺序是正序
                                // 1500 1200 1800
    }
}
alert(mm);
~~~
## 数组排序方法
### reverse()
颠倒数组中元素的顺序,无参数，该方法会改变原来的数组，返回新数组。
~~~
// reverse 
var arr = ['red', 'andy'];
console.log(arr.reverse()); // 返回翻转之后的数组
console.log(arr); // 原先数组也被修改
~~~
### sort()
- 对数组的元素进行排序，该方法首先toString获得字符串，然后对字符串进行比较。该方法会改变原来的数组，返回新数组。
- 语法格式： arr.sort([compareFunction]) 里面比较函数只声明不调用。
- 注意;sort  如果调用该方法时没有使用参数，按照字符编码的顺序进行排序。 
- 举例;
~~~javascript
//对数组元素进行排序（局限性）
    /*  var ss = [1,6,23,9,27];
     console.log(ss.sort());   //可以有、无参数，没有参数按照ASCII编码进行排序，
         //显示结果 1，23，27，6，9.  比较过程，先比较数组元素中的第一位排序，然后在比较第二位排序 */
     // 3.对数组元素进行排序公式法（要比较数字而非字符串，可以用下面的方法）
     var ss = [1,6,23,9,27];  
    /*  ss.sort(function (a,b) {
         return a-b;       
     }) */
     ss.sort(function (a,b) {
         return b-a;     
     })
     console.log(ss);
~~~
- 参数详解
  sort方法接收一个参数，这个参数是接收两个参数的函数，然后对这两个参数做比较。比较结果是一个数如下：
   0 两个参数相同
   1 第一个参数在第二个参数前面
  -1 第一个参数在第二个参数后面
## 数组操作方法
### contact()
1. contact() 方法，连接两个或多个数组，不影响原数组    返回一个新数组。
 ~~~
   /*  var arr1 = [1,2];
    var arr2 = ['公共','红色经典','jk'];
    var arr3 = ['是否',18];
    console.log(arr1.concat(arr1,arr2,arr3)); */
       //该方法，返回一个新数组
 ~~~
### slice（begin,end）截取数组
1. slice（begin,end）方法，截取数组中指定位置的元素，不影响原数组 ，返回被截取项目的新数组    
~~~
    //，其中begin（包含自己） 和 end（不包含自己）都是索引号
    /* var arr4 = [1,2,3,4,5,6,7];
    console.log( arr4.slice());  //如果不写参数，默认截取整个数组。
    console.log(arr4.slice(0));  //可以写一个参数，将从这个参数开始截取
    console.log(arr4.slice(0,4));  *///截取的是索引号，不包含4
~~~
### splice()删除指定个数数组
1. splice（）方法，删除数组元素，splice(第几个开始,要删除个数)，注意要删除的个数包含开始位置的元素在内，返回被删除掉的数组元素  注意，这个会**影响原数组**
~~~javascript
   /*   (1)var arr5 = ['ss','dd','ff','gg'];
    console.log( arr5.splice(2,2) );   //从索引号2 开始，删除2个元素 ，返回被删除数组元素。     
        console.log(arr5);        //注意原数组被修改了 
  (2)var arr6 = ['dd','ff','gg','hh','jj'];   
    console.log(arr6.splice(1));    //只写一个参数，就从当前位置开始把后面的元素全部删除。
    console.log(arr6);   */      //原数组被修改了
    // (3) 指定位置插入数组元素
   /*  var arr7 = ['aa','ss','dd','ff','gg','hh'];
    console.log(arr7.splice(1,0,'88','99'));  //在索引号为1的数组元素，前面插入 两个数组元素,返回值不确定
    //注意写法： 如果在某个数组元素的前面插入数组元素，起始位置，删除个数0，需要插入的数组元素，用逗号隔开。
    console.log(arr7);  */  //修改原数组
    // （4）替换指定位置数组元素
    var arr8 = ['aa','ss','dd','ff','gg','hh'];
    console.log(arr8.splice(1,1,'ee'));
      //在索引为1的数组元素（开始位置），删除个数为1（包含自己），并且插入新元素，返回内删除的数组元素
    //其实就是，自己删除了（删除个数是1），在插入一个值。
    console.log(arr8.splice(1,2,'ee','tt'));  
    //也可以替换多个元素
    console.log(arr8);
~~~
## 清空数组的方法
~~~
// 方式1 推荐 
arr = [];
// 方式2 
arr.length = 0;
// 方式3
arr.splice(0, arr.length);
~~~

##获取数组元素索引方法
### indexOf()
1. 从前往后查找指定元素的第一索引（若该元素不存在，则返回-1.），（若存在相同的元素，返回第一个的索引）返回索引号。
~~~
var ss = [1,'ee','ee',3,4];
    console.log( ss.indexOf('ee'));     //1
	console.log( ss.indexOf('ff'));  //-1
~~~
### lastIndexOf()
1. 从后往前查找指定元素的第一索引（若该元素不存在，则返回-1.），（若存在相同的元素，返回第一个的索引）返回索引号。
~~~
var ss = [2,3,4,4,4,4,4,'yy'];  
    console.log(ss.lastIndexOf(4));    //该方法的使用场景：数组里有多个相同的元素，找最后的那个元素的索引
~~~
### 去掉数组中相同的元素
~~~
var ss = ['x','x','y','s','s','z','z'];  //删除相同的元素，利用新数组
    var arr = [];       //思路：把旧数组里面的元素与新数组元素进行对比。
     for (var i = 0; i < ss.length; i++ ) {         
            if (arr.indexOf(ss[i]) === -1) {    //判断旧数组里面的元素，是否在新数组里重复出现了。
                arr.push(ss[i]);     //
            }
        }
    console.log(arr);
~~~
## 数组转换为字符串
### toString()
~~~
var ss = [1,2,3,4,5];
    // console.log( typeof ss.toString());  //返回一个字符串，中间以逗号隔开。
~~~
### join()
- join('分隔符');  里面的参数是字符。
~~~
var ss = [1,2,3,4,5];
console.log(ss.join('|'));  //返回一个字符串，以指定的字符隔开。
~~~
- 注意事项
  如果数组中的某一项的值是 null 或者 undefined，那么该值在使用 toString 和 join方法和valueof（）方法返回的结果中以空字符串表示。
## 数组对象的迭代方法
- ECMA5为数组定义了5个迭代方法。每个方法都接收两个参数：要在每一项上运行的函数 和 运行该函数的作用域对象this（可选）。
  传入这些方法的函数需要3个参数：数组项的值、该项在数组中的位置、数组对象本身。
### every()
- every() : 对数组中的每一项给定运行函数，如果该函数每一项都返回true，则返回true。
~~~
var mm = [1,2,3,4];
var ss = mm.every(function (item,index,Array) {   
  //给数组中的每一项，给定运行函数。每一项函数的给定函数的返回值是true，结果才为true
  return (item > 2);        //在该函数中，就是判断数组中的每一项是否大于2，并返回值
});
~~~
### some()
- some(): 对数组中的每一项运行给定函数，如果该函数的任一项返回true，中止循环并且返回true。
~~~
var mm = [1,2,3,4];
var ss = mm.some(function (item,index,Array) {
    return (item > 2);   //如果任一项的给定函数返回值是true，则some返回值是true。
});
console.log(ss);
~~~
### filter()
- filter()：对数组中的每一项运行给定函数，该方法会返回 **函数返回值**为**true**项组成的 数组。
~~~
var mm = [1,2,3,4,5,6];
var ss = mm.filter( function (item, index, Array) {
      return  (item > 2); //返回 给定函数返回值为true的项 组成的数组。
} );
console.log(ss); //[3,4,5,6]
~~~
### forEach()
- 对数组中的每一项运行给定函数。这个方法没有返回值。
- forEach无法通过return中止，因为没有返回值。其它方法都可以通过return中止。
### map()
- map(): 对数组中的每一项运行给定函数，返回 每次函数调用的结果 组成的数组。
~~~
 var mm = [1,2,3,4,5,6];
     var ss = mm.map(function (item, index, Array) {
       return (item * 2);  //返回 每一项给定函数调用结果 组成的数组
     });  
   console.log(ss);  // [2, 4, 6, 8, 10, 12]
~~~
## 数组对象的缩小方法
- ECMA5新增了2个缩小数组的方法：reduce() 和 reduceRight().
  注意：
1. 这两个方法都会迭代数组的所有项，然后构建一个最终返回的值。其中，reduce()方法从数组的第一项开始，然后遍历到最后。而reduceRight()则从数组的最后一项开始，向前遍历到第一项。
2. 这两个方法都接收两个参数：一个在每一项上调用的函数 和 作为缩小基础的初始值（可选的），如果有基础初始值则从索引0开始，否则从索引1开始。
3. 其中这个函数有4个参数：前一个值、当前值、项的索引、数组对象。
4. 这个函数的返回值都会作为第一个参数（前一个值），传递给下一项。 注意：第一次迭代发生在数组的第二项，因此第一次迭代时函数的第一个参数，就是数组的第一项。
### reduce()
~~~
var ss = [1,2,3,4];
var mm = ss.reduce(function (prev, cur, index, Array) {
    return prev + cur;  
})
console.log(mm);   //10

其中：prev  pre-value之前值。
 cur   current 当前的
~~~
### reduceRight()
~~~
var ss = [1,2,3,4];
var mm = ss.reduceRight(function (prev, cur, index, Array) {
    return prev + cur;  
})
console.log(mm);
~~~
- 与reduce() 一模一样，只是从右开始。
## 数组对象的查询方法
### find
find() 方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。