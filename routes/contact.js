const express = require("express");
const router = express.Router();
const nodeMailer = require("nodemailer");

router.get("/", async (req, res) => {
  try {
    res.render("contacts/index");
  } catch (error) {}
});

router.post("/formulario", async (req, res, next) => {
  try {
    let transporter = nodeMailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: true,
      auth: {
        // should be replaced with real sender's account
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
    let mailOptions = {
      // should be replaced with real recipient's account
      to: req.body.email,
      subject: "Contato do site" + req.body.nome,
      body: req.body.mensagem
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message %s sent: %s", info.messageId, info.response);
    });
    res.writeHead(301, { Location: "index.html" });
    res.end();
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
