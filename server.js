const express=require('express');
const hbs=require('hbs');
const fs=require('fs');
var app=express();


hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine','hbs');

app.use( (req ,res ,next) => {
    var now= new Date().toString();
    var log=`${now} : ${req.method} : ${req.url}`;
    console.log(log);

    fs.appendFile('server.log' , log + '\n' , (err)=> {
        if (err)  console.log('Log file is not appends!!!');
    });
    next();
});

/*app.use((req ,res ,next) => {
    res.render('maintenance.hbs');
});*/

app.use(express.static( __dirname + '/public' ));


hbs.registerHelper( 'currentYear' , () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screenIt' , (text) => {
    return text.toUpperCase();
});

app.get('/' ,(req ,res) => {/*
    res.send('<h1> Hello Express</h1>');*/
/*
    res.send({
        name :'Shiva',
        likes : [
            'photography',
            'travelling'
        ]
    });*/

    res.render('home.hbs',{

        pageTitle :'Home Page',
        welcomeText :'Welcome Home page'
    })
});

app.get('/about', (req ,res) => {
    /*res.send('This is about pade')*/
    res.render('about.hbs', {
        pageTitle :'About Page',
    });
});

app.get('/bad', (req ,res) => {
    res.send({
        'errorMessage' : 'unable to handle request'
    });
});
app.listen(3000,()=>{
    console.log('server start on port 3000');
});