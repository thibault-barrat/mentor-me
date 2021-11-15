const nodemailer = require("nodemailer");

const mainController = {
  sendMail: (req, res) => {
    const { lastname, firstname, email, message } = req.body;
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // use SSL
      auth: {
        type: "OAuth2",
        user: process.env.MAIL_USERNAME,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
      },
    });
    const mailOptions = {
      from: "mentorme.contact@gmail.com",
      to: "mentorme.contact@gmail.com",
      subject: `Formulaire de contact de la page "à propos"`,
      text: `Message envoyé par ${firstname} ${lastname} (${email}) ${message}`,
      html: `<body style="padding: 1em;"><h1 style="background-color: #fccdc1; padding: 1em; font-weight: 500px; font-size: 18px; text-align: center;">Message envoyé par ${firstname} ${lastname} (adresse email : ${email})</h1><br/><p style="font-size: 14px;">Son message est : <br/><span style="font-style: italic;">${message}<span/></p></body>`,
      replyTo: `${email}`,
    };
    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send({ message: "Email sent successfully" });
      }
    });
  },
};

module.exports = mainController;
