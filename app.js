//1、引入express
var express = require('express')
var fs = require('fs')

var app = express()
//配置使用art-template模板引擎
app.engine('html', require('express-art-template'))

var comments = []

//开放/public/,这样直接就把样式库开放了
app.use('/public/', express.static('./public/'))

//请求/，返回index.html
app.get('/', function (req, res) {
  res.render('index.html', {
    comments: comments
  })
})
//请求/post,返回post.html
app.get('/post', function (req, res) {
  res.render('post.html')
})
//写完评论后请求/pinglun,将评论添加到comments里，然后重定向到主页面
app.get('/pinglun', function (req, res) {
  var comment = req.query
  //添加评论时间
  var date = new Date()
  comment.dateTime = date.getFullYear() + '-' + (date.getMonth() + 1) +
    '-' + date.getDate() + ' ' + date.getHours() +
    ':' + date.getMinutes() + ':' + date.getSeconds()
  comments.unshift(comment)
  //设置重定向
  // res.statusCode = 302
  // res.setHeader('Location', '/')
  // res.send()
  res.redirect('/')
})



//3、打开监听端口3000，启动服务器
app.listen(3000, function () {
  console.log('running...')
})