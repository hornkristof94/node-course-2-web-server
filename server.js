const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerHelper('getCurrentYear', () =>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});


hbs.registerPartials(__dirname + '/views/partials')
app.set('view enginge', 'hbs');



app.use((req,res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

// app.use((req,res,next) =>{
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  //res.send('<h1>Hello Express!</h1>');
  res.render('home.hbs',{
    titleofPage: 'Website - Home',
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome in my own Website'
  });
});

app.get('/about',(req,res) =>{
  res.render('about.hbs',{
    titleofPage: 'Website - About',
    pageTitle: 'About Page',
  });
});

app.get('/bad', (req,res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(3000, () =>{
  console.log('Server is up on port 3000');
});
