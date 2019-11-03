#### 修改网络访问权限和网站跟目录

- 通过ip可以在局域网访问到某台电脑，wamp的Apache不允许通过ip访问，我们可以在httpd.conf中修改权限，在这个文件中的directory中把deny from all 修改为 allow from all.

- 我们可以修改wamp服务器的apache跟目录：在httpd.conf中修改DocumentRoot为指定的路径。

  ​

### 修改apache站点个数

- 默认情况下只有根目录的网站才能被访问到。

- apache同时支持多个站点，采用apache配置多个虚拟主机。

- 在httpd.conf中找到virtual hosts把前面的#号去掉，同时把所指路径中的文件进行修改

  在这个文件中寻找virtual host：80，把这部分进行复制（每配置一个虚拟主机就复制一份），只保留三项documentRoot、

  serverName（域名）、serverAlias（别名）进行修改。

- 配置域名与ip地址的映射关系：

  C:\Windows\System32\drivers\etc中配置多个127.0.0.1       localhost，ip与域名的映射关系。