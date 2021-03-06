###MIME是什么
- 百科：MIME(Multipurpose Internet Mail Extensions)多用途互联网邮件扩展类型。是**设定某种扩展名的文件用一种应用程序来打开的方式类型**，**当该扩展名文件被访问的时候，浏览器会自动使用指定应用程序来打开**。多用于指定一些客户端自定义的文件名，以及一些媒体文件打开方式。
按照百科的意思：照这句话的意思，我们有个jpg扩展名的图片文件，它的MIME类型也应该叫jpg。在访问这张图片时，浏览器自己不显示，用系统的相册应用程序来打开……你见过这种操作吗？（如果MIME叫exe，难道还能不经同意直接在我们电脑上运行病毒不成）。
- 正确的科普
**文件扩展名是什么？**
是**操作系统**用来**标注文件格式**的一种机制，用一个点号（.）和主文件名分隔开。由于历史原因，多数扩展名是三个字母。
注意，这里说的是标注，而非定义，既然是标注，**说明不是强制的**。
比如你用photoshop可以打开一个psd图像文件。把这个文件扩展名改为txt，再拖到photoshop窗口里，还是一样能打开，说明内容完全没有变化，变化的只是双击时的默认打开方式。
**MIME又是什么？**
全名叫多用途互联网邮件扩展（Multipurpose Internet Mail Extensions），最初是为了将纯文本格式的电子邮件扩展到可以支持多种信息格式而定制的。后来被应用到多种协议里，包括我们常用的HTTP协议，在HTTP中，MIME类型被定义在Content-Type header中。
例如，架设你要传送一个Microsoft Excel文件到客户端。那么这时的MIME类型就是“application/vnd.ms-excel”。在大多数实际情况中，这个文件然后将传送给Execl来处理（假设我们设定Execl为处理特殊MIME类型的应用程序）。在ASP中，设定MIME类型的方法是通过Response对象的ContentType属性。
**MIME出现的背景**
最早的HTTP协议中，并没有附加的数据类型信息，所有传送的数据都被客户程序解释为超文本标记语言HTML 文档，而**为了支持多媒体数据类型**，HTTP协议中就使用了**附加在文档之前的MIME数据类型信息来标识数据类型**。
**MIME类型的组成**
每个MIME类型由两部分组成，前面是数据的大类别，例如声音audio、图象image等，后面定义具体的种类。
例如图片的MIME类型：image/jpeg
