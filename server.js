const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const socket = require('socket.io');
const randomColor = require('randomcolor');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/static'));
app.use(bodyparser.urlencoded({extended: true}));

app.post('/chat', (req, res) => {
  var chat_color  = randomColor();

  //add slight opacity via alpha channel ~20%
  chat_color += "33";

  res.render('chat', {
    'username': req.body.username,
    'unq_color': chat_color  
  });
});

const server = app.listen(7777, function() {
  console.log('Express app running on port 7777');
});

var io = socket(server);

io.on('connection', socket => {
  console.log('socket connection established!');

  socket.on('connected', data => {
    console.log("User entered chat: " + data);
  }),

  socket.on('chat', data => {
    // io.emit('chat', {
    //   username: data.username,
    //   message: data.message,
    //   unique_chat_color: data.unique_chat_color
    // });

    io.emit('chat', data);
  })

})


