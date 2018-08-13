var express = require('express');
var app = express();
var proxy = require('http-proxy-middleware');
var host = 'localhost';
var port = '3002';

app.use('/', express.static('static'));//设置静态资源
app.use('/api/*',proxy({
    target: 'https://iottest.china-m2m.com', // 目标路径
    changeOrigin: true,
    pathRewrite:{
        '^/api':''
    }
}))
app.use('/qq/*',proxy({
    target:'http://music.163.com/api',
    changeOrigin:true,
    pathRewrite:{
        '^/qq':''
    }
}))

app.listen(port,function () {
    console.log("server is listening at http://%s:%s", host, port)
})