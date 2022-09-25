let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");

const marg = 25;
const kitSize = 80;
let number = 0;

class Player {
  constructor(name, number, position, x, y) {
    this.name = name;
    this.number = number;
    this.position = position;
    this.x = x;
    this.y = y;
  }
  drawPlayer(currentShape, kitColor, numberColor, bottomText, kitFill) {
    let kit;

    switch (currentShape) {
      case "kit":
        kit = new Kit(this.x, this.y);
        break;
      case "rectangle":
        kit = new Rectangle(
          this.x - kitSize / 2,
          this.y - kitSize / 2 - 5,
          kitSize,
          kitSize
        );
        break;
      default:
        kit = new Circle(x, this.y - 5, kitSize / 2, Math.PI * 2, 0);
    }

    kit.drawFilled(kitColor);
    kit.writeText(
      bottomText == "show-number" ? this.number : this.position,
      numberColor,
      this.x - 25,
      this.y,
      bottomText == "show-number" ? 35 : 22,
      true
    );
    kit.writeText(this.name, numberColor, this.x - 25, this.y + 50, 25, true);
  }
}

class Row {
  constructor(id, y, nPlayers, players) {
    this.id = id;
    this.y = y;
    this.players = this.getNumberOfPlayers(nPlayers);
    this.actualPlayers = this.getPlayers(nPlayers, players);
  }

  getNumberOfPlayers(numPlayers) {
    switch (numPlayers) {
      case 1:
        this.players = [4];
        break;
      case 2:
        this.players = [2, 6];
        break;
      case 3:
        this.players = [2, 4, 6];
        break;
      case 4:
        this.players = [1, 3, 5, 7];
        break;
      case 5:
        this.players = [0, 2, 4, 6, 8];
        break;
      case 20:
        this.players = [1, 7];
        break;
      case 30:
        this.players = [1, 4, 7];
        break;
      default:
        this.players = [];
    }
    return this.players;
  }

  getPlayers(nPlayers, players) {
    let retPlayers = [];
    for (let i = 0; i < nPlayers; i++) {
      retPlayers.push(players[number]);
      number += 1;
    }
    return retPlayers;
  }

  drawPlayers(currentShape, kitColor, numberColor, bottomText) {
    for (let i = 0; i < this.players.length; i++) {
      let kit;
      let x = horizontalPos[this.players[i]].pos;

      switch (currentShape) {
        case "kit":
          kit = new Kit(x, this.y);
          break;
        case "rectangle":
          kit = new Rectangle(
            x - kitSize / 2,
            this.y - kitSize / 2 - 5,
            kitSize,
            kitSize
          );
          break;
        default:
          kit = new Circle(x, this.y - 5, kitSize / 2, Math.PI * 2, 0);
      }

      kit.drawFilled(kitColor);
      kit.writeText(
        bottomText == "show-number"
          ? this.actualPlayers[i].number
          : this.actualPlayers[i].position,
        numberColor,
        x - 25,
        this.y,
        bottomText == "show-number" ? 35 : 22,
        true
      );
      kit.writeText(
        this.actualPlayers[i].name,
        numberColor,
        x - 25,
        this.y + 50,
        25,
        true
      );
    }
  }
}

class Shape {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  drawFilled(color) {
    ctx.beginPath();
    this.draw();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();
  }

  writeText(number, color, x, y, size, bold) {
    let boldText = bold ? "bold" : "";
    ctx.font = `${boldText} ${size}px Arial`;
    ctx.textAlign = "center";
    ctx.fillStyle = color;
    ctx.strokeStyle = "black";
    ctx.lineWidth = 0.5;
    ctx.fillText(number, marg + x, y + 4);
    ctx.strokeText(number, marg + x, y + 4);
  }
}

class Kit extends Shape {
  constructor(x, y) {
    super(x, y);
  }
  draw() {
    let x = this.x - 20;
    let y = this.y + 30;

    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";

    ctx.beginPath();

    ctx.moveTo(x, y);
    ctx.lineTo(x + kitSize / 2 + 2, y); //bottom line

    ctx.lineTo(x + kitSize / 2, y - kitSize / 2 - 14); //right side
    ctx.lineTo(x + kitSize / 2 + 5, y - kitSize / 2); //right sleeve bottom
    ctx.lineTo(x + kitSize / 2 + 20, y - kitSize / 2 - 6); //right sleeve vertical
    ctx.lineTo(x + kitSize / 2 + 6, y - kitSize / 2 - 32); //right sleeve top

    ctx.lineTo(x + kitSize / 2 - 12, y - kitSize); //right top curve
    ctx.lineTo(x + kitSize / 2 - 28, y - kitSize); //center top curve

    ctx.lineTo(x - 5, y - kitSize / 2 - 32); //left top curve
    ctx.lineTo(x - 20, y - kitSize / 2 - 6); //left sleeve top
    ctx.lineTo(x - 6, y - kitSize / 2); //left sleeve vertical
    ctx.lineTo(x, y - kitSize / 2 - 14); //left sleeve bottom
    ctx.lineTo(x - 2, y); //left side

    ctx.closePath();
  }
}

class Circle extends Shape {
  constructor(x, y, radius, startAngle, endAngle) {
    super(x, y);
    this.radius = radius;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
  }
  draw() {
    ctx.beginPath();
    ctx.moveTo(this.x + kitSize / 2, this.y);
    ctx.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
    ctx.stroke();
    ctx.closePath();
  }
}

class Rectangle extends Shape {
  constructor(x, y, width, height) {
    super(x, y);
    this.height = height;
    this.width = width;
  }
  draw() {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.stroke();
    ctx.closePath();
  }
}

class pitch extends Rectangle {
  static width = 650;
  static height = 1050;

  constructor(x, y) {
    super(x, y);
    this.width = pitch.width;
    this.height = pitch.height;
  }

  drawBigPitch() {
    let pCentreX = marg + pitch.width / 2;
    let pCentreY = marg + pitch.height / 2;

    let penAreaBottom = new penArea(marg + pitch.height - penArea.height);
    let penAreaTop = new penArea(marg);
    let gkAreaBottom = new gkArea(marg + pitch.height - gkArea.height);
    let gkAreaTop = new gkArea(marg);
    let goalAreaTop = new goalArea(marg - goalArea.height);
    let goalAreaBottom = new goalArea(pitch.height + marg);
    let bigCircle = new Circle(pCentreX, pCentreY, 128, 0, 2 * Math.PI);
    let smallCircle = new Circle(pCentreX, pCentreY, 3, 0, 2 * Math.PI);

    ctx.fillStyle = "#A8DADC";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "white";

    this.drawFilled("green");

    gkAreaBottom.draw();
    gkAreaTop.draw();
    penAreaBottom.draw();
    penAreaTop.draw();
    goalAreaTop.draw();
    //goalAreaBottom.draw();
    bigCircle.draw();
    smallCircle.draw();

    ctx.beginPath();
    ctx.moveTo(marg, pCentreY);
    ctx.lineTo(pitch.width + marg, pCentreY); //half way line

    ctx.moveTo(pCentreX - 138, marg + penArea.height);
    ctx.arc(pCentreX, marg + 110, 128, 0.87 * Math.PI, 0.13 * Math.PI, true); // D top

    ctx.moveTo(pCentreX - 138, marg + pitch.height - penArea.height);
    ctx.arc(
      pCentreX,
      marg + pitch.height - 110,
      128,
      -0.87 * Math.PI,
      -0.13 * Math.PI
    ); // D bottom

    ctx.moveTo(pCentreX, marg + 110);
    ctx.arc(pCentreX, marg + 110, 3, 0, 2 * Math.PI); //11 point top

    ctx.moveTo(pCentreX, marg + pitch.height - 110);
    ctx.arc(pCentreX, marg + pitch.height - 110, 3, 0, 2 * Math.PI); //11 point bottom

    ctx.moveTo(marg, marg);
    ctx.arc(marg, marg, 10, Math.PI / 2, 0, true); //corner top left

    ctx.moveTo(marg + pitch.width, marg);
    ctx.arc(marg + pitch.width, marg, 10, Math.PI, Math.PI / 2, true); //corner top right

    ctx.moveTo(marg, marg + pitch.height);
    ctx.arc(marg, marg + pitch.height, 10, 1.5 * Math.PI, 0); //corner bottom left

    ctx.moveTo(marg + pitch.width, marg + pitch.height);
    ctx.arc(
      marg + pitch.width,
      marg + pitch.height,
      10,
      1.5 * Math.PI,
      Math.PI,
      true
    ); //corner bottom right
    ctx.stroke();
    ctx.closePath();
  }
}

class penArea extends Rectangle {
  static width = 400;
  static height = 160;

  constructor(y) {
    super(y);
    this.y = y;
    this.x = marg + (pitch.width - penArea.width) / 2;
    this.width = penArea.width;
    this.height = penArea.height;
  }
}

class gkArea extends Rectangle {
  static width = 180;
  static height = 80;

  constructor(y) {
    super(y);
    this.y = y;
    this.x = marg + (pitch.width - gkArea.width) / 2;
    this.width = gkArea.width;
    this.height = gkArea.height;
  }
}

class goalArea extends Rectangle {
  static width = 70;
  static height = 20;

  constructor(y) {
    super(y);
    this.y = y;
    this.x = marg + (pitch.width - goalArea.width) / 2;
    this.width = goalArea.width;
    this.height = goalArea.height;
  }
}

const horizontalPos = [];
for (i = 0; i < 9; i++) {
  let item = {};
  item.pos = marg + (pitch.width / 10) * (i + 1);
  switch (i) {
    case 0:
    case 1:
      item.name = "L";
      break;
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
      item.name = "C";
      break;
    default:
      item.name = "R";
      break;
  }
  horizontalPos.push(item);
}

let verticalPos = [];
for (i = 0; i < 5; i++) {
  let item = {};
  item.pos = marg + (pitch.height / 6) * (i + 1);
  switch (i) {
    case 0:
      item.name = "F";
      break;
    case 1:
      item.name = "W/AM";
      break;
    case 2:
      item.name = "M";
      break;
    case 3:
      item.name = "WB/DM";
      break;
    default:
      item.name = "B";
      break;
  }
  verticalPos.push(item);
}
verticalPos.push({ pos: 1043, name: "GK" });
verticalPos = verticalPos.reverse();

val();

function val() {
  ctx.clearRect(0, 0, c.width, c.height); //clear canvas
  let bigPitch = new pitch(marg, marg);
  bigPitch.drawBigPitch();
  let currentFormation = document
    .getElementById("formation-selector")
    .value.split("-")
    .map(Number);
  let currentShape = document.getElementById("shape-selector").value;
  let kitPattern = document.getElementById("pattern-selector").value;
  let kitColor = document.getElementById("kit-color-selector").value;
  let kitColor2 = document.getElementById("kit-color-selector2").value;
  let numberColor = document.getElementById("number-color-selector").value;
  let bottomText = document.querySelector(
    'input[name="bottom-text"]:checked'
  ).value;
  var pattern = getPattern(kitColor, kitColor2);
  let kitFill = kitPattern == "horizontal-stripes" ? pattern : kitColor;
  number = 1;

  for (let i = 0; i < currentFormation.length; i++) {
    let playerName, playerNumber, playerPosition;
    let segedTomb = getNumberOfPlayers(currentFormation[i]);
    for (let j = 0; j < segedTomb.length; j++) {
      if (i == 0) {
        document.getElementById("playerpos" + number).value =
          verticalPos[i].name; //change positions on field
      } else {
        document.getElementById("playerpos" + number).value =
          horizontalPos[segedTomb[j]].name + verticalPos[i].name; //change positions on field}
      }

      playerName = document.getElementById("player" + number).value;
      playerNumber = document.getElementById("playerno" + number).value;
      playerPosition = document.getElementById("playerpos" + number).value;
      playerX = horizontalPos[segedTomb[j]].pos;
      playerY = verticalPos[i].pos;

      number++;
      let player = new Player(
        playerName,
        playerNumber,
        playerPosition,
        playerX,
        playerY
      );
      player.drawPlayer(
        currentShape,
        kitColor,
        numberColor,
        bottomText,
        kitFill
      );
    }
  }

  /*number = 0;
  for (i = 1; i < 12; i++) {
    let player = {};
    player.name = document.getElementById("player" + i).value;
    player.number = document.getElementById("playerno" + i).value;
    player.position = document.getElementById("playerpos" + i).value;
    players.push(player);
  }

  for (let i = 0; i < 6; i++) {
    let row = new Row(i, verticalPos[i].pos, currentFormation[i], players);
    row.drawPlayers(currentShape, kitFill, numberColor, bottomText);
  }*/
}

function getPattern(color1, color2) {
  let patWidth = 6;
  // create the off-screen canvas
  var canvasPattern = document.createElement("canvas");
  canvasPattern.width = patWidth * 2;
  canvasPattern.height = 1;
  var contextPattern = canvasPattern.getContext("2d");

  // draw pattern to off-screen context
  contextPattern.beginPath();
  contextPattern.fillStyle = color1;
  contextPattern.fillRect(0, 0, patWidth, 1);
  contextPattern.fillStyle = color2;
  contextPattern.fillRect(patWidth, 0, patWidth, 1);
  contextPattern.stroke();
  return ctx.createPattern(canvasPattern, "repeat");
}

var download = function () {
  var link = document.createElement("a");
  link.download = "mysquad.png";
  link.href = document.getElementById("myCanvas").toDataURL();
  link.click();
};

function getNumberOfPlayers(numPlayers) {
  let playAr = [];
  switch (numPlayers) {
    case 1:
      playAr = [4];
      break;
    case 2:
      playAr = [2, 6];
      break;
    case 3:
      playAr = [2, 4, 6];
      break;
    case 4:
      playAr = [1, 3, 5, 7];
      break;
    case 5:
      playAr = [0, 2, 4, 6, 8];
      break;
    case 20:
      playAr = [1, 7];
      break;
    case 30:
      playAr = [1, 4, 7];
      break;
    default:
      playAr = [];
  }
  return playAr;
}
