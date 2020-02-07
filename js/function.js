/*
Function :function(游戏各种操作判定函数)
Author   :黄家辉
Build-Date:2019-11-16
Version  :4.0
*/

/********************************游戏初始化函数*************************************/
//初始化游戏
function init(){
	menu.pause();
	canvas.onclick=function(){
		part0.play();
	};
	initLevel();//初始化对应等级的游戏
	showMoveInfo();//初始化对应等级的游戏数据
}

//更改点坐标
function Point(x,y){
	this.x = x;
	this.y = y;
}

//数组复制器
function copyArray(arr){
	var b=[];//每次移动更新地图数据都先清空再添加新的地图
	for (var i=0;i<arr.length ;i++ ){
		b[i] = arr[i].concat();//链接两个数组
	}
	return b;
}

//图片预加载函数
function imgPreload(srcs,callback){
	var count = 0,imgNum = 0,images = {};
	for(src in srcs){
		imgNum++;
	}
	for(src in srcs ){
		images[src] = new Image();
		images[src].onload = function(){
		//判断是否所有的图片都预加载完成
		    if (++count >= imgNum){
			    callback(images);
		    }
		}
	    images[src].src = srcs[src];
	}
}

//初始化游戏等级
function initLevel(){
	gameflag=false;
	curMap = copyArray(levels[iCurlevel]);//当前移动过的游戏地图
	curLevel = levels[iCurlevel];//当前等级的初始地图
	curBabe = babe_h;//初始化小人
	//InitMap();//初始化地板
	heart1Position=new Point(5,26);
    heart2Position=new Point(6,8);
    heart3Position=new Point(14,28);
	DrawMap(curMap);//绘制出当前等级的地图
}


//完善关卡数据及游戏说明
function showMoveInfo(){
	msg.innerHTML = "Age     " + (iCurlevel+1) +"     ,     babe     has     tried    "+ moveTimes+"     times";
}

//进入下一关
function NextLevel(i){
    //iCurlevel当前的地图关数
	iCurlevel = iCurlevel + i;
	if (iCurlevel<0){
		iCurlevel = 0;
		return;
    }
	
	var len = levels.length;
	if (iCurlevel > len-1){
		iCurlevel = len-1;
	}
    initFlag();
	initLevel();//初始当前等级关卡
	moveTimes = 0;//游戏关卡移动步数清零
	showMoveInfo();//初始化当前关卡数据

	canvas.onclick=function(){
    switch(iCurlevel){
      case 0:
          part0.play();
      break;
      case 1:
          part1.play();
      break;
      case 2:
          part2.play();
      break;
      case 3:
          part3.play();
      break;
      case 4:
          part4.play();
      break;
      case 5:
          part5.play();
      break;
    }
 }
}

//初始化所有游戏flag
function initFlag(){
	hp=7;
	count=7;
	isLive=true;
	isDie=false;
	isheartPush=false;
    isWallStop=true;
    isCopyed=false;
    isBoomWallwithMind=false;
    isgirlPush=false;
    isDie=false;
}
/**********************************人物控制器***************************************/


//与键盘上的上下左右键关联
function doKeyDown(event){
	switch (event.keyCode){
		case 13://Enter 开始吧~~！
		    menustart=true;
		    break;
		case 37://左键头
			go("left",gameflag);
			break;
	    case 38://上键头
			go("up",gameflag);
			break;
		case 39://右箭头
			go("right",gameflag);
			break;
		case 40://下箭头
			go("down",gameflag);
		    break;
	}
}


//小人移动控制及判定
function go(dir,gameflag){
    var p1,p2;
	switch (dir){
	    case "up":
	    	curBabe=babe_b;
	        //获取小人前面的两个坐标位置来进行判断小人是否能够移动
	        p1 = new Point(perPosition.x-1,perPosition.y);
	        p2 = new Point(perPosition.x-2,perPosition.y);
	        break;
	    case "down":
	        curBabe=babe_h;
	        p1 = new Point(perPosition.x+1,perPosition.y);
	        p2 = new Point(perPosition.x+2,perPosition.y);
	       break;
	   case "left":
	       curBabe=babe_l;
		   p1 = new Point(perPosition.x,perPosition.y-1);
		   p2 = new Point(perPosition.x,perPosition.y-2);
		   break;
	   case "right":
	       curBabe=babe_r;
		   p1 = new Point(perPosition.x,perPosition.y+1);
		   p2 = new Point(perPosition.x,perPosition.y+2);
		   break;
	}
	//若果小人能够移动的话，更新游戏数据，并重绘地图
	if (Trygo(p1,p2,dir)){
		moveTimes ++;
		showMoveInfo();
	}
	//重绘当前更新了数据的地图
	DrawMap(curMap);
	//若果移动完成了进入下一关

    //根据关卡选择新的过关判定的checkFinish()
    switch(iCurlevel){
    	case 0:
    	    if (!gameflag) {
		        if (checkFinish_0()){
		    	    //延迟过关效果出现
		            setTimeout(function(){
		            	part0.pause();
			            alert("基本的操作就是这些，出发吧少年！！");
			            ctx.clearRect(0,0,canvas.width,canvas.height);
		                drawDH(text1);
	                },500);
	            }
	        }	
    	    break;

    	case 1:
    	    if (!gameflag) {
		        if (checkFinish_1()){
		            setTimeout(function(){
		            	part1.pause();
		            	isWallStop=true;
			            alert("玩具到手，我就是天才！");
		                drawDH(text2);
	                },500);
	            }
	        }
	        break;

	    case 2:
    	    if (!gameflag) {
		        if (checkFinish_2()){
		            setTimeout(function(){
		            	part2.pause();
		            	isCopy=false;
			            alert("为了游戏，这点作业不算什么");
		                drawDH(text3);
	                },500);
	            }
	        }
	        break; 
	    case 3:
    	    if (!gameflag) {
		        if (checkFinish_3()){
		        	isBoomWallwithMind=false;
		        	part3.pause();
		            setTimeout(function(){
			            alert("凭借智慧拿到了压岁钱，只可惜是个梦");
		                drawDH(text4);
	                },500);
	            }
	        }
	        break; 

	    case 4:
    	    if (!gameflag) {
		        if (checkFinish_4()){
		        	isBoomWallwithMind=false;
		        	part4.pause();
		            setTimeout(function(){
			            alert("真希望这样一直下去啊");
		                drawDH(text5);
	                },500);
	            }
	        }
	        break; 

	    case 5:
    	    if (!gameflag) {
		        if (checkFinish_5()){
		            setTimeout(function(){
		                drawDH(text7);
	                },500);
	            }
	        }
	        break; 
    }
}

//判断小人是否能够成功移动或推动
function Trygo(p1,p2,dir){
    
    firstfoot=0;
    lastfoot=0;
	if(p1.x<0) return false;//若果超出地图的上边，不通过
	if(p1.y<0) return false;//若果超出地图的左边，不通过
	if(p1.x>curMap.length) return false;//若果超出地图的下边，不通过
	if(p1.y>curMap[0].length) return false;//若果超出地图的右边，不通过

    if(iCurlevel==5){
    	if((curMap[p1.x][p1.y]==1||Math.floor(curMap[p1.x][p1.y]/ 10)==1||Math.floor(curMap[p1.x][p1.y]/ 10)==2)&&isWallStop) {
	    return false;//若果前面是墙，不通过
        }
        firstfoot=curMap[p1.x][p1.y];

	    curMap[p1.x][p1.y] = 4;//p1变小人

	    curMap[perPosition.x][perPosition.y] = lastfoot;
	    //能执行到这一步说明小人成功前进，更新坐标值
	    perPosition = p1;
	    //若果小动了 返回true 指代能够移动小人	 

	    var nowBoom= copyArray(levels[count]);
        for (var i=0;i<curMap.length;i++ ){
	    	for (var j=0;j<curMap[i].length;j++ ){
			    if(nowBoom[i][j]==77&&curMap[i][j]!=4){                                                
				    curMap[i][j]=nowBoom[i][j];
		        }else if(nowBoom[i][j]!=0&&nowBoom[i][j]!=77){
                    curMap[i][j]=nowBoom[i][j];
			    }else if(nowBoom[i][j]==0&&curMap[i][j]!=0&&curMap[i][j]!=4){
			    	curMap[i][j]=nowBoom[i][j];
			    }
		    }
	    }

	    if(isBack){
	        if(!isWill)
	    	    curMap[13][13]=80;
	    	if(isWill&&!isBrave)
	    	    curMap[16][4]=75;
	    	if(isBrave&&!isLove)
	    	    curMap[9][20]=44;
	    	if(isLove&&!isHope)
	    	    curMap[8][11]=73;
	    	if(isHope&&!isDream)
	    	    curMap[15][15]=74;
        }

	    for (var i = 12; i<hp+12; i++) {
	    	curMap[19][i]=40;
	    }
   
	    if(count<37){
		    count++;
	    }else{
		    count=6;
	    }
	    return true;

    }
	
	if((curMap[p1.x][p1.y]==1||Math.floor(curMap[p1.x][p1.y]/ 10)==1||Math.floor(curMap[p1.x][p1.y]/ 10)==2)&&isWallStop) {
	    return false;//若果前面是墙，不通过
    }

    if(isBoomWallwithMind){
    	if(curMap[p1.x][p1.y]==66){
    		if(Math.floor(curMap[p2.x][p2.y]/ 10)==1){
    	        curMap[p1.x][p1.y]=0;
    	        curMap[p2.x][p2.y]=4;
    	        curMap[perPosition.x][perPosition.y]=0;
    	        lastfoot=0;
    	        perPosition = p1;
		        return true;
    		}
    	}
    }

	if ((curMap[p1.x][p1.y]==3 || curMap[p1.x][p1.y]==5||Math.floor(curMap[p1.x][p1.y]/ 10)==5||Math.floor(curMap[p1.x][p1.y]/ 10)==6||Math.floor(curMap[p1.x][p1.y]/ 10)==4)&&
	(curMap[p2.x][p2.y]==3 || curMap[p2.x][p2.y]==5||Math.floor(curMap[p2.x][p2.y]/ 10)==5||Math.floor(curMap[p2.x][p2.y]/ 10)==6||Math.floor(curMap[p2.x][p2.y]/ 10)==4
	||Math.floor(curMap[p2.x][p2.y]/ 10)==3)){//若果小人前面是箱子那就还需要判断箱子前面有没有障碍物(箱子/墙)


		var tempp1=p1;
		var tempp2=p2;
        while(curMap[tempp2.x][tempp2.y]==3 || curMap[tempp2.x][tempp2.y]==5
        	||Math.floor(curMap[tempp2.x][tempp2.y]/ 10)==5||Math.floor(curMap[tempp2.x][tempp2.y]/ 10)==6||
        	Math.floor(curMap[tempp2.x][tempp2.y]/ 10)==4||Math.floor(curMap[tempp2.x][tempp2.y]/ 10)==3){

            if((curMap[p1.x][p1.y]==38||curMap[p1.x][p1.y]==39||curMap[p1.x][p1.y]==40)&&!isheartPush){
            	return false;
            }

            switch (dir){
	            case "up":
	              //获取小人前面的两个坐标位置来进行判断小人是否能够移动
	                tempp1 = tempp2;
	                tempp2 = new Point(tempp2.x-1,tempp2.y);        
	                break;
	            case "down":
	                tempp1 = tempp2;
	                tempp2 = new Point(tempp2.x+1,tempp2.y);
	                break;
	            case "left":
	                curBabe=babe_l;
	                tempp1 = tempp2;
		            tempp2 = new Point(tempp2.x,tempp2.y-1);
		            break;
	            case "right":
	                curBabe=babe_r;
	                tempp1 = tempp2;
		            tempp2 = new Point(tempp2.x,tempp2.y+1);
		             break;
	        }

        }

        if (curMap[tempp2.x][tempp2.y]==1||Math.floor(curMap[tempp2.x][tempp2.y]/ 10)==1||Math.floor(curMap[tempp2.x][tempp2.y]/ 10)==2){
        	return false;
        }else {
        	if(curLevel[perPosition.x][perPosition.y]==1||Math.floor(curLevel[perPosition.x][perPosition.y]/ 10)==1||Math.floor(curLevel[perPosition.x][perPosition.y]/ 10)==2) 
        		lastfoot = curLevel[perPosition.x][perPosition.y];
        	else
        		lastfoot=0;

        	firstfoot=curLevel[p1.x][p1.y];
            switch(dir){
            	case "up":
            	    while(curMap[tempp2.x][tempp2.y]!=4){
            	    	curMap[tempp2.x][tempp2.y]=curMap[tempp1.x][tempp1.y];
            	    	tempp2=tempp1;
            	    	tempp1 = new Point(tempp1.x+1,tempp1.y);
            	    }
            	    curMap[tempp2.x][tempp2.y]=lastfoot;
            	    perPosition=new Point(tempp2.x-1,tempp2.y);
            	    return true;
            	    break;
            	case "down":
            	    while(curMap[tempp2.x][tempp2.y]!=4){
            	    	curMap[tempp2.x][tempp2.y]=curMap[tempp1.x][tempp1.y];
            	    	tempp2=tempp1;
            	    	tempp1 = new Point(tempp1.x-1,tempp1.y);
            	    }
            	    curMap[tempp2.x][tempp2.y]=lastfoot;
            	    perPosition=new Point(tempp2.x+1,tempp2.y);
            	    return true;
            	    break;
            	case "left":
            	    while(curMap[tempp2.x][tempp2.y]!=4){
            	    	curMap[tempp2.x][tempp2.y]=curMap[tempp1.x][tempp1.y];
            	    	tempp2=tempp1;
            	    	tempp1 = new Point(tempp1.x,tempp1.y+1);
            	    }
            	    curMap[tempp2.x][tempp2.y]=lastfoot;
            	    perPosition=new Point(tempp2.x,tempp2.y-1);
            	    return true;
            	    break;

            	case "right":
            	    while(curMap[tempp2.x][tempp2.y]!=4){
            	    	curMap[tempp2.x][tempp2.y]=curMap[tempp1.x][tempp1.y];
            	    	tempp2=tempp1;
            	    	tempp1 = new Point(tempp1.x,tempp1.y-1);
            	    }
            	    curMap[tempp2.x][tempp2.y]=lastfoot;
            	    perPosition=new Point(tempp2.x,tempp2.y+1);
            	    return true;
            	    break;
            }

            
        }
        return false;
    }

    if (curMap[p1.x][p1.y]==3 || curMap[p1.x][p1.y]==5||Math.floor(curMap[p1.x][p1.y]/ 10)==5||Math.floor(curMap[p1.x][p1.y]/ 10)==6||Math.floor(curMap[p1.x][p1.y]/ 10)==4||Math.floor(curMap[p1.x][p1.y]/ 10)==3){//若果小人前面是箱子那就还需要判断箱子前面有没有障碍物(箱子/墙)
    	    if((curMap[p1.x][p1.y]==38||curMap[p1.x][p1.y]==39||curMap[p1.x][p1.y]==40)&&!isheartPush){
            	return false;
            }


		if (curMap[p2.x][p2.y]==1 || curMap[p2.x][p2.y]==3||Math.floor(curMap[p2.x][p2.y]/ 10)==1||Math.floor(curMap[p2.x][p2.y]/ 10)==4
			||Math.floor(curMap[p2.x][p2.y]/ 10)==5||Math.floor(curMap[p2.x][p2.y]/ 10)==6||Math.floor(curMap[p2.x][p2.y]/ 10)==2||Math.floor(curMap[p2.x][p2.y]/ 10)==3){
			return false;
		}
		//若果判断都不成功小人则为推动成功，前面方块都前进一步即p2变p1，p1变小人。
		curMap[p2.x][p2.y] = curMap[p1.x][p1.y];

	}
	
	firstfoot=curMap[p1.x][p1.y];
	curMap[p1.x][p1.y] = 4;//p1变小人
	
	//如果脚下原来是墙则离开后为原图地皮否则一律按地板计算
	if(curLevel[perPosition.x][perPosition.y]==1||Math.floor(curLevel[perPosition.x][perPosition.y]/ 10)==1||Math.floor(curLevel[perPosition.x][perPosition.y]/ 10)==2){
		if(!isBoomWallwithMind){
            lastfoot = curLevel[perPosition.x][perPosition.y];			
		}

    }else{
        lastfoot=0;
    }

	if (lastfoot!=2){//若果刚开始小人位置不是陷进的话
		if (lastfoot==5){//可能是5 既有箱子又陷进
		    lastfoot=2;//若果小人本身就在陷进里面的话移开之后还是显示陷进
		}else if( (curLevel[p1.x][p1.y]==1) || ((Math.floor(curLevel[p1.x][p1.y]/ 10))==1) ){//如果小人即将进入墙体
			if(!isBoomWallwithMind){
				firstfoot=curLevel[p1.x][p1.y];
			}		
		}else if( (lastfoot==1) || ((Math.floor(lastfoot/ 10))==1)|| ((Math.floor(lastfoot/ 10))==2) ){//如果小人即将离开墙体
			curMap[perPosition.x][perPosition.y]=lastfoot;
		}else{//除以上的情况外
			lastfoot=0;//小人移开之后之前小人的位置改为地板
		}
	} 

	//重置小人之前的脚底方块
	curMap[perPosition.x][perPosition.y] = lastfoot;
	//能执行到这一步说明小人成功前进，更新坐标值
	perPosition = p1;
	//若果小动了 返回true 指代能够移动小人	 
	return true;
}










