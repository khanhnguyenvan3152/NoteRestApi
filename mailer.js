const mailer = require('nodemailer')

exports.sendVerifyMail = function(userId,email){
    let transport = mailer.createTransport({
        service: "Gmail",
        auth: {
            user : "kngv3152@gmail.com",
            pass : "18122000khanh"
        }
    });
    
    let mailOptions = {
        from: 'kngv3152@gmail.com',
        to: email,
        subject: 'Verify your note app account!',
        html: `<p><a href="http://localhost:3000/users/${userId}/verify">Click here to verify your account <a></p>`
    }
    console.log(mailOptions)
    transport.sendMail(mailOptions)
}