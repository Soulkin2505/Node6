const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'pug');
app.use(express.static('public'));

app.get('/', (req, res) => res.render('index'));
app.get('/habilidades', (req, res) => res.render('habilidades'));
app.get('/contacto', (req, res) => {
    res.render('contacto', { query: req.query });
});

// Configuración del transporte de correo electrónico
const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: 'jaimeandre172505@gmail.com', 
        pass: 'buwxid-zutGo1-qexfen'      
    }
});

app.post('/send', (req, res) => {
    const { nombre, email, mensaje } = req.body;
    const mailOptions = {
        from: email,
        to: 'jaimeandre172505@gmail.com',  
        subject: `Nuevo mensaje de contacto de ${nombre}`,
        text: mensaje
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.redirect('/contacto?error=true');
        } else {
            console.log('Email enviado: ' + info.response);
            res.redirect('/contacto?sent=true');
        }
    });
});

app.listen(port, () => console.log(`Servidor ejecutándose en http://localhost:${port}`));