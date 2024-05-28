const express = require('express');
const app = express();
const nodemailer = require('nodemailer');

const PORT = process.env.PORT || 5500;

// Middleware
app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) =>{
    res.sendFile(__dirname + '../src/views/ContactView.vue');
});

app.post('/', (req, res) => {
    console.log(req.body);
    const transporter = nodemailer.createTransport({
        service:'outlook',
        auth: {
            user: 'frazierjeremy1@outlook.fr',
            pass: 'JeremDev38'
        }
    })

    const mailOptions = {
        from: req.body.email,
        to: 'frazierjeremy1@outlook.fr',
        subject: `Message from ${req.body.email}: ${req.body.subject}`,
        text: req.body.message
    }

    transporter.sendMail(mailOptions, (error, info)=>{
        if (error) {
            console.log(error);
            res.send('error');
        } else {
            console.log('Email send' + info.response)
            res.send('success')
        }
    })
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
