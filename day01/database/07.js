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
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        //必选字段
        required: [true, '请输入文章标题'],
        //字符串的最小长度
        minlength: [2, '文章长度不能小于2'],
        //字符串的最大长度
        maxlength: [5, '文章长度最大不能超过5'],
        //去除字符串两边的空格
        trim: true
    },
    age: {
        type: Number,
        //数字的 最小范围
        min: 18,
        //数字的 最大范围
        max: 100
    },
    publishDate: {
        type: Date,
        //默认值
        default: Date.now
    },
    category: {
        type: String,
        //枚举 列举出当前字段可以拥有的值
        enum: {
            values: ['html', 'css', 'javascript', 'node.js'],
            message: '父类名称要在一定的范围内才可以'
        }
    },
    author: {
        type: String,
        validate: {
            validator: v => {
                //返回布尔值
                //true验证成功
                // false验证失败
                //v要验证的值
                return v && v.length > 4
            },
            //自定义错误信息
            message: '传入的值不符合验证规则'
        }
    }


});
const Post = mongoose.model('Post', postSchema);
Post.create({ title: 'aaa', age: 60, category: 'java', author: 'db' })
    .then(result => console.log(result))
    // .catch(error => console.log(error))
    .catch(error => {
        //console.log(error);
        //获取错误信息对象
        const err = error.errors;
        //循环错误信息对象
        for (var attr in err) {
            //将错误信息打印到控制台中
            //console.log(err[attr]);
            console.log(err[attr]['message']);
        }
    })