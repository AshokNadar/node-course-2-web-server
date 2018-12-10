const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname +'/views/partials');
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear()

})
app.set('view engine','hbs');

app.use((req,res,next) => {
var now = new Date().toString();
var log = `date : ${now}  method : ${req.method}   path: ${req.path}`;
console.log(log);
fs.appendFile('server.log', log +'\n',(err) => {
    if (err) {
        console.log(err );
        
    }
});
next();
});

// app.use((req,res,next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname +'/public'));


app.get('/',(req,res) => {
    res.render('home.hbs',{
        myTitle : 'Home page',
        page: 'this is home page please welcome',
       })
});

app.get('/about',(req,res) => {
   res.render('about.hbs',{
    myTitle : 'this about page',
    
   })
});

app.get('/bad',(req,res) => {
    res.send({
        error:'error'
    });
});
app.listen(3000);