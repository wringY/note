## nginx

### nginx概念

- nginx是一款自由的、开源的、高性能的HTTP服务器和反向代理服务器；同时也是一个IMAP、POP3、SMTP代理服务器；nginx可以作为一个HTTP服务器进行网站的发布处理，另外nginx可以作为反向代理进行负载均衡的实现。

### nginx在应用程序中的作用

- 解决跨域
- 请求过滤
- 配置gzip
- 负载均衡
- 静态资源服务器

### 代理

- 说到代理，首先我们要明确一个概念，所谓代理就是一个代表、一个渠道。
- 此时就涉及到两个角色，一个是被代理角色，一个是目标角色，被代理角色通过这个代理访问目标角色完成一些任务的过程称为代理操作过程；如同生活中的专卖店~客人到adidas专卖店买了一双鞋，这个专卖店就是代理，被代理角色就是adidas厂家，目标角色就是用户。

### 正向代理

- 正向代理也是大家最常接触的到的代理模式，我们会从两个方面来说关于正向代理的处理模式，分别从软件方面和生活方面来解释一下什么叫正向代理
- 在如今的网络环境下，我们如果由于技术需要要去访问国外的某些网站，此时你会发现位于国外的某网站我们通过浏览器是没有办法访问的，此时大家可能都会用一个操作FQ进行访问，FQ的方式主要是找到一个可以访问国外网站的代理服务器，我们将请求发送给代理服务器，代理服务器去访问国外的网站，然后将访问到的数据传递给我们！
- 上述这样的代理模式称为正向代理，**正向代理最大的特点是客户端非常明确要访问的服务器地址；服务器只清楚请求来自哪个代理服务器，而不清楚来自哪个具体的客户端；正向代理模式屏蔽或者隐藏了真实客户端信息**。
- **正向代理**是为我们服务的，即为客户端服务的，客户端可以根据正向代理访问到它本身无法访问到的服务器资源。
- **正向代理**对我们是透明的，对服务端是非透明的，即服务端并不知道自己收到的是来自代理的访问还是来自真实客户端的访问。

### 反向代理

- 举例如我大天朝的某宝网站，每天同时连接到网站的访问人数已经爆表，单个服务器远远不能满足人民日益增长的购买欲望了，此时就出现了一个大家耳熟能详的名词：分布式部署；也就是通过部署多台服务器来解决访问人数限制的问题；某宝网站中大部分功能也是直接使用nginx进行反向代理实现的，并且通过封装nginx和其他的组件之后起了个高大上的名字：Tengine，有兴趣的童鞋可以访问Tengine的官网查看具体的信息：http://tengine.taobao.org/
- 那么反向代理具体是通过什么样的方式实现的分布式的集群操作呢，我们先看一个示意图:

![](./img/Nginx.png)

- 通过上述的图解大家就可以看清楚了，多个客户端给服务器发送的请求，nginx服务器接收到之后，按照一定的规则分发给了后端的业务处理服务器进行处理了。此时~请求的来源也就是客户端是明确的，但是请求具体由哪台服务器处理的并不明确了，nginx扮演的就是一个反向代理角色。
- **反向代理**对服务端是透明的，对我们是非透明的，即我们并不知道自己访问的是代理服务器，而服务器知道反向代理在为他服务。
- 反向代理，主要用于服务器集群分布式部署的情况下，反向代理隐藏了服务器的信息！
- 项目场景:   通常情况下，我们在实际项目操作时，正向代理和反向代理很有可能会存在在一个应用场景中，正向代理代理客户端的请求去访问目标服务器，目标服务器是一个反向代理服务器，反向代理了多台真实的业务处理服务器。具体的拓扑图如下：

![](./img/拓扑.png)

### 负载均衡

- 我们已经明确了所谓代理服务器的概念，那么接下来，nginx扮演了反向代理服务器的角色，它是以依据什么样的规则进行请求分发的呢？不用的项目应用场景，分发的规则是否可以控制呢？

- 这里提到的客户端发送的、nginx反向代理服务器接收到的请求数量，就是我们说的负载量。

- 请求数量按照一定的规则进行分发到不同的服务器处理的规则，就是一种均衡规则。所以~将服务器接收到的请求按照规则分发的过程，称为负载均衡。

- 负载均衡在实际项目操作过程中，有硬件负载均衡和软件负载均衡两种，硬件负载均衡也称为硬负载，如F5负载均衡，相对造价昂贵成本较高，但是数据的稳定性安全性等等有非常好的保障，如中国移动中国联通这样的公司才会选择硬负载进行操作；更多的公司考虑到成本原因，会选择使用软件负载均衡，软件负载均衡是利用现有的技术结合主机硬件实现的一种消息队列分发机制。
#### nginx支持的负载均衡调度算法
1. weight轮询（默认）：接收到的请求按照顺序逐一分配到不同的后端服务器，即使在使用过程中，某一台后端服务器宕机，nginx会自动将该服务器剔除出队列，请求受理情况不会受到任何影响。 这种方式下，可以给不同的后端服务器设置一个权重值（weight），用于调整不同的服务器上请求的分配率；权重数据越大，被分配到请求的几率越大；该权重值，主要是针对实际工作环境中不同的后端服务器硬件配置进行调整的。

2. ip_hash：每个请求按照发起客户端的ip的hash结果进行匹配，这样的算法下一个固定ip地址的客户端总会访问到同一个后端服务器，这也在一定程度上解决了集群部署环境下session共享的问题。

3. fair：智能调整调度算法，动态的根据后端服务器的请求处理到响应的时间进行均衡分配，响应时间短处理效率高的服务器分配到请求的概率高，响应时间长处理效率低的服务器分配到的请求少；结合了前两者的优点的一种调度算法。但是需要注意的是nginx默认不支持fair算法，如果要使用这种调度算法，请安装upstream_fair模块

4. url_hash：按照访问的url的hash结果分配请求，每个请求的url会指向后端固定的某个服务器，可以在nginx作为静态服务器的情况下提高缓存效率。同样要注意nginx默认不支持这种调度算法，要使用的话需要安装nginx的hash软件包。
### Nginx安装
- 官方网站下载地址：https://nginx.org/en/download.html
- 下载对应的版本的nginx压缩包，解压到自己电脑上存放软件的文件夹中即可。
- 解压完成后，文件目录结构如下。

![](./img/安装.png)
### 启动nginx
- 直接双击该目录下的nginx.exe，即可启动nginx服务器

- 命令行键入该文件夹，执行nginx命令，也会直接启动nginx服务器
### 访问nginx
- 打开浏览器，输入地址：http://localhost，访问页面，出现如下页面表示访问成功

![](./img/访问.png)
### 停止nginx
命令行进入nginx根目录，执行如下命令，停止服务器：
~~~
# 强制停止nginx服务器，如果有未处理的数据，丢弃
D:/resp_application/nginx-1.13.5> nginx -s stop
 
# 优雅的停止nginx服务器，如果有未处理的数据，等待处理完成之后停止
D:/resp_application/nginx-1.13.5> nginx -s quit
~~~
## Nginx配置
- nginx是一个功能非常强大的web服务器加反向代理服务器，同时又是邮件服务器等等

- 在项目使用中，使用最多的三个核心功能是反向代理、负载均衡和静态服务器

- 这三个不同的功能的使用，都跟nginx的配置密切相关，nginx服务器的配置信息主要集中在nginx.conf这个配置文件中，并且所有的可配置选项大致分为以下几个部分
~~~javascript
main                                # 全局配置
 
events {                            # nginx工作模式配置
 
}
 
http {                                # http设置
    ....
 
    server {                        # 服务器主机配置
        ....
        location {                    # 路由配置
            ....
        }
 
        location path {
            ....
        }
 
        location otherpath {
            ....
        }
    }
 
    server {
        ....
 
        location {
            ....
        }
    }
 
    upstream name {                    # 负载均衡配置
        ....
    }
}
~~~

- `main`:nginx的全局配置，对全局生效。

- `events`:配置影响nginx服务器或与用户的网络连接。

- `http`：可以嵌套多个server，配置代理，缓存，日志定义等绝大多数功能和第三方模块的配置。

- `server`：配置虚拟主机的相关参数，一个http中可以有多个server。

- `location`：配置请求的路由，以及各种页面的处理情况。

- `upstream`：配置后端服务器具体地址，负载均衡配置不可或缺的部分。
### main模块
~~~javascript
# user nobody nobody;
worker_processes 2;
# error_log logs/error.log
# error_log logs/error.log notice
# error_log logs/error.log info
# pid logs/nginx.pid
worker_rlimit_nofile 1024;
~~~
#### main模块配置选项

- 上述配置都是存放在main全局配置模块中的配置项	
- user用来指定nginx worker进程运行用户以及用户组，默认nobody账号运行
- worker_processes指定nginx要开启的子进程数量，运行过程中监控每个进程消耗内存(一般几M~几十M不等)根据实际情况进行调整，通常数量是CPU内核数量的整数倍
- error_log定义错误日志文件的位置及输出级别【debug / info / notice / warn / error / crit】
- pid用来指定进程id的存储文件的位置
- worker_rlimit_nofile用于指定一个进程可以打开最多文件数量的描述

### event 模块

~~~java&#39;c
event {
    worker_connections 1024;
    multi_accept on;
    use epoll;
}
~~~
#### event 模块配置选项
- 上述配置是针对nginx服务器的工作模式的一些操作配置
- worker_connections 指定最大可以同时接收的连接数量，这里一定要注意，最大连接数量是和worker processes共同决定的。

- multi_accept 配置指定nginx在收到一个新连接通知后尽可能多的接受更多的连接

- use epoll 配置指定了线程轮询的方法，如果是linux2.6+，使用epoll，如果是BSD如Mac请使用Kqueue
### http模块
- 作为web服务器，http模块是nginx最核心的一个模块，配置项也是比较多的，项目中会设置到很多的实际业务场景，需要根据硬件信息进行适当的配置，常规情况下，使用默认配置即可！
~~~javascript
    http {
    ##
    # 基础配置
    ##
 
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;
    # server_tokens off;
 
    # server_names_hash_bucket_size 64;
    # server_name_in_redirect off;
 
    include /etc/nginx/mime.types;
    default_type application/octet-stream;
 
    ##
    # SSL证书配置
    ##
 
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2; # Dropping SSLv3, ref: POODLE
    ssl_prefer_server_ciphers on;
 
    ##
    # 日志配置
    ##
 
    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log;
 
    ##
    # Gzip 压缩配置
    ##
 
    gzip on;
    gzip_disable "msie6";
 
    # gzip_vary on;
    # gzip_proxied any;
    # gzip_comp_level 6;
    # gzip_buffers 16 8k;
    # gzip_http_version 1.1;
    # gzip_types text/plain text/css application/json application/javascript
 text/xml application/xml application/xml+rss text/javascript;
 
    ##
    # 虚拟主机配置
    ##
 
    include /etc/nginx/conf.d/*.conf;
    include /etc/nginx/sites-enabled/*;
~~~
#### 基础配置
~~~
sendfile on：配置on让sendfile发挥作用，将文件的回写过程交给数据缓冲去去完成，而不是放在应用中完成，这样的话在性能提升有有好处
tc_nopush on：让nginx在一个数据包中发送所有的头文件，而不是一个一个单独发
tcp_nodelay on：让nginx不要缓存数据，而是一段一段发送，如果数据的传输有实时性的要求的话可以配置它，发送完一小段数据就立刻能得到返回值，但是不要滥用哦
 
keepalive_timeout 10：给客户端分配连接超时时间，服务器会在这个时间过后关闭连接。一般设置时间较短，可以让nginx工作持续性更好
client_header_timeout 10：设置请求头的超时时间
client_body_timeout 10:设置请求体的超时时间
send_timeout 10：指定客户端响应超时时间，如果客户端两次操作间隔超过这个时间，服务器就会关闭这个链接
 
limit_conn_zone $binary_remote_addr zone=addr:5m ：设置用于保存各种key的共享内存的参数，
limit_conn addr 100: 给定的key设置最大连接数
 
server_tokens：虽然不会让nginx执行速度更快，但是可以在错误页面关闭nginx版本提示，对于网站安全性的提升有好处哦
include /etc/nginx/mime.types：指定在当前文件中包含另一个文件的指令
default_type application/octet-stream：指定默认处理的文件类型可以是二进制
type_hash_max_size 2048：混淆数据，影响三列冲突率，值越大消耗内存越多，散列key冲突率会降低，检索速度更快；值越小key，占用内存较少，冲突率越高，检索速度变慢
~~~
####  日志配置
- access_log logs/access.log：设置存储访问记录的日志
- error_log logs/error.log：设置存储记录错误发生的日志
#### SSL证书加密
- ssl_protocols：指令用于启动特定的加密协议，nginx在1.1.13和1.0.12版本后默认是ssl_protocols SSLv3 TLSv1 TLSv1.1 TLSv1.2，TLSv1.1与TLSv1.2要确保OpenSSL >= 1.0.1 ，SSLv3 现在还有很多地方在用但有不少被攻击的漏洞。
- ssl prefer server ciphers：设置协商加密算法时，优先使用我们服务端的加密套件，而不是客户端浏览器的加密套件
#### 压缩配置
~~~
gzip 是告诉nginx采用gzip压缩的形式发送数据。这将会减少我们发送的数据量。
gzip_disable 为指定的客户端禁用gzip功能。我们设置成IE6或者更低版本以使我们的方案能够广泛兼容。
gzip_static 告诉nginx在压缩资源之前，先查找是否有预先gzip处理过的资源。这要求你预先压缩你的文件（在这个例子中被注释掉了），从而允许你使用最高压缩比，这样nginx就不用再压缩这些文件了（想要更详尽的gzip_static的信息，请点击这里）。
gzip_proxied 允许或者禁止压缩基于请求和响应的响应流。我们设置为any，意味着将会压缩所有的请求。
gzip_min_length 设置对数据启用压缩的最少字节数。如果一个请求小于1000字节，我们最好不要压缩它，因为压缩这些小的数据会降低处理此请求的所有进程的速度。
gzip_comp_level 设置数据的压缩等级。这个等级可以是1-9之间的任意数值，9是最慢但是压缩比最大的。我们设置为4，这是一个比较折中的设置。
gzip_type 设置需要压缩的数据格式。上面例子中已经有一些了，你也可以再添加更多的格式。
~~~
### server模块
- srever模块配置是http模块中的一个子模块，用来定义一个虚拟访问主机，也就是一个虚拟服务器的配置信息
~~~
server {
    listen        80;
    server_name localhost    192.168.1.100;
    root        /nginx/www;
    index        index.php index.html index.html;
    charset        utf-8;
    access_log    logs/access.log;
    error_log    logs/error.log;
    ......
}
~~~
####server模块核心配置选项
- server：一个虚拟主机的配置，一个http中可以配置多个server

- server_name：用力啊指定ip地址或者域名，多个配置之间用空格分隔

- root：表示整个server虚拟主机内的根目录，所有当前主机中web项目的根目录

- index：用户访问web网站时的全局首页

- charset：用于设置www/路径中配置的网页的默认编码格式

- access_log：用于指定该虚拟主机服务器中的访问记录日志存放路径

- error_log：用于指定该虚拟主机服务器中访问错误日志的存放路径
###location模块
- location模块是nginx配置中出现最多的一个配置，主要用于配置路由访问信息

- 在路由访问信息配置中关联到反向代理、负载均衡等等各项功能，所以location模块也是一个非常重要的配置模块
#### 基本配置
~~~
location / {
    root    /nginx/www;
    index    index.php index.html index.htm;
}
~~~
- location /：表示匹配访问根目录

- root：用于指定访问根目录时，访问虚拟主机的web目录

- index：在不指定访问具体资源时，默认展示的资源文件列表
#### 反向代理配置方式
~~~
location / {
    proxy_pass http://localhost:8888;
    proxy_set_header X-real-ip $remote_addr;
    proxy_set_header Host $http_host;
}
~~~
### uwsgi配置
- wsgi模式下的服务器配置访问方式
~~~
location / {
    include uwsgi_params;
    uwsgi_pass localhost:8888
}
~~~
### upstream模块
- upstream模块主要负责负载均衡的配置，通过默认的轮询调度方式来分发请求到后端服务器
- 简单的配置方式如下:
~~~
upstream name {
    ip_hash;
    server 192.168.1.100:8000;
    server 192.168.1.100:8001 down;
    server 192.168.1.100:8002 max_fails=3;
    server 192.168.1.100:8003 fail_timeout=20s;
    server 192.168.1.100:8004 max_fails=3 fail_timeout=20s;
}
~~~
#### 核心配置信息
~~~
ip_hash：指定请求调度算法，默认是weight权重轮询调度，可以指定

server host:port：分发服务器的列表配置

-- down：表示该主机暂停服务

-- max_fails：表示失败最大次数，超过失败最大次数暂停服务

-- fail_timeout：表示如果请求受理失败，暂停指定的时间之后重新发起请求
~~~
