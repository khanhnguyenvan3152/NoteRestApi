module.exports = function(req,res,next){
    const userId = req.user._id
    if(userId==req.params.userId){
        next()
    }else{
        res.status(400).send(`Access denied`)
    }
}