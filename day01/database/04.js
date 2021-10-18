const mongoose = require('mongoose');
const { resourceLimits } = require('worker_threads');

mongoose.connect('mongodb://localhost/playground', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    //连接成功
    .then(() => console.log('数据库连接成功'))
    //连接失败
    .catch(err => console.log(err, '数据库连接失败'))
    //创建集合规则
const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    password: String
});
//使用规则创建集合
const User = mongoose.model('User', userSchema) // courses
    //查询用户集合中的所有文档
    // User.find().then(result => console.log(result));
    //通过—id字段查找文档
    // User.find({ _id: "610609994ed07f1550f3c94d" }).then(result => console.log(result));
    //findOne()方法返回一条文档 默认返回当前集合的第一条文档
    // User.findOne({ name: "张三" }).then(result => console.log(result))
    //查询匹配大于  小于
    // User.find({ age: { $gt: 20, $lt: 40 } }).then(result => console.log(result))
    //查询匹配包含
    // User.find({ hobbies: { $in: ['爱好'] } }).then(result => console.log(result))
    //选择要查询的字段
    // User.find().select('name email -_id').then(result => console.log(result))
    //根据年龄字段进行升序排列
    // User.find().sort('age').then(result => console.log(result))
    //根据年龄字段进行降序排列
    // User.find().sort('-age').then(result => console.log(result))
    //skip跳过多少条数据，limit限制查询数量
User.find().skip(1).limit(2).then(result => console.log(result))