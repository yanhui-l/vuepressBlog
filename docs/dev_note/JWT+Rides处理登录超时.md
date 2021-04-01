# JWT+Rides处理登录超时
> 登录模块使用JWT生成token，前端请求头带上token认证访问后端接口。设置token过期时间，过期则返回401提示用户重新登录，不过期则继续接下来的请求。  
> 但是过期时间设置太长token泄露，数据容易不安全；过期时间太短用户频繁登录，体验较差。使用 token（jwt）+redis优雅处理 过期问题

## 什么是JWT

### 定义
Json web token (JWT), 是为了在网络应用环境间传递声明而执行的一种基于JSON的开放标准（(RFC 7519). （基于JSON:可用于多种语言）

### 使用场景
Authorization (授权) : 这是使用JWT的最常见场景。一旦用户登录，后续每个请求都将包含JWT，允许用户访问该令牌允许的路由、服务和资源。单点登录是现在广泛使用的JWT的一个特性，因为它的开销很小，并且可以轻松地跨域使用。
Information Exchange (信息交换) : 对于安全的在各方之间传输信息而言，JSON Web Tokens无疑是一种很好的方式。因为JWT可以被签名，例如，用公钥/私钥对，你可以确定发送人就是它们所说的那个人。另外，由于签名是使用头和有效负载计算的，您还可以验证内容没有被篡改。

### 结构

SON Web Token由三部分组成，它们之间用圆点(.)连接。这三部分分别是：

Header    Payload    Signature

一个典型的JWT看起来是这个样子的：
```java
xxxxx.yyyyy.zzzzz
```
```java
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ
```
传给前端，应该加密



## JWT与传统Session的区别

### Session 认证
我们知道，http协议本身是一种无状态的协议，而这就意味着如果用户向我们的应用提供了用户名和密码来进行用户认证，那么下一次请求时，用户还要再一次进行用户认证才行，因为根据http协议，我们并不能知道是哪个用户发出的请求，所以为了让我们的应用能识别是哪个用户发出的请求，我们只能在服务器存储一份用户登录的信息，这份登录信息会在响应时传递给浏览器，告诉其保存为cookie,以便下次请求时发送给我们的应用，这样我们的应用就能识别请求来自哪个用户了,这就是传统的基于session认证。

### 缺陷

每个用户经过我们的应用认证之后，我们的应用都要在服务端做一次记录，以方便用户下次请求的鉴别，通常而言session都是保存在内存中，而随着认证用户的增多，服务端的开销会明显增大。

## JWT+Rides处理过期的解决方案

### ①： 每次鉴权的时候都会去延长redis时间

JWT在生成token的时候支持失效时间，但是支持的失效时间是固定的，比如说一天。但是用户在等出的时候是随机触发的，那么我们jwt token来做这个失效是不可行的，因为jwt在初始化的时候已经定死在什么时候过期了。采用其他方案，在redis中存储token，设置token的过期时间，每次鉴权的时候都会去延长时间

虽然用户不用频繁登陆，但token一直保持一直直至过期，还是不太安全

### ②： 后台定时刷新token
用户登录时，为登录用户签发JWT，并设置JWT的有效时间，同时将该用户的JWT保存至redis缓存中，并设置缓存的有效期，缓存中保存的JWT的有效期要大于JWT本身的有效时间。其中:缓存时间-JWT有效时间=token可刷新时间
流程：![效果](https://img-blog.csdnimg.cn/20210331162138243.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjE4MjcxMw==,size_16,color_FFFFFF,t_70)

### ③： 前端定时主动请求新token

打开APP发起请求，用旧token换取新token，同时旧token失效

旧token如果过期，重新登录；旧token未过期下发新token

## 优点

### 性能

JWT方式将用户状态分散到了客户端中，相比于session，可以明显减轻服务端的内存压力。Session方式存储用户id的最大弊病在于Session是存储在服务器端的，所以需要占用大量服务器内存，对于较大型应用而言可能还要保存许多的状态，一般还需借助nosql和缓存机制来实现session的存储，如果是分布式应用还需session共享。
### 单点登录
JWT能轻松的实现单点登录，因为用户的状态已经被传送到了客户端。token 可保存自定义信息，如用户基本信息，web服务器用key去解析token，就获取到请求用户的信息了。我们也可以配置它以便包含用户拥有的任何权限。这意味着每个服务不需要与授权服务交互才能授权用户。
### 前后端分离
以前的传统模式下，后台对应的客户端就是浏览器，就可以使用session+cookies的方式实现登录，但是在前后分离的情况下，后端只负责通过暴露的RestApi提供数据，而页面的渲染、路由都由前端完成。因为rest是无状态的，因此也就不会有session记录到服务器端。
### 兼容性
支持移动设备，支持跨程序调用，Cookie 是不允许垮域访问的，而 Token 则不存在这个问题。
### 可拓展性
jwt是无状态的，特别适用于分布式站点的单点登录（SSO）场景。比如有3台机器（A、B、C）组成服务器集群，若session存在机器A上，session只能保存在其中一台服务器，此时你便不能访问机器B、C，因为B、C上没有存放该Session，而使用token就能够验证用户请求合法性，并且我再加几台机器也没事，所以可拓展性好。
### 安全性
因为有签名，所以JWT可以防止被篡改。
