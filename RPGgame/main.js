let mapArray, ctx, currentImgMain;
let imgMountain, imgMain, imgEnemy;
// mapArray : map element data
// ctx : HTML5 Canvas
// currentImgMain : x, y location
// imgXXX : image object
const gridLength = 200;

function loadImages(sources, callback) {
  var images = {};
  var loadedImages = 0;
  var numImages = 0;
  // get num of sources
  for (var src in sources) {
    numImages++;
  }
  for (var src in sources) {
    images[src] = new Image();
    images[src].onload = function () {
      if (++loadedImages >= numImages) {
        callback(images);
      }
    };
    images[src].src = sources[src];
  }
}

//Game initial
$(function () {
  // 0 - Empty, 1 - Obstacle, 2 - Final Stop, 3 - Enemy
  mapArray = [
    [0, 1, 1],
    [0, 0, 0],
    [3, 1, 2],
  ];

  ctx = $("#myCanvas")[0].getContext("2d");

  //把主角擺上畫面
  imgMain = new Image();
  imgMain.src = "images/anya.png";
  currentImgMain = {
    x: 0,
    y: 0,
  };

  imgMain.onload = function () {
    ctx.drawImage(
      imgMain,
      0,
      5,
      70,
      70,
      currentImgMain.x,
      currentImgMain.y,
      gridLength,
      gridLength
    );
  };

  var sources = {
    mountain: "images/material.png",
    enemy: "images/Enemy.png",
  };

  loadImages(sources, function (images) {
    for (var x in mapArray) {
      for (var y in mapArray[x]) {
        if (mapArray[x][y] == 1) {
          ctx.drawImage(
            images.mountain,
            32,
            65,
            32,
            32,
            y * gridLength,
            x * gridLength,
            gridLength,
            gridLength
          );
        } else if (mapArray[x][y] == 3) {
          ctx.drawImage(
            images.enemy,
            7,
            40,
            104,
            135,
            y * gridLength,
            x * gridLength,
            gridLength,
            gridLength
          );
        }
      }
    }
  });

  // imgMountain = new Image();
  // imgMountain.src = "images/material.png";
  // imgEnemy = new Image();
  // imgEnemy.src = "images/Enemy.png";

  // imgMountain.onload = function(){
  //   imgEnemy.onload = function(){
  //       for(var x in mapArray){
  //           for(var y in mapArray[x]){
  //               if(mapArray[x][y] == 1){
  //                   ctx.drawImage(imgMountain, 32,65,32,32,y*gridLength, x*gridLength, gridLength, gridLength);
  //               }else if(mapArray[x][y] == 3){
  //                   ctx.drawImage(imgEnemy, 7, 40, 104, 135, y * gridLength, x * gridLength, gridLength, gridLength);
  //               }
  //           }
  //       }
  //   };
  // };
});

// User Event
$(document).on("keydown", function (event) {
  // debugger;
  let targetImg, targetBlock, cutImagePositionX, cutImagePositionY;
  targetImg = {
    x: -1,
    y: -1,
  };

  targetBlock = {
    x: -1,
    y: -1,
  };

  event.preventDefault();

  console.log(event.code);

  switch (event.code) {
    case "ArrowLeft":
      targetImg.x = currentImgMain.x - gridLength;
      targetImg.y = currentImgMain.y;
      cutImagePositionX = 0;
      cutImagePositionY = 70; //Face Left
      break;
    case "ArrowUp":
      targetImg.x = currentImgMain.x;
      targetImg.y = currentImgMain.y - gridLength;
      cutImagePositionX = 0;
      cutImagePositionY = 190; //Face Up
      break;
    case "ArrowRight":
      targetImg.x = currentImgMain.x + gridLength;
      targetImg.y = currentImgMain.y;
      cutImagePositionX = 0;
      cutImagePositionY = 130; //Face Right
      break;
    case "ArrowDown":
      targetImg.x = currentImgMain.x;
      targetImg.y = currentImgMain.y + gridLength;
      cutImagePositionX = 60; //Face Down
      cutImagePositionY = 0;
      break;
    default: //Other key - no effect
      return;
  }

  //Confirm the main role will not leave the map
  if (
    targetImg.x <= 400 &&
    targetImg.x >= 0 &&
    targetImg.y <= 400 &&
    targetImg.y >= 0
  ) {
    targetBlock.x = targetImg.y / gridLength;
    targetBlock.y = targetImg.x / gridLength;
  } else {
    targetBlock.x = -1;
    targetBlock.y = -1;
  }

  //clear main role
  ctx.clearRect(currentImgMain.x, currentImgMain.y, gridLength, gridLength);

  if (targetBlock.x != -1 && targetBlock.y != -1) {
    //Check Map data
    switch (mapArray[targetBlock.x][targetBlock.y]) {
      case 0: // can go
        $("#talkBox").text("");
        currentImgMain.x = targetImg.x;
        currentImgMain.y = targetImg.y;
        break;
      case 1: // Mountain
        $("#talkBox").text("有山");
        break;
      case 2: // can go - Final Stop
        $("#talkBox").text("終點");
        currentImgMain.x = targetImg.x;
        currentImgMain.y = targetImg.y;
        break;
      case 3: // Enemy
        $("#talkBox").text("哈摟");
        break;
    }
  } else {
    $("#talkBox").text("邊界");
  }

  ctx.drawImage(
    imgMain,
    cutImagePositionX,
    cutImagePositionY,
    70,
    70,
    currentImgMain.x,
    currentImgMain.y,
    gridLength,
    gridLength
  );
});
