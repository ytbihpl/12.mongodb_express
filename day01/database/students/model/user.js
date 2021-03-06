const mongoose=require('mongoose');
//创建学生集合规则
const studentsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:2,
        maxlength:10
    },
    age:{
        type:Number,
        min: 0,
        max: 60
    },
    sex:{
        type:String
    },
    email:String,
    hobbies:[String],
    collage:String,
    enterDate:{
        type:Date,
        default:Date.now
    }
});
//创建学生信息集合
const student=mongoose.model('student',studentsSchema);
//将学生信息集合进行导出
module.exports = student;