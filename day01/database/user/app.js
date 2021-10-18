// 1.搭建网站服务器。实现客户端与服务器的通信
//2.连接数据库，创建用户集合，向集合中插入文档
//3.当用户访问/list时，将所有用户信息查询出来
//实现路由功能
//呈现用户列表页面
//从数据库中查询用户信息 将户信息展示在列表中
//4.将用户信息和表格HTML进行拼接结果响应回客户端
//5.当用户访问/add时，呈现表单页面并实现添加用户名功能
//6.当用户访问/modify时，呈现修改页面，并实现修改用户信息功能
//修改用户信息分为两大步骤
// 1.增加页面路由 呈现页面
//   1.在点击修改按钮的时候 将用户ID传递到当前页面
//   2.从数据库中查询当前有害信息 将用户信息展示到页面中
// 2.实现用户修改功能
//   1.指定表单的提交地址以及及请求方式
//   2.接受客户端传递过来的修改信息 找到用户 将有害信息更改为最新的
// 7.当用户访问/delete时，实现用户删除功能
const http = require('http');
const url = require('url');
const querysrting = require('querystring');

require('./model/index.js');
const User = require('./model/user');

//创建服务器
const app = http.createServer();
//为服务器对象添加请求事件
app.on('request', async(req, res) => {
        //请求方式
        const method = req.method;
        console.log(method);
        //请求地址
        const { pathname, query } = url.parse(req.url, true);


        if (method == 'GET') {

            //呈现用户列表页面
            if (pathname == '/list') {
                //查询用户信息
                let users = await User.find();
                //html字符串
                // console.log(users);
                let list = `
                <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        div {
            margin: 0 auto;
            width: 1000px;
        }
        
        .btn1 {
            width: 80px;
            height: 30px;
            background-color: rgba(0, 76, 255, 0.685);
            margin-bottom: 10px;
            border: 0;
            border-radius: 5px;
            color: #fff;
        }
        
        .btn2,
        .btn3 {
            background-color: red;
            border: 0;
            border-radius: 5px;
            color: #fff;
            font-size: 12px;
        }
        
        .btn3 {
            background-color: green;
        }
        
        table {
            border-collapse: collapse;
        }
        
        th {
            background-color: #f1f1f1;
        }
        
        table,
        tr,
        th,
        td {
            border: 1px solid #ccc;
        }
    </style>
</head>

<body>
    <div>
        <button class="btn1"><a href="/add">添加用户</a></button>
        <table width="1000" cellpadding="5" cellspacing="0" align="center">
            <thead>
                <tr>
                    <th>用户</th>
                    <th>年龄</th>
                    <th>爱好</th>
                    <th>邮箱</th>
                    <th>操作</th>
                </tr>

            </thead>
            <tbody>

                `;
                //对象数据进行循环操作
                users.forEach(item => {
                    list += `
                    
                    <tr>
                        <td>${item.name}</td>
                        <td>${item.age}</td>
                        <td>
                    `;
                    item.hobbies.forEach(item => {
                        list += `
                        <span>${item}</span>
                        `;
                    })
                    list += `
                    </td>
                    <td>${item.email}</td>
                    <td>
                        <button class="btn2"><a href="/remove?id=${item._id}">删除</a></button>
                        <button class="btn3"><a href="/modify?id=${item._id}">修改</a></button>
                    </td>
                </tr>

                    `;
                });

                list += `
                </tbody>
                </table>

                </div>
            </body>
            
            </html>
                `;
                res.end(list);


            } else if (pathname == '/add') {
                //呈现添加用户表单页面
                let add = `
                <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        * {
            padding: 0;
            margin: 0;
        }
        
        .box {
            width: 1000px;
            height: 800px;
            margin: 20px auto;
        }
        
        h2 {
            font-weight: normal;
            margin-bottom: 10px;
        }
        
        p {
            font-weight: 700;
        }
        
        .aihao {
            margin-bottom: 10px;
        }
        
        .ipn input {
            width: 100%;
            height: 30px;
            border: 1px solid #ccc;
            border-radius: 5px;
            margin: 10px 0 10px 0;
            padding-left: 10px;
            color: #666;
        }
        
        .bot {
            margin-top: 10px;
        }
        
        button {
            width: 80px;
            height: 30px;
            background-color: rgb(0, 98, 255);
            border: 0;
            border-radius: 5px;
            color: #fff;
        }
    </style>
</head>

<body>
    <div class="box">
        <h2>添加用户</h2>
        <form method="post" action="/add">
            <div class="ipn">
                <p>用户</p>
                <input name="name" type="text" value="请输入用户名" >
                <p>密码</p>
                <input name="password" type="text" value="请输入密码" >
                <p>年龄</p>
                <input name="age" type="text" value="请输入年龄" >
                <p>邮箱</p>
                <input name="email" type="text" value="请输入邮箱">

            </div>
            <p class="aihao"> 请选择爱好</p>

            <input type="checkbox" value="足球" name="hobbies"> 足球
            <input type="checkbox" value="篮球" name="hobbies"> 篮球
            <input type="checkbox" value="橄榄球" name="hobbies"> 橄榄球
            <input type="checkbox" value="敲代码" name="hobbies"> 敲代码
            <input type="checkbox" value="抽烟" name="hobbies"> 抽烟
            <input type="checkbox" value="喝酒" name="hobbies"> 喝酒
            <input type="checkbox" value="烫头" name="hobbies"> 烫头
            <div class="bot"> <button>添加用户</button></div>
        </form>

    </div>
</body>

</html>
                `;
                res.end(add);
            } else if (pathname == '/modify') {
                let user = await User.findOne({ _id: query.id });
                let hobbies = ['足球', '篮球', '橄榄球', '敲代码', '抽烟', '喝酒', '烫头']
                    //呈现修改用户表单页面足球
                let modify = `
                                <!DOCTYPE html>
                <html lang="en">
                
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Document</title>
                    <style>
                        * {
                            padding: 0;
                            margin: 0;
                        }
                        
                        .box {
                            width: 1000px;
                            height: 800px;
                            margin: 20px auto;
                        }
                        
                        h2 {
                            font-weight: normal;
                            margin-bottom: 10px;
                        }
                        
                        p {
                            font-weight: 700;
                        }
                        
                        .aihao {
                            margin-bottom: 10px;
                        }
                        
                        .ipn input {
                            width: 100%;
                            height: 30px;
                            border: 1px solid #ccc;
                            border-radius: 5px;
                            margin: 10px 0 10px 0;
                            padding-left: 10px;
                            color: #666;
                        }
                        
                        .bot {
                            margin-top: 10px;
                        }
                        
                        button {
                            width: 80px;
                            height: 30px;
                            background-color: rgb(0, 98, 255);
                            border: 0;
                            border-radius: 5px;
                            color: #fff;
                        }
                    </style>
                </head>
                
                <body>
                    <div class="box">
                        <h2>修改用户</h2>
                        <form method="post" action="/modify?id=${user._id}">
                            <div class="ipn">
                                <p>用户</p>
                                <input name="name" type="text" value="${user.name}" >
                                <p>密码</p>
                                <input name="password" type="text" value=${user.password} >
                                <p>年龄</p>
                                <input name="age" type="text" value="${user.age}" >
                                <p>邮箱</p>
                                <input name="email" type="text" value="${user.email}">
                
                            </div>
                            <p class="aihao"> 请选择爱好</p>                            
                           
                    `;
                hobbies.forEach(item => {
                    //判断当前环循项在不在用户的爱好数据组

                    let isHobby = user.hobbies.includes(item);
                    if (isHobby) {
                        modify += `
                        <input type="checkbox" value="${item}" name="hobbies" checked> ${item}
                                `;
                    } else {
                        modify += `
                        <input type="checkbox" value="${item}" name="hobbies" > ${item}
                                `;

                    }
                })
                modify += `
                            <div class="bot"> <button>修改用户</button>
                        </div>
                    </form>
                </div>
            </body>
            </html>

                    `;
                res.end(modify);

            } else if (pathname == '/remove') {
                // res.end(query.id)
                await User.findByIdAndDelete({ _id: query.id });
                res.writeHead(301, {
                    Location: '/list'
                });
                res.end();
            }
        } else if (method == 'POST') {
            //用户添加功能
            if (pathname == '/add') {
                //接受用户提交的信息
                let formData = '';
                //接受post参数
                req.on('data', param => {
                        formData += param;
                    })
                    //post参数接受完毕
                req.on('end', async() => {
                        let user = querysrting.parse(formData);

                        //将用户名提交的信息添加到数据库中
                        await User.create(user);
                        //301代表重定向
                        //location跳转地址
                        res.writeHead(301, {
                            Location: '/list'
                        });
                        res.end();
                    })
                    //将用户提交的信息添加到数据库中
            } else if (pathname == '/modify') {
                //接受用户提交的信息
                let formData = '';
                //接受post参数
                req.on('data', param => {
                        formData += param;

                    })
                    //post参数接受完毕
                req.on('end', async() => {
                    let user = querysrting.parse(formData);
                    console.log(user);

                    //将用户名提交的信息添加到数据库中
                    await User.updateOne({ _id: query.id }, user);
                    //301代表重定向
                    //location跳转地址
                    res.writeHead(301, {
                        Location: '/list'
                    });
                    res.end();
                })

            }
        }

    })
    //监听端口
app.listen(3000);