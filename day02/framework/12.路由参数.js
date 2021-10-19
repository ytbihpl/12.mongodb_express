//引入express框架
const express = require('express');
const bodyParser=require('body-parser');
//创建网站服务器
const app = express();

app.get('/index/:id/:name/:age',(req,res)=>{
    //接受post请求参数
    res.send(req.params)
})
//监听窗口
app.listen(3000);
