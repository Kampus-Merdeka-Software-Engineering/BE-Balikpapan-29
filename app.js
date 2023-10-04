require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mg = require("mailgun-js")

const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

const mailgun = () => mg ({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN
})

const router = express.Router();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const sentEmails = [];

app.use((req, res, next) => {
    console.log(`Method: ${req.method} ${req.path}`);
    next();
});

app.post('/api/email',(req,res)=>{
    const {name,from,subject,message}=req.body,
    emailInfo = {
        to: '<satuhari04@gmail.com>',
        name: `${name}`,
        from: `${from}`,
        subject: `${subject}`,
        html: `${message}`
    }

    mailgun().messages().send(emailInfo,(error,body) =>{
        if (error){
            console.log(error)
            res.status(500).send({
                message: 'Something went wrong in sending email!'
            })
        }else{
            const sentEmail = {
                name: name,
                from: from,
                subject: subject,
                message: message
              };
              sentEmails.push(sentEmail);
              res.send({ message: 'Email sent successfully!' });
        }
    })
})

 // Route untuk melihat data email yang telah dikirim
 app.get('/api/email', (req, res) => {
    res.json(sentEmails);
  });

app.use(routes.bookingRoutes.router);

 

// routes.forEach((route) => app.use(route));


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
