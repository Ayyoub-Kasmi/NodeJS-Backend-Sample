const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');

const app = express();

const path = require('path');
app.get('/', (req, res) => res.sendFile(path.join(__dirname+'/public/home.html')));

// middleware
app.use(express.static('public'));
app.use(express.json());

// database connection
const dbURI = 'mongodb+srv://admin:admin@cluster0.ltqof.mongodb.net/NodeJS?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) =>{
    console.log('DataBase connected...');
    app.listen(5000, (err)=> console.log('Serveur1 is listening on PORT 5000...'));
  })
  .catch((err) => console.log(err));
  

// routes
app.use(authRoutes);