let userFile, userImage, inputImg;
let option;
let tileSize;

let newImg;

function setup(){

  var canvas = createCanvas(100, 100);
  canvas.parent('sketch');

  createElement('h3','Upload Pic:');
  inputImg = createFileInput(handleNewImg);
  inputImg.elt.accept ="assets/*";

  createElement('h2','Controls:');
  createElement('h3',"Tile size (5-50):");
  tileSize = createSlider(5,50,1,1);
  tileSize.changed(handle);

  createElement('h3',"Select an order:")
  option = createSelect();
  option.option("a,a,a,a");
  option.option("b,a,c,d");
  option.option("a,c,a,c");
  option.option("random");
  option.changed(handle);

  noStroke();
  noLoop();

}

function handle(){
  if(userFile){
    handleNewImg(userFile);
  }
}

function handleNewImg(file){
  userFile = file;
  userImage = loadImage(file.data, generate);
}

function generate(img){
  let w, h;
  if(img.width > img.height){
    w = img.width*0.8;
    h = img.height*0.8;
  }else{
    w = img.width*0.8;
    h = img.height*0.8;
  }

  newImg = createGraphics(w,h);
  newImg.image(img,0,0,w,h);

  var canvas = createCanvas(w,h);
  canvas.parent('sketch');



  //resizeCanvas(w,h);
  background(255);

  if(option.value() === "a,a,a,a"){
    TilesA(newImg);
  }
  //TilesA(newImg);
  else if(option.value() === "b,a,c,d"){
    TilesB(newImg);
  }

  else if(option.value() === "a,c,a,c"){
    TilesC(newImg);
  }

  else if(option.value() === "random"){
    TilesD(newImg);
  }

  redraw();

}

function TilesA(img){
  let n = 1;
  img.loadPixels();
  let size = tileSize.value();
  for(var x = 0; x < img.width; x+=size){
    for(var y = 0; y < img.height; y+=size){
      var index = (x+y*img.width)*4;
      var r = img.pixels[index+0];
      var g = img.pixels[index+1];
      var b = img.pixels[index+2];

      var brightness = (r+g+b)/3;
      baseTile(x,y,size,n,brightness);
    }
  }
}

function TilesB(img){
  let n1 = 2;
  let n2 = 3;
  let n = n1;

  let firstn = true;

  img.loadPixels();
  let size = tileSize.value();
  for(var y = 0; y < img.height; y+=size){
    for(var x = 0; x < img.width; x+=size){
      var index = (x+y*img.width)*4;
      var r = img.pixels[index+0];
      var g = img.pixels[index+1];
      var b = img.pixels[index+2];

      if(firstn) n = n1;
      else n = n2;

      var brightness = (r+g+b)/3;
      baseTile(x,y,size,n,brightness);

      n1 = (n1+1)%3;
      if(n1 == 0) n1 = 1;

      n2 = (n2+1)%5;
      if(n2 == 0) n2 = 3;
    }
    firstn = !firstn;
  }

}

function TilesC(img){
  let n = 1;
  let firstn = true;

  img.loadPixels();
  let size = tileSize.value();
  for(var y = 0; y < img.height; y+=size){
    for(var x = 0; x < img.width; x+=size){
      var index = (x+y*img.width)*4;
      var r = img.pixels[index+0];
      var g = img.pixels[index+1];
      var b = img.pixels[index+2];

      var brightness = (r+g+b)/3;
      baseTile(x,y,size,n,brightness);

      n = (n+2)%4;
    }
    if(firstn) n = 3;
    else n = 1;
    firstn = !firstn;
  }

}

function TilesD(img){

  img.loadPixels();
  let size = tileSize.value();
  for(var y = 0; y < img.height; y+=size){
    for(var x = 0; x < img.width; x+=size){
      var index = (x+y*img.width)*4;
      var r = img.pixels[index+0];
      var g = img.pixels[index+1];
      var b = img.pixels[index+2];

      var brightness = (r+g+b)/3;

      var n = random(1,5);
      n = parseInt(n);

      baseTile(x,y,size,n,brightness);

    }
  }
}



function baseTile(x, y, s, op, c){
  noStroke();
  fill(255);
  quad(x,y,x+s,y,x+s,y+s,x,y+s);

  if(op == 1) tileA(x,y,s,c);
  if(op == 2) tileB(x,y,s,c);
  if(op == 3) tileC(x,y,s,c);
  if(op == 4) tileD(x,y,s,c);

}


//Tile A
function tileA(x,y,s, c){
  var r = c;
  var xx = map(r,255,0,0.25,0.75);
  var yy = map(r,0,255,0.25,0.75);
  fill(0);
  beginShape();
        vertex(x,y);
        vertex(x,y+s);
        vertex(x+s,y+s);
        vertex(x+(s*xx),y+(s*yy));
      endShape(CLOSE);
}

//Tile B
function tileB(x,y,s, c){
  var r = c;
  var xx = map(r,255,0,0.25,0.75);
  var yy = map(r,255,0,0.25,0.75);
  fill(0);
  beginShape();
       vertex(x+s,y);
       vertex(x,y);
       vertex(x,y+s);
       vertex(x+(s*xx),y+(s*yy));
  endShape(CLOSE);
}

//Tile C
function tileC(x,y,s, c){
  var r = c;
  var xx = map(r,255,0,0.75,0.25);
  var yy = map(r,255,0,0.25,0.75);
  fill(0);
  beginShape();
       vertex(x,y);
       vertex(x+s,y);
       vertex(x+s,y+s);
       vertex(x+(s*xx),y+(s*yy));
  endShape(CLOSE);
}

//Tile D
function tileD(x,y,s, c){
  var r = c;
  var xx = map(r,255,0,0.75,0.25);
  var yy = map(r,255,0,0.75,0.25);
  fill(0);
  beginShape();
      vertex(x+s,y);
      vertex(x+s,y+s);
      vertex(x,y+s);
      vertex(x+(s*xx),y+(s*yy));
  endShape(CLOSE);
}
