const jwt = require('jsonwebtoken')
const Validator = require('../helpers/validation')
const User = require('../models/users')
const bcrypt = require('bcryptjs')
const register = async function (req, res, next) {
    console.log(req.body)
    const { error } = Validator.validateRegister(req.body)
    if (error) {
        return res.status(400).send(error)
    } else {
        try {
            const emailExist = await User.exists({ email: req.body.email })
            if (emailExist) {
                return res.status(400).send(`Email đã được sử dụng`);
            }
            let salt = await bcrypt.genSalt(10);
            let hashedPassword = await bcrypt.hash(req.body.password, salt)
            let password = hashedPassword;
            let user = new User({
                username: req.body.username,
                email: req.body.email,
                password: password
            })
            await user.save()
            res.status(200).send(`Đăng ký thành công!`)
        } catch (err) {
            res.status(400).send(`Đã có lỗi xảy ra!`)
        }
    }
}

const login = async function (req, res, next) {
    const { error } = Validator.validateLogin(req.body)
    if (error) {
        res.status(400).send(error)
    } else {
        try {
            let user = await User.findOne({ email: req.body.email })
            if (!user) {
                return res.status(400).send(`Tài khoản không tồn tại!`)
            } else {
                let isValid = await user.checkPassword(req.body.password)
                if (!isValid) {
                    return res.status(400).send(`Tên đăng nhập hoặc mật khẩu không chính xác!`)
                } else {
                    const token = jwt.sign({ _id: user._id, iat: new Date().getTime() }, process.env.TOKEN_SECRET,{expiresIn:'30d'})
                    res.cookie('token',token,{httpOnly:true})
                    let userCookie = JSON.stringify({_id:user._id})
                    res.cookie('user',userCookie)
                    res.header('auth-token', token)
                    return res.status(200).json({message:"Đăng nhập thành công",user:{_id:user._id}})
                }
            }
        } catch (err) {
            res.status(400).send(`Đã có lỗi xảy ra!`)
        }
    }
}
const logout = async function(req,res,next){
    res.clearCookie('token')
    return res.redirect('/login')
}
const verifyToken = async function (req, res, next) {
    const token = req.cookies['token']
    if (!token) return res.redirect('/login')
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next()
    } catch (err) {
        res.status(400).send(`Invalid Token`);
    }
}

module.exports = { login, register, verifyToken,logout }