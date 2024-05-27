const express = require('express');
const http = require('http');
const socket = require('socket.io');
const compression = require('compression');

var state = {
  "host": 0,
  "players": [],
  "answers": [],
  "votes": [],
  gameState: ""
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
  socket.on('message', handleMessage);
  // send the current state to the user
  //socket.emit('update-state', state);
  console.log("User Connected.")
});

server.listen(port, () => console.log(`Listening on http://localhost:${port}`));

function handleMessage(msg) {
  switch(msg.gameState){
    case "join":
      state["players"].push({
        name: msg.name,
        score:0
      });
    case "answer":
      state[answers].push({
        name: msg.name,
        answer: msg.answer
      });
    case "vote":
      state[votes].push({
        name: msg.name,
        vote: msg.vote
      })

    //case "display":
    //case "score":
  }
}

//game loop
while(1){
  switch(state[gameState]){
    case "join":
      
    case "answer":
      
    case "vote":
      scoring();
      assignHost();
//clear answers and votes
    //case "display":
    //case "score":
  }
  
};

function scoring(){
  var hostAns = state[answer].find(ans => ans.name === state[players][state[host]].name);
  state[players].forEach((player) => {
    playerAns = state[answer].find(ans => ans.name === player.name);
    playervote = state[vote].find(vote => vote.name === player.name);
    player.score += state[votes].filter((x) => x.vote == playerAns.answer).length-1;
    if(playervote === hostAns.answer && player.name != state[players][state[host]].name){
      player.score += 2;
    }
  });
}

function assignHost(){
  if (state[players].length-1 > host + 1 ) state[host] = 0;
  else host++;
}