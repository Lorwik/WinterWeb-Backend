var nodemailer = require('nodemailer');

// email sender function
sendEmail = function (req, res) {
    // Definimos el transporter
    var transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "7259f869c44838",
          pass: "9e702df1ec9de9"
        }
    });

    // Definimos el email
    var mailOptions = {
        from: 'no-reply@winterao.com',
        to: 'manueljsandalio@gmail.com',
        subject: 'WinterAO',
        text: 'Los Emails funcionan!'
    };

    // Enviamos el email
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.send(500, err.message);

        } else {
            
            console.log("Email enviado!");
            res.status(200).jsonp(req.body);
        }
    });
};

module.exports = sendEmail;