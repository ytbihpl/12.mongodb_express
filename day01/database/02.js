const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(()=>console.log('数据库连接成功'))
    .catch(err=>console.log(err,'数据库连接失败'));

//创建集合规则
const courseSchema = new mongoose.Schema({
    name:String,
    author:String,
    isPublished:Boolean
});
//使用规则创建集合
const Course = mongoose.model('Course',courseSchema) //courses
//创建文档
const course = new Course({
    name:'node.js基础',
    author:'黑马讲师',
    isPublished:true
});
//将文档插入到数据库中
course.save();