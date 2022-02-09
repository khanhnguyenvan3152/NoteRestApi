const mongoose = require('mongoose')
const connectionString =  process.env.DB_CONNECTIONSTRING

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