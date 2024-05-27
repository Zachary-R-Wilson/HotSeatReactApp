const express = require('express');
const http = require('http');
const socket = require('socket.io');
const compression = require('compression');

var state = {
  "General": [],
  "Announcements": []
}

var app = express();
const server = http.createServer(app);
const io = new socket.Server(server);

const port = process.env.PORT || 3000;
const app_folder = "public/";
const options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['html', 'js', 'scss', 'css'],
  index: false,
  maxAge: '1y',
  redirect: true,
}

app.use(compression());
app.use(express.static(app_folder, options));

// serve angular paths
app.all('*', function (req, res) {
    res.status(200).sendFile(`/`, {root: app_folder});
});

io.on('connection', (socket) => {
  // attach the event listener to the user's socket
  //socket.on('message', handleMessage);
  // send the current state to the user
  //socket.emit('update-state', state);
  console.log("User Connected.")
});

server.listen(port, () => console.log(`Listening on http://localhost:${port}`));

// function handleMessage(msg) {
//     state[msg.room].push({
//     name: msg.name,
//     date: msg.date,
//     content: msg.content
//   });
//   io.emit('message', msg);
// }