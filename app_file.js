var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var fs = require('fs');

app.locals.pretty = true;
app.set('view engine', 'pug')
app.set('views', './views_file')
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function(req, res){
    res.send('Hello World')
});

app.post('/topic', function(req, res){
    const title = req.body.title;
    const description = req.body.description;
    fs.writeFile('data/'+ title, description, function(err){
        if(err){
            res.status(500).send('Internal Server Error');
        }
        res.send('success');
    });
});

app.get('/topic', function(req, res){
    fs.readdir('data', function(err, files){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        console.log(files);
        res.render('view', {topics:files})  
    })
});

app.get('/topic/new', function(req, res){
    res.render('new')
});

app.listen(3000, function(){
    console.log('Connected, 3000 port!');
})