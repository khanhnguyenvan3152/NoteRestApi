const mongoose = require('mongoose')
const connectionString = `mongodb+srv://khanh:khanh123@cluster0.ubndu.mongodb.net/notedb`

const connect = function(){
    mongoose.connect(connectionString,{
        retryWrites:true,
        useNewUrlParser:true,
        useUnifiedTopology: true
    }).then(function(){
        console.log('Database connected successfully')
    }).catch(err=>{
        console.log(err)
    })
}
module.exports = {connect}