const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(()=>console.log('数据库连接成功'))
    .catch(err=>console.log(err,'数据库连接失败'));

//创建集合规则
const courseSchema = new mongoose.Schema({
    name:String,
    age:Number,
    hobbies:Array,
    email:String,
    password:String
});
//使用规则创建集合
const Course = mongoose.model('User',courseSchema) //courses
//创建文档
Course.create({name:'王五',age:25,hobbies:['上网','打游戏'],email:'wangwu@itcast.cn',password:'123456'},(err,result)=>{
    console.log(err);
    console.log(result);
})
Course.create({name:'张三',age:24,hobbies:['看电影','打游戏'],email:'zhangshan@itcast.cn',password:'123456'},(err,result)=>{
    console.log(err);
    console.log(result);
})
Course.create({name:'李四',age:23,hobbies:['购物','打游戏'],email:'lishi@itcast.cn',password:'123456'},(err,result)=>{
    console.log(err);
    console.log(result);
})
Course.create({name:'赵六',age:22,hobbies:['看书','打游戏','购物'],email:'zhaoliu@itcast.cn',password:'123456'},(err,result)=>{
    console.log(err);
    console.log(result);
})
Course.create({name:'小明',age:21,hobbies:['吃饭','睡觉'],email:'xiaoming@itcast.cn',password:'123456'},(err,result)=>{
    console.log(err);
    console.log(result);
})
Course.create({name:'小红',age:20,hobbies:['走路'],email:'xiaohong@itcast.cn',password:'123456'},(err,result)=>{
    console.log(err);
    console.log(result);
})

// Course.create({name:'Javascript123',author:'黑马讲师',isPublished:false})
//     .then((result)=>{
//         console.log(result)
//     })