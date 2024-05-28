const express = require('express');
const http = require('http');
const socket = require('socket.io');
const compression = require('compression');

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
app.all('*', function (req, res) {
    res.status(200).sendFile(`/`, {root: app_folder});
});

io.on('connection', (socket) => {
  socket.on('message', handleMessage);
  ActivePlayers++;
  console.log("Player Has Connected.");

  socket.on('disconnect', () => {
    ActivePlayers--;
    console.log("Player Has Disconnected.");
  });
});

server.listen(port, () => console.log(`Listening on http://localhost:${port}`));
setInterval(gameLoop, 1000);

let ActivePlayers = 0;
let waitingPlayers = 0;
var state = {
  host: 0,
  players: [],
  answers: [],
  votes: [],
  gameState: ""
};

// game loop
function gameLoop() {
  console.log(state);
  switch (state.gameState) {
    case "join":
      if (waitingPlayers == ActivePlayers) {
        waitingPlayers = 0;
        state.gameState = "answer";
        io.emit("message", {
          gameState: "answer",
          answers: [],
          scores: []
        });
      }
      break;

    case "answer":
      if (waitingPlayers == ActivePlayers) {
        waitingPlayers = 0;
        state.gameState = "vote";
        io.emit("message", {
          gameState: "vote",
          answers: state.answers,
          scores: []
        });
      }
      break;

    case "vote":
      if (waitingPlayers == ActivePlayers) {
        scoring();
        waitingPlayers = 0;
        state.gameState = "display";
        io.emit("message", {
          gameState: "display",
          answers: state.answers,
          scores: state.players
        });
        state.answers = [];
        state.votes = [];
      }
      break;

    case "next":
      if (waitingPlayers == ActivePlayers) {  
        assignHost();
      }
      break;
  }
}

function handleMessage(msg) {
  switch (msg.gameState) {
    case "join":
      state.players.push({
        name: msg.name,
        score: 0
      });
      state.gameState = "join";
      waitingPlayers++;
      break;

    case "answer":
      state.answers.push({
        name: msg.name,
        answer: msg.answer
      });
      state.gameState = "answer";
      waitingPlayers++;
      break;

    case "vote":
      state.votes.push({
        name: msg.name,
        vote: msg.vote
      });
      state.gameState = "vote";
      waitingPlayers++;
      break;
  }
}

// Host cannot vote --SCORING BROKEN --
function scoring(){
  var hostAns = state.answers.find(ans => ans.name == state.players[state.host].name);
  state.players.forEach((player) => {
    if(player.name === state.players[state.host].name){
      player.score += state.votes.filter((x) => x.vote == hostAns && x.name != player.name).length;
    }
    else{
      playerAns = state.answers.find(ans => ans.name == player.name);
      playervote = state.votes.find(vote => vote.name == player.name);
      player.score += state.votes.filter((x) => x.vote == playerAns.answer && x.name != player.name).length;
      if(playervote === hostAns.answer){
        player.score += 2;
      }
    }    
  });
}

function assignHost(){
  if (ActivePlayers-1 < state.host + 1 ) state.host = 0;
  else state.host++;
}