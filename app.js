const express = require('express');
const app = express();

var bodyParser = require('body-parser')

app.locals.pretty = true;
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'pug')
app.set('views', './views')


app.post('/form_receiver', function(req, res){
    const title = req.body.title;
    const description = req.body.description;
    res.send(title + ', ' + description);
});

app.get('/form_receiver', function(req, res){
    const title = req.query.title;
    const description = req.query.description;
    res.send(title + ', ' + description);
});

app.get('/form', function(req, res){
    res.render('form');
});

app.get('/template', function(req, res){
    res.render('temp', {time:Date(), _title:'템플릿 엔진 Pug'})
});

app.get('/', function(req, res){
    res.send('Hello World')
});

app.get('/login', function(req, res){
    res.send('Login Please')
});

app.get('/user', function(req, res){
    res.send('lee chang hyun')
});

app.get('/signup', function(req, res){
    res.send('회원 가입 페이지, <img src="/dobby.png">')
});

app.get('/topic/:id', function(req, res){
    //res.send(req.params.id + ', ' + req.params.mode);
    
    var arr = [
        'Javascript is ...',
        'Nodejs is ...',
        'Express is ...'
    ]
    var output = 
    `
        <a href="/topic/0">Javascript</a><br>
        <a href="/topic/1">Nodejs</a><br>
        <a href="/topic/2">Express</a><br>
        ${arr[req.params.id]}
    `
    res.send(output);
});

app.listen(3000, function(){
    console.log('Connected 3000 port!');
})