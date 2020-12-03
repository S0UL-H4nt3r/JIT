var fortune = require('./lib/fortune.js');
var express = require('express');

var app = express();

var handlebars = require('express-handlebars').create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.render('home');
});
app.get('/about', function(req, res) {
    res.render('about', {fortune: fortune.getFortune()});
});
app.use(function(req, res, next){
    res.status(404);
    res.render('404');
});
app.use(function(err, req, res, next){
console.error(err.stack);
    res.status(500);
    res.render('500');
});
app.listen(app.get('port'), function(){
    console.log('Express запущен на http://localhost:' + app.get('port') + '; Нажмите Ctrl + C для завершения.');
});



// var http = require('http');
//     fs = require('fs');

// function serveStaticFile(res, path, contentType, responseCode) {
//     if(!responseCode) responseCode = 200;
//     fs.readFile(__dirname + path, function(err, data) {
//         if(err) {
//             res.writeHead(500, {'Content-Type': 'text/plain'});
//             res.end('500 - Internal Error');
//         } else {
//             res.writeHead(responseCode, {'Content-Type': contentType});
//             res.end(data);
//         }
//     });
// }


// http.createServer(function(req, res){
//     var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
//     switch(path) {
//         case '':
//             serveStaticFile(res, '/public/home.html', 'text/html');
//             break;
//         case '/about':
//             serveStaticFile(res, '/public/about.html', 'text/html');
//             break;
//         case '/img/logo.png':
//             serveStaticFile(res, '/public/img/logo.png', 'image/jpeg');
//             break;
//         default:
//             serveStaticFile(res, '/public/404.html', 'text/html');
//             break;
//     }
// }).listen(3000);

// console.log('Сервер запущен на local:3000; нажмите Ctrl-C для завершения....');