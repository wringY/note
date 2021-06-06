# 元数据(metaData)
- 元数据是用来描述数据的数据（Data that describes other data）。单单这样说，不太好理解，我来举个例子。
- 下面是契诃夫的小说《套中人》中的一段，描写一个叫做瓦莲卡的女子：
>
（她）年纪已经不轻，三十岁上下，个子高挑，身材匀称，黑黑的眉毛，红红的脸蛋－－一句话，不是姑娘，而是果冻，她那样活跃，吵吵嚷嚷，不停地哼着小俄罗斯的抒情歌曲，高声大笑，动不动就发出一连串响亮的笑声：哈，哈，哈！
- 这段话里提供了这样几个信息：年龄（三十岁上下）、身高（个子高挑）、相貌（身材匀称，黑黑的眉毛，红红的脸蛋）、性格（活跃，吵吵嚷嚷，不停地哼着小俄罗斯的抒情歌曲，高声大笑）。有了这些信息，我们就可以大致想像出瓦莲卡是个什么样的人。推而广之，只要提供这几类的信息，我们也可以推测出其他人的样子
- 这个例子中的"年龄"、"身高"、"相貌"、"性格"，就是元数据，因为它们是用来描述具体数据/信息的数据/信息。
- 当然，这几个元数据用来刻画个人状况还不够精确。我们每个人从小到大，都填过《个人情况登记表》之类的东西吧，其中包括姓名、性别、民族、政治面貌、一寸照片、学历、职称等等......这一套元数据才算比较完备。
- 在日常生活中，元数据无所不在。有一类事物，就可以定义一套元数据。

- 喜欢拍摄数码照片的朋友应该知道，每张数码照片都包含EXIF信息。它就是一种用来描述数码图片的元数据。按照Exif 2.1标准，其中主要包含这样一些信息：
>
Image Description 图像描述、来源. 指生成图像的工具
Artist 作者 有些相机可以输入使用者的名字
Make 生产者 指产品生产厂家
Model 型号 指设备型号
Orientation方向 有的相机支持，有的不支持
XResolution/YResolution X/Y方向分辨率 本栏目已有专门条目解释此问题。
ResolutionUnit分辨率单位 一般为PPI
Software软件 显示固件Firmware版本
DateTime日期和时间
YCbCrPositioning 色相定位
ExifOffsetExif信息位置，定义Exif在信息在文件中的写入，有些软件不显示。
ExposureTime 曝光时间 即快门速度
FNumber光圈系数
ExposureProgram曝光程序 指程序式自动曝光的设置，各相机不同,可能是Sutter Priority（快门优先）、Aperture Priority（快门优先）等等。
ISO speed ratings感光度
ExifVersionExif版本
DateTimeOriginal创建时间
DateTimeDigitized数字化时间
ComponentsConfiguration图像构造（多指色彩组合方案）
CompressedBitsPerPixel(BPP)压缩时每像素色彩位 指压缩程度
ExposureBiasValue曝光补偿。
MaxApertureValue最大光圈
MeteringMode测光方式， 平均式测光、中央重点测光、点测光等。
Lightsource光源 指白平衡设置
Flash是否使用闪光灯。
FocalLength焦距，一般显示镜头物理焦距，有些软件可以定义一个系数，从而显示相当于35mm相机的焦距 MakerNote(User Comment)作者标记、说明、记录
FlashPixVersionFlashPix版本 （个别机型支持）
ColorSpace色域、色彩空间
ExifImageWidth(Pixel X Dimension)图像宽度 指横向像素数
ExifImageLength(Pixel Y Dimension)图像高度 指纵向像素数
Interoperability IFD通用性扩展项定义指针 和TIFF文件相关，具体含义不详
FileSource源文件 Compression压缩比。
- 我再举一个例子。在电影数据库IMDB上可以查到每一部电影的信息。IMDB本身也定义了一套元数据，用来描述每一部电影。下面是它的一级元数据，每一级下面又列出了二级元数据，总共加起来，可以从100多个方面刻画一部电影：
>
Cast and Crew（演职人员）、Company Credits（相关公司）、Basic Data（基本情况）、Plot & Quotes（情节和引语）、Fun Stuff（趣味信息）、Links to Other Sites（外部链接）、Box Office and Business（票房和商业开发）、Technical Info（技术信息）、Literature（书面内容）、Other Data（其他信息）。
- 元数据最大的好处是，它使信息的描述和分类可以实现格式化，从而为机器处理创造了可能。
# 元编程
- 我们写了一个函数去修改函数，我们把这样的行为称作元编程。
- 类及其实例并不能感知或者修改存取在类上元数据，但是我们可以通过装饰器和注解在编译时动态的修改它们的行为，即我们写了一个函数去修改函数，我们把这样的行为称作元编程
# 装饰器
~~~js
@modifyClass
class A {

}

function modifyClass(target: any) {
  target.prototype.extraProp = 'decorator'
}
~~~
- 在装饰器的方法中，入参是target，作用于class A上就是 A ，我们知道，在ES中一切都是对象，class 是ES6以后的一个面向对象的语法糖，在这里的A本质也就是一个function，在新建实例的时候作为构造函数调用。这里通过target.prototype我们也能获得这个类的原型。这样我们就可以对这个类进行修改了。值得注意的是，

- **装饰器是在编译期间发生的，这个时候类的实例还没有生成，因此装饰器无法直接对类的实例进行修改。但是可以间接的通过修改类的原型影响实例**
- **装饰器无非就是一个函数，通过修改原型的方式方式，去影响那些实例**
# 注解
- 看下面的例子: 这是一个装饰器工厂函数。
~~~js
function color(value: string) { // 这是一个装饰器工厂
    return function (target) { //  这是装饰器
        // do something with "target" and "value"...
    }
}
~~~
- 而注解就是利用这种形式，给装饰器添加参数的形式进行元数据的修改。而这里仅仅是动态改变原型上的属性。要进行元数据的修改，我们需要利用反射Reflect。
- ES6提供的Refelct并不满足修改元数据，我们要额外引入一个库reflect-metadata
~~~ts
import 'reflect-metadata'

@modifyClass('param')
class A {

}

function modifyClass(param) {
  return target => {
      Reflect.defineMetadata(Symbol.for('META_PARAM'), param, target.prototype)
  }
}
~~~
- 这个时候就是真正的注解了，我们通过**装饰器和Reflect对要修饰的类注入了元数据**，注意我们这里是注入到target.prototype，类的实例上。因为不同的实例是获得的不同的数据，因此不能注入到target上。
- 当然可以直接使用reflect-metadata 这个库提供给我们的装饰器，不用自己去定义装饰器
~~~ts
import 'reflect-metadata'
// 当类上面遇到@，就表示后面是一个类装饰器
@Reflect.metadata('name', 'xiaomuzhu')
class Person {

    @Reflect.metadata('time', '2019/10/10')
    public say(): string {
        return 'hello'
    }
}


console.log(Reflect.getMetadata('name', Person)) // xiaomuzhu
console.log(Reflect.getMetadata('time', new Person, 'say')) // 2019/10/10
~~~
- 反射给了我们在类及其属性、方法、入参上存储、读取数据的能力
# 装饰器 与 注解
- 装饰器（Decorator） 仅提供定义劫持，能够对类及其方法、方法入参、属性的定义并没有提供任何附加元数据的功能。
- 注解（Annotation）： 仅提供附加元数据支持，并不能实现任何操作。需要另外的 Scanner 根据元数据执行相应操作。
- 两者的联系:
>
通过注解添加元数据，然后在装饰器中获取这些元数据，完成对类、类的方法等等的修改，可以在装饰器中添加元数据的支持，比如可以可以在装饰器工厂函数以及装饰器函数中添加元数据支持等。
- 注解和装饰器可以互相模拟，不等同。 装饰器可以天生跑在运行时，注解还要通过反射(拿不到类型本身)
- 两者区别：
>
注意到装饰器是对类及其方法、入参、属性行为的修改，而注解只是添加元数据，不能修改行为
- 两者都是配合使用的：
>
装饰器提供了对类的属性、方法、入参修改的能力，但是单独靠装饰器是不够的，还要通过注解配合，这样才能动态的修改原来的表现行为。因此我们可以封装一些常用的装饰器方法，达到复用的能力。但要切记，装饰器的行为是发生在编译时

# Relfect Metadata

- 我们可以先粗略得扫一下 Relfect Metadata 的 API:

~~~js
// define metadata on an object or property
Reflect.defineMetadata(metadataKey, metadataValue, target);
Reflect.defineMetadata(metadataKey, metadataValue, target, propertyKey);

// check for presence of a metadata key on the prototype chain of an object or property
let result = Reflect.hasMetadata(metadataKey, target);
let result = Reflect.hasMetadata(metadataKey, target, propertyKey);

// check for presence of an own metadata key of an object or property
let result = Reflect.hasOwnMetadata(metadataKey, target);
let result = Reflect.hasOwnMetadata(metadataKey, target, propertyKey);

// get metadata value of a metadata key on the prototype chain of an object or property
let result = Reflect.getMetadata(metadataKey, target);
let result = Reflect.getMetadata(metadataKey, target, propertyKey);

// get metadata value of an own metadata key of an object or property
let result = Reflect.getOwnMetadata(metadataKey, target);
let result = Reflect.getOwnMetadata(metadataKey, target, propertyKey);

// get all metadata keys on the prototype chain of an object or property
let result = Reflect.getMetadataKeys(target);
let result = Reflect.getMetadataKeys(target, propertyKey);

// get all own metadata keys of an object or property
let result = Reflect.getOwnMetadataKeys(target);
let result = Reflect.getOwnMetadataKeys(target, propertyKey);

// delete metadata from an object or property
let result = Reflect.deleteMetadata(metadataKey, target);
let result = Reflect.deleteMetadata(metadataKey, target, propertyKey);

// apply metadata via a decorator to a constructor
@Reflect.metadata(metadataKey, metadataValue)
class C {
  // apply metadata via a decorator to a method (property)
  @Reflect.metadata(metadataKey, metadataValue)
  method() {
  }
}
~~~

- 看完这些API的命名其实有经验的开发者已经可以猜出来这些API的大概作用了，我们后面会提及，而且这些API接受的参数一共就四种，我们在这里说明一下:

>- `Metadata Key`: 元数据的Key，本质上内部实现是一个Map对象，以键值对的形式储存元数据
>- `Metadata Value`: 元数据的Value，这个容易理解
>- `Target`: 一个对象，表示元数据被添加在的对象上
>- `Property`: 对象的属性，元数据不仅仅可以被添加在对象上，也可以作用于属性，这跟装饰器类似

## 常用方法

### 设置/获取元数据

- 我们首先了解一下如何添加元数据，这个时候需要用到 `metadata` API，这个 API 是利用装饰器给目标添加元数据:

~~~JS
function metadata(
  metadataKey: any,
  metadataValue: any
): {
  (target: Function): void;
  (target: Object, propertyKey: string | symbol): void;
};
~~~

- 当然,如果你不想用装饰器这个途径的话，可以用 `defineMetadata` 来添加元数据.

~~~js
// define metadata on an object or property
Reflect.defineMetadata(metadataKey, metadataValue, target);
Reflect.defineMetadata(metadataKey, metadataValue, target, propertyKey);
~~~

- 我们通过装饰器就可以很简单得使用它:

~~~TS
import 'reflect-metadata'

@Reflect.metadata('name', 'xiaomuzhu')
class Person {

    @Reflect.metadata('time', '2019/10/10')
    public say(): string {
        return 'hello'
    }
}


console.log(Reflect.getMetadata('name', Person)) // xiaomuzhu
console.log(Reflect.getMetadata('time', new Person, 'say')) // 2019/10/10
~~~

- 可以看见我们在用 `metadata` 设置了元数据后，需要用 `getMetadata` 将元数据取出，但是为什么在取出方法 `say` 上的元数据时需要先把 Class 实例化(即`new Person`)呢?
- 原因就在于元数据是被**添加在了实例方法上，因此必须实例化才能取出，要想不实例化，则必须加在静态方法上**.

### 内置元数据

- 上面的例子中，我们的元数据是开发者自己设置的，其实我们也可以获取一些 TypeScript 本身内置的一些元数据。
- 比如，我们通过 `design:type` 作为 key 可以获取目标的类型，比如在上例中，我们获取 `say` 方法的类型:

~~~ts
...
// 获取方法的类型
const type = Reflect.getMetadata("design:type", new Person, 'say')

[Function: Function]
~~~

- 通过 `design:paramtypes` 作为 key 可以获取目标参数的类型，比如在上例中，我们获取 `say` 方法参数的类型:

~~~js
// 获取参数的类型,返回数组
const typeParam = Reflect.getMetadata("design:paramtypes", new Person, 'say')

// [Function: String]
~~~

- 使用 `design:returntype` 元数据键获取有关方法返回类型的信息:

~~~ts
const typeReturn = Reflect.getMetadata("design:returntype", new Person, 'say')
// [Function: String]
~~~

