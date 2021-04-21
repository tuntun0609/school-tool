# JNU南校工具箱

本小程序主要致力于为JNU南校区同学提供各类信息服务，用爱发电，欢迎打赏

如在使用过程中发现bug或者希望与我们联系合作：

请添加开发者微信：**tuntun760523867** 或发送邮件至：nozomi_ruby@163.com

## 小程序官方文档

- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)

## 云函数

#### addItem

##### 参数：

```javascript
data:{
    dbName //要向哪个数据库添加信息
    addData //添加的信息
}
```

##### 返回值：

```javascript
成功：
{
    state:200,
    msg:'添加成功'
}

失败：
{
    state:201,
    msg:'添加失败',
    data: err
}
```



#### deleteItemById

通过`_id`删除某条记录

##### 参数：

```javascript
data:{
    id //要删除记录的_id
}
```



#### getFoodShop

获取外卖商铺列表信息，一次获取20条，需要传入`skipNum`来获取更多数据

##### 参数：

```javascript
data:{
    skipNum //检索起始索引值，如不设置则默认则为0
}
```



#### getItemDetailById

通过`_id`获取某条记录的数据

一次获取20条，需要传入`skipNum`来获取更多数据

返回的数据按照创建记录的时间戳降序排列

##### 参数：

```javascript
data:{
    skipNum //检索起始索引值，如不设置则默认则为0
    id //要搜索记录的_id
}
```



#### getItemDetailByUser

通过某位用户的`openid`获取该用户发布的所有记录

返回的数据按照创建记录的时间戳降序排列

##### 参数：

```javascript
data:{
    openid //用户openid
}
```



#### getWallItemByTag

通过`tag`的值来查找数据

一次获取20条，需要传入`skipNum`来获取更多数据

返回的数据按照创建记录的时间戳降序排列

##### 参数：

```javascript
data:{
    skipNum //检索起始索引值，如不设置则默认则为0
    tag //要搜索记录的tag
}
```



#### getItemTotalNumByTag

通过`tag`获取对应tag值的记录的总数

##### 参数：

```javascript
data:{
    tag //要搜索记录的tag
}
```



#### login

登录

##### 返回值：

```javascript
{
    event
    openid
    appid
    unionid
}
```

