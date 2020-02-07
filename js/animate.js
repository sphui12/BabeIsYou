/****************************开始菜单模块********************************/
var fps = 60;
var lastTime= 0;
var text_start={};
var rect={x:325,y:430,width:350,height:50};
var back = new Image();
var Offset = 0;
var VELOCITY = 20; 

function drawText_start() {
		ctx.font = 100 + "px " + style.fontFamily;
		ctx.textAlign = style.hAlign;
		ctx.textBaseline = style.vAlign;
		ctx.fillStyle = '#99CCFF';
		ctx.drawImage(menu_t, canvas.width/5, canvas.height/5);

		ctx.font = 35 + "px " + style.fontFamily;
		text_start="Press 'Enter' to start";
		ctx.fillText(text_start, canvas.width/2, canvas.height/1.3);
}

function drawBack(){
	    Offset = Offset < canvas.width?
               Offset + VELOCITY/fps : 0;
      ctx.save();
      ctx.translate(-Offset, -Offset);
      ctx.drawImage(back, 0, 0);
      ctx.drawImage(back, back.width-2, 0);
      ctx.drawImage(back, 0, back.height);
      ctx.drawImage(back, back.width-2, back.height);
      ctx.restore();
}

function calculateFps(now){
   var fps = parseInt( 1000 / (now - lastTime));
   lastTime = now;
   return fps; 
}

function animate(now) {
 if (now === undefined) {
      now = +new Date;   //计算得到当前时间的整数值
   }
   //帧频调用
  fps = calculateFps(now);
	ctx.clearRect(0,0,canvas.width,canvas.height);

	drawBack();
	drawText_start();
    if(menustart==true){
      menu.pause();
      ctx.clearRect(0,0,canvas.width,canvas.height);
    	init();
    }else{
    	requestNextAnimationFrame(animate);
    }
}

/****************************过场打字机动画********************************/


function drawText(text,style,i,j){//输出文本的函数
  ctx.font=style.fontSize+"px "+style.fontFamily;
  ctx.textAlign=style.hAlign;
  ctx.textBaseline=style.vAlign;
  ctx.fillStyle=style.color;
  ctx.fillText(text,40+j*ctx.measureText(text).width,40+i*60);
}
function drawAge(iCurlevel){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  switch(iCurlevel){
    case 0:
        part1.play();
        ctx.fillText('Age 3,wall and tony',640,360);
        break;
    case 1:
        part2.play();
        ctx.fillText('Age 7,game and parents',640,360);
        break;
    case 2:
        part3.play();
        ctx.fillText('Age 11,money and mind',640,360);
        break;
    case 3:
        part4.play();
        ctx.fillText('Age 18, moon and data',640,360);
        break;
    case 4:
        part5.play();
        ctx.fillText('Age 19,time and me',640,360);
        break;
    case 5:
        part5.play();
        ctx.fillText('Growth and strength',640,360);
        break;
  }
}
function losebackMusic(){
  part5.pause();
  lose.pause();
  loseback.play();
}

function drawDH(text,back){
  var num=0;
   
 
  for (var i = 0; i <text.length; i++) {
    for(var j=0;j<text[i].length;j++){
      num++;
      setTimeout(drawText,200+num*90,text[i][j],style,i,j);
      ctx.clearRect(0,0,canvas.width,canvas.height);
      if(i==text.length-1&&j==text[i].length-1){  
        setTimeout(drawAge,200+num*90+1000,iCurlevel);
        if(!back){
            setTimeout(NextLevel,200+num*90+3000,1);
        }else{
            lose.play();
            setTimeout(NextLevel,200+num*90+3000,0);
            setTimeout(drawAge,200+num*90+1000,iCurlevel);
            setTimeout(losebackMusic,200+num*90+3000,0);
        }
            
           
      }
    }
  }

}



  
/****************************通关动画********************************/