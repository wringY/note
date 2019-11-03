之前都有这样一个理解：
ajax请求时是不会自动带上cookie的，要是想让他带上的话，必须哟啊设置withCredential为true。
这个说法会让人产生完全扭曲的误解，我就是其中之一。
完整的无歧义的表述应该是这样：
1.ajax会自动带上同源的cookie，不会带上不同源的cookie

2. 可以通过前端设置withCredentials为true， 后端设置Header的方式让ajax自动带上不同源的cookie，但是这个属性对同源请求没有任何影响。会被自动忽略。
3. 这是MDN对withCredentials的解释：[ MDN-withCredentials](https://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/withCredentials) ，我接着解释一下同源。
  众所周知，ajax请求是有同源策略的，虽然可以应用CORS等手段来实现跨域，但是这并不是说这样就是“同源”了。ajax在请求时就会因为这个同源的问题而决定是否带上cookie，这样解释应该没有问题了吧，还不知道同源策略的，应该去谷歌一下看看。

- 以jquery的ajax为例

~~~
$.ajax({
        url : 'http://remote.domain.com/corsrequest',
        data : data,
        dataType: 'json',
        type : 'POST',
        crossDomain: true,
        contentType: "application/json", // POST时必须
        ...
~~~

- 主要注意的是参数 **crossDomain: true**。发送Ajax时，Request header 中会包含跨域的额外信息，但不会含cookie。

- 带Cookie的跨域Ajax请求

  ~~~
  $.ajax({
          url : 'http://remote.domain.com/corsrequest',
          data : data,
          dataType: 'json',
          type : 'POST',
          xhrFields: {
              withCredentials: true
          },
          crossDomain: true,
          contentType: "application/json",
          ...
  ~~~

- 通过设置 `withCredentials: true` ，发送Ajax时，Request header中便会带上 Cookie 信息。

