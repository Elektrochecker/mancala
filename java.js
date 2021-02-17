var board = [4,4,4,4,4,4,0,
             4,4,4,4,4,4,0];
var score = [board[6], board[13]];
var size = 40;
var end;
var showIndex = false;

function setup() {
  size = windowWidth/8-4
  createCanvas(size*8, size*2);
}

function draw() {
  score = [board[6], board[13]];
  textSize(size/3);
  textStyle(BOLD);
  background(60);

  for (i=0; i<6; i++){
    fill(board[i]*40);
    rect(6*size-size*i, 0, size, size);
    fill(0,0,200);
    text(board[i], 6.4*size-size*i, size/2);
  }
  for (i=7; i<13; i++){
    fill(board[i]*40);
    rect(size*(i-7)+size, size, size, size);
    fill(0,0,200);
    text(board[i], size*(i-6)+size/2-6, size*1.5);
  }

  fill(board[6]*40);
  rect(0, 0, size, size*2);
  fill(200,0,0);
  text(board[6], size/2, size/2);
  fill(board[13]*40);
  rect(7*size, 0, size, size*2);
  fill(200,0,0);
  text(board[13], size/2+size*7, size/2);


  if (showIndex) {
    for (i=0; i<6; i++){
      fill(15);
      text(i, 6.4*size-size*i, size-2);
    }
    for (i=7; i<13; i++){
      fill(15);
      text(i, size*(i-6)+size/2.5, size*2-2);
    }
  }
}


function move(x) {
  let stones = board[x];
  let copy6 = board[6];
  let copy13 = board[13];
  let player;

  if (0<=x && x<=5) {
    player = 0;
  }
  else if (7<=x && x<=12) {
    player = 1;
  }
  else{
    player = false;
    return false;
  }

  board[x] = 0;

  for (var i = x; i<x+stones ; i++) {
    if (i < 13){
      board[i+1]++;
      end = i+1;
    }
    else if (i < 27){
      board[i+1-14]++;
      end = i+1-14;
    }
    else{
      board[i+1-28]++;
      end = i+1-28;
    }
  }
  if (player == 0 && board[13] > copy13) {
    board[13]--;
    if (end < 13) {
      end++;
    } else end = 0;
    board[end]++;
  }
  else if (player == 1 && board[6] > copy6) {
    board[6]--;
    if (end < 13) {
      end++;
    } else end = 0;
    board[end]++;
  }
  if (board[end] == 1 && end != 6 && end !=13) {
    return true;
  }
  return false;
}

function render() {

}


function mouseClicked() {

  for (i=0; i<=5; i++){
    if (mouseY > 0 && mouseY < size) {
      if (mouseX > (i+1)*size && mouseX < (i+2)*size) {
        if (move(abs(5-i)) && end <= 5 && board[abs(end-12)] > 0) {
          console.log("player " + 1 + " takes");
          board[6] +=board[end] + board[abs(end-12)];
          board[abs(end-12)] = 0;
          board[end] = 0;
        }
      }
    }
  }

  for (i=7; i<=12; i++){
    if (mouseY > size && mouseY < size*2) {
      if (mouseX > (i+1-7)*size && mouseX < (i+2-7)*size) {
        if (move(i) && end >= 7 && board[abs(end-12)] > 0) {
          console.log("player " + 2 + " takes");
          board[13] +=board[end] + board[abs(end-12)];
          board[abs(end-12)] = 0;
          board[end] = 0;
        }
      }
    }
  }
}
