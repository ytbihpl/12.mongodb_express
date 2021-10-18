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
    name: {
        type: String,
        required: true
    }
});
const postSchema = new mongoose.Schema({
        title: {
            type: String
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }

    })
    // 用户集合
const User = mongoose.model('User', userSchema)
const post = mongoose.model('post', postSchema)
    //创建用户
    //User.create({ name: 'itheima' }).then(result => console.log(result))
    //post.create({ titile: '123', author: '616d24a4696b0334b4cff9c1' }).then(result => console.log(result))
 post.find().populate('author').then(result => console.log(result))