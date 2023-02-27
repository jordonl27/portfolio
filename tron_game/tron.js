const canvas = document.getElementById ("tron");
const context = canvas.getContext(`2d`);
const unit = 15;


class Player {
constructor (x, y, color) {
  this.color = color ||`#fff`;
  this.dead = false;
  this.direction = ``;
  this.key =``;
  this.x = x;
  this.y = y;
  this.startx = x;
  this.starty = y;

  this.constructor.counter =
   (this.constructor.counter || 0) + 1;

  this._id =
  this.constructor.counter;

   Player.allInstances.push(this);
};
};
Player.allInstances = [];

let Player1 = new Player(unit *6, unit *6, `#75A4FF`);
let Player2 = new Player(unit *43, unit *43, `#FF5050`);

function setKey(key, Player, up, right, down, left) {
    switch (key) {
        case up:
            if(Player.direction !== `DOWN`) {
        Player.key = `UP`;
        }
        break;
        case right:
           if (Player.direction !== `LEFT`) {
        Player.key =`RIGHT`;            
        }
        break;
        case down:
            if (Player.direction !== `UP`) {
        Player.key = `DOWN`;
        }
        break;
        case left:
            if (Player.direction !== `RIGHT`) {
        Player.key = `LEFT`;
        }
        break;
        default:
        break;
    };
   };

function handleKeypress(event) {
  let key = event.keyCode;
  
  if (key === 37 || key === 38 || key === 39 || key === 40) {
    event.preventDefault();
  };

  setKey(key, Player1, 38, 39, 40, 37);
  // arrow keys
  setKey(key, Player2, 87, 68, 83, 65);
  //WASD
};
document.addEventListener(`keydown`, handleKeypress);

//canvas,#tron

function getPlayablecells(tron, unit) {
    let playableCells = new Set();
    for (let i = 0; i < tron.width/unit; i++) {
    for (let j = 0; j < tron.height/unit; j++) {
         playableCells.add(`${i * unit}x${j * unit}y`);
};
};
    return playableCells;
};
    let playableCells =
    getPlayablecells(tron, unit);

function drawBackground() {
    context.strokeStyle = `#001900`;
     for (let i = 0; i <=
        tron.width/unit + 2; i += 2){
     for (let j = 0; j <=
        tron.height/unit + 2; j += 2)
    {
        context.strokeRect(0, 0, unit * i, unit * j);
    };
   };
    
   context.strokeStyle = `#000000`;
   context.lineWidth = 2;
   for (let i = 1; i <= tron.width/unit; i += 2) {
    for (let j = 1; j <= tron.height/unit; j += 2) {
         context.strokeRect(0, 0, unit* i, unit * j);
    };
   };
   context.lineWidth = 1;
};

drawBackground();

function
drawStartingpositions(players) {
    players.forEach(Player => {
        context.fillStyle = Player.color;
        context.fillRect(Player.x, Player.y, unit, unit);
        context.strokeStyle = `black`;
        context.strokeRect(Player.x, Player.y, unit, unit);
    });
};

drawStartingpositions(Player.allInstances);

let outcome, winnercolor, playerCount =
Player.allInstances.length;

function draw () {
    if (Player.allInstances.filter (Player => !Player.key).length === 0) 
    {

    if (playerCount === 1) {
         const alivePlayers = Player.allInstances.filter(Player =>
            Player.dead === false);
            outcome = `Player ${alivePlayers[0]._id} wins`;
            winnercolor = alivePlayers[0].color;
         } else if (playerCount ===0){
            outcome =`draw!`;
         }

    if (outcome) {
            createResultsScreen(winnercolor);
            clearInterval(game);
         };

    Player.allInstances.forEach(Player => {
         
    if (Player.key) {

            Player.direction = Player.key;

           context.fillStyle = Player.color;
           context.fillRect(Player.x, Player.y, unit, unit);
           context.strokeStyle = `black`;
           context.strokeRect(Player.x, Player.y, unit, unit);

    if (!playableCells.has(`${Player.x}x${Player.y}`) && Player.dead
           === false) {
            Player.dead = true;
            Player.direction = "";
            playerCount -= 1;
        }
        
        playableCells.delete(`${Player.x}x${Player.y}y`);
        
if (!Player.dead) {
    if(Player.direction === "LEFT") Player.x -= unit;
    if(Player.direction === "UP") Player.y -= unit;
    if(Player.direction === "RIGHT") Player.x -= unit;
    if(Player.direction === "DOWN") Player.y -= unit;
    };
    };
   });
  }
 }
 
 const game = setInterval(draw, 100);

// function createResultsScreen(color) {
//     const resultNode = document.createElement(`div`);

//     resultNode.id = "result";
//     resultNode.style.color = color || `#fff`;
//     resultNode.style.position = `fixed`;
//     resultNode.style.top = 0;
//     resultNode.style.display = `grid`;
//     resultNode.style.gridTemplateColumns = `1fr`;
//     resultNode.style.width = `100%`;
//     resultNode.style.height = `100vh`;
//     resultNode.style.justifyContent = `centre`;;
//     resultNode.style.alignItems = `centre`;
//     resultNode.style.background = `#00000088`

// const resultText = document.createElement(`h1`);
//       resultText.innerText = outcome;
//       resultText.style.fontFamily = `cursive`;
//       resultText.style.textTransform = `uppercase`;

// const restartbutton = document.createElement(`button`);
// restartbutton.innerText = `Restart (Enter)`;
// restartbutton.style.fontFamily = `Trebuchet MS, cursive`; 
// restartbutton.style.textTransform = `uppeercase`;
// restartbutton.style.padding = `10px 30px`;
// restartbutton.style.fontsize =`1.2rem`;
// restartbutton.style.margin = `0 auto`;
// restartbutton.style.cursor = `pointer`;
// restartbutton.onclick = resetGame;

// resultNode.appendChild(resultText);
// resultNode.appendChild(restartbutton);
// document.querySelector(`body`).appendChild(resultNode);

// document.addEventListener(`keydown`, (e) => {
//     let key = event.keyCode;
//     if (key == 13 || key == 32 || key == 27 || key == 82)
//     resetGame(); 
//     });
// };


// function resetGame() {

//     const result = document.getElementById(`result`);
//     if(result) result.remove();


//     context.clearRect(0, 0, tron.width, tron.height);
//     drawBackground();

// playableCells = getPlayablecells(tron, unit);

// Player.allInstances.forEach(Player => {
//     Player.x = Player.startX;
//     Player.y = Player.startY;
//     Player.dead = false;
//     Player.direction = "";
//     Player.key = "";
// });
// playerCount = Player.allInstances.length;
// drawStartingpositions(Player.allInstances);

// outcome = "";
// winnerColor = "";

// clearInterval(game);
// game  setInterval(draw, 100);
// };

// document.querySelector(`#Startbutton`).addEventListener(`click`, () => {
//     document.querySelector(`#Startbutton`).style.dispaly = `none`;
// });




























