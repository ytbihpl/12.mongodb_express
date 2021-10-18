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
    //查找文档，返回删除文档，如果有多个匹配的文档，那么删除第一条匹配的文档
    // User.findOneAndDelete({ _id: '6107903f04a64a188488e3ee' }).then(result => console.log(result))
    //删除多条文档
User.deleteMany({}).then(result => console.log(result))