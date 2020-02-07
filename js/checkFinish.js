/*
Function :checkFinish(过关条件的判定)
Author   :黄家辉，张序楷
Build-Date:2019-11-16
Version  :4.0
*/

//遍历地图数组，扫描判断block1和block2是否由is连接
function isConnect(block1,block2){
	for (var i=0;i<curMap.length ;i++ ){
		for (var j=0;j<curMap[i].length ;j++ ){

			if (curMap[i][j]==50&&i!=0&&i!=curMap.length-1) {
				if((curMap[i-1][j]==block2&&curMap[i+1][j]==block1)||(curMap[i-1][j]==block1&&curMap[i+1][j]==block2))
					return true;
			}
			if(curMap[i][j]==50&&j!=0&&j!=curMap.length[i]-1){
				if((curMap[i][j-1]==block1&&curMap[i][j+1]==block2)||(curMap[i][j-1]==block1&&curMap[i][j+1]==block2))
					return true;
			}
		}
	}
	return false;
}


//教学关卡的关卡的判定
function checkFinish_0(){
    //过关条件的情况
    var judge=1;
	if(isConnect(58,53)){
		judge=2;
    }else if(isConnect(59,53)){
    	judge=3
    }else{
    	judge=1;
    }
    
    //三种过关判定条件
	switch(judge){
		case 1:
		    return false;
		    break;
		case 2:
		    if(curMap[10][20]==0){
		    	gameflag=true;
		        return  true;
		    }
		    return false;
		    break;
		case 3:				
				for (var i=0;i<curMap.length;i++ ){
					for (var j=0;j<curMap[i].length;j++ ){
						if (curMap[i][j]==3) {
							curMap[i][j]=87;
						}
		        	}
		    	}
		    	if(!isCopyed) {
					tempMap = copyArray(curMap);
					isCopyed = true;
		        }

		    	for (var i=0;i<tempMap.length;i++ ){
					for (var j=0;j<tempMap[i].length;j++ ){
						if( tempMap[i][j]==87 && curMap[i][j]==0){
							gameflag=true;
		        			return  true;
						}
					}
				}
		    return false;
		    break;
	}
}

//关卡1的判定
function checkFinish_1(){
	var judge=1;
	if(!isConnect(55,56)){
		isWallStop=false;
	}else{
		isWallStop=true;
	}

	if(isConnect(54,53)){
		judge=2;
	}else{
	    judge=1;
	}

	if(!isConnect(51,52)){
		alert("你不是babe谁是babe？");
	    NextLevel(0);//游戏失败
    }
	switch(judge){
		case 1:
		    return false;
		    break;
		case 2:
		    if(curMap[10][17]==0){
		    	gameflag=true;
		        return  true;
		    }
		    return false;
		    break;
	}
}

//关卡2的判定
function checkFinish_2(){
	var judge=1;
	if(!isConnect(47,48)){
		isWallStop=false;		
	}else{
		isWallStop=true;
	}


	for (var i=0;i<curMap.length;i++ ){
		for (var j=0;j<curMap[i].length;j++ ){
				if (curMap[i][j]==45 && curMap[i][j+1]==20 && curMap[i+1][j]!=4 &&curMap[i+2][j]!=4) {
					curMap[i][j+1]=0;
						}
				if (curMap[i][j]==45 && curMap[i+1][j]==20 && curMap[i][j-1]==4 && isWallStop==true) {
				 	curMap[i][j]=22;
				 		}
				if (curMap[i][j]==45 && curMap[i+1][j]==20 && curMap[i][j-1]==4 && isWallStop==false) {
				 	curMap[i][j]=45;
				 		}
				if (curMap[i][j]==22 && curMap[i+1][j]==20 && curMap[i][j-1]==45) {
				 	curMap[i][j]=45;
				 		}
		        	}
		    	}




	if(isConnect(49,53)){
		judge=2;
	}else{
	    judge=1;
	}

	if(isConnect(46,57)){
		for (var i=0;i<curMap.length;i++ ){
					for (var j=0;j<curMap[i].length;j++ ){
						if (curMap[i][j]==45 || curMap[i][j]==21) {
							curMap[i][j]=45;
						}
		        	}
		    	}
	}else{
	    for (var i=0;i<curMap.length;i++ ){
					for (var j=0;j<curMap[i].length;j++ ){
						if (curMap[i][j]==45) {
							curMap[i][j]=21;
						}
		        	}
		    	}
	}
	
	if(!isConnect(51,52))NextLevel(0);//游戏失败
	switch(judge){
		case 1:
		    return false;
		    break;
		case 2:
		    if(curMap[11][26]==0){
		    	gameflag=true;
		        return  true;
		    }
		    return false;
		    break;
	}
}

//关卡3的判定
function checkFinish_3(){
	var judge=1;
	if(isConnect(61,62)&& firstfoot==71){
		alert("没有脑子，人财两空。");
		NextLevel(0);
	}


	if(isConnect(65,63)&&isConnect(55,64)){
		isBoomWallwithMind=true;
	}else{
		isBoomWallwithMind=false;
	}

    if(isConnect(61,53)&&curMap[15][14]==0){
    	gameflag=true;
    	return  true;
    }else{
    	return false;
    }

}

//关卡4的判定
function checkFinish_4(){
	var judge=1;
	if(firstfoot==72){
		alert("绿是一道光芒。");
		NextLevel(0);
	}

	if(isConnect(44,57)){
		isgirlPush=true;
	}else{
		isgirlPush=false;
	}
    //寻找3个heart把位置赋给heartPosition；
	for (var i=0;i<curMap.length;i++ ){
		for (var j=0;j<curMap[i].length;j++ ){
			if (curMap[i][j]==38) {
				heart1Position.x=i;
				heart1Position.y=j;
			}
			if (curMap[i][j]==39) {
				heart2Position.x=i;
				heart2Position.y=j;
			}
			if (curMap[i][j]==40) {
				heart3Position.x=i;
				heart3Position.y=j;
			}
		}
	}




	if (curMap[heart1Position.x][heart1Position.y]==38&&isConnect(42,30)) {
		if(curMap[heart1Position.x][heart1Position.y+p1Face]==0){
				curMap[heart1Position.x][heart1Position.y+p1Face]=38;
				curMap[heart1Position.x][heart1Position.y]=0;
				heart1Position.x=heart1Position.x;
				heart1Position.y=heart1Position.y+p1Face;
        }else if(curMap[heart1Position.x][heart1Position.y+p1Face]==37&&Math.floor(curMap[heart1Position.x][heart1Position.y+p1Face+p1Face]/10)!=1&&isgirlPush){
        	    curMap[heart1Position.x][heart1Position.y]=0;
        	    curMap[heart1Position.x][heart1Position.y+p1Face]=38;
				curMap[heart1Position.x][heart1Position.y+p1Face+p1Face]=37;
				heart1Position.x=heart1Position.x;
				heart1Position.y=heart1Position.y+p1Face;

		}else{
			p1Face=-1*p1Face;

		}
	}

	if (curMap[heart2Position.x][heart2Position.y]==39&&isConnect(42,30)) {
		if(curMap[heart2Position.x+p2Face][heart2Position.y]==0){
				curMap[heart2Position.x+p2Face][heart2Position.y]=39;
				curMap[heart2Position.x][heart2Position.y]=0;
				heart2Position.x=heart2Position.x+p2Face;
				heart2Position.y=heart2Position.y;
		 }else if(curMap[heart2Position.x+p2Face][heart2Position.y]==37&&Math.floor(curMap[heart2Position.x+p2Face+p2Face][heart2Position.y]/10)!=1&&isgirlPush){
		 	    curMap[heart2Position.x][heart2Position.y]=0;
        	    curMap[heart2Position.x+p2Face][heart2Position.y]=39;
				curMap[heart2Position.x+p2Face+p2Face][heart2Position.y]=37;
				heart2Position.x=heart2Position.x+p2Face;
				heart2Position.y=heart2Position.y;
		}else{
			p2Face=-1*p2Face;

		}
	}

	if (curMap[heart3Position.x][heart3Position.y]==40&&isConnect(42,30)) {
		if(curMap[heart3Position.x+p3Face][heart3Position.y]==0||curMap[heart3Position.x+p3Face][heart3Position.y]==72){
				curMap[heart3Position.x+p3Face][heart3Position.y]=40;
				curMap[heart3Position.x][heart3Position.y]=0;
				heart3Position.x=heart3Position.x+p3Face;
				heart3Position.y=heart3Position.y;
	     }else if(curMap[heart3Position.x+p3Face][heart3Position.y]==37&&Math.floor(curMap[heart3Position.x+p3Face+p3Face][heart3Position.y]/10)!=1&&isgirlPush){
	     	curMap[heart3Position.x][heart3Position.y]=0;
        	    curMap[heart3Position.x+p3Face][heart3Position.y]=40;
				curMap[heart3Position.x+p3Face+p3Face][heart3Position.y]=37;
				heart3Position.x=heart3Position.x+p3Face;
				heart3Position.y=heart3Position.y;
		}else{
			p3Face=-1*p3Face;

		}
	}
	for (var i=0;i<curMap.length;i++ ){
		for (var j=0;j<curMap[i].length;j++ ){
            if(curLevel[i][j]==72&&curMap[i][j]==0){
            	curMap[i][j]=72;
            }
            if(curLevel[i][j]==72&&curMap[i][j]==0){
            	curMap[i][j]=72;
            }
            if(curLevel[i][j]==72&&curMap[i][j]==0){
            	curMap[i][j]=72;
            }
		}
	}
    
	if(isConnect(42,57)){
		isheartPush=true;
	}else{
		isheartPush=false;
	}  

    if(!isgirlPush&&firstfoot==37){
    	gameflag=true;
        return true;
    }else{
    	return false;
    }

}

//关卡5的判定
function checkFinish_5(){
    if(isBack){
    		if(count==8||count==9){
    			ctx.fillText('这是老地方',640,80);
    			ctx.fillText('但此时你试图抓住更多东西',640,150);
    		}else{


    		 if(!isWill){
                ctx.fillText('January 2019',640,80);
                ctx.fillText('Growth needs will',640,150);
	        }
	        if(isWill&&!isBrave){
		        ctx.fillText('March 2019',640,80);
                ctx.fillText('Growth needs brave',640,150);
	        }
	        if(isBrave&&!isLove){
		        ctx.fillText('May 2019',640,80);
                ctx.fillText('Growth needs love',640,150);		
	        }
	        if(isLove&&!isHope){
		        ctx.fillText('September 2019',640,80);
                ctx.fillText('Growth needs hope',640,150);	
	        }
	        if(isHope&&!isDream){
		        ctx.fillText('November 2019',640,80);
                ctx.fillText('Growth needs dream',640,150);	
	        }


	    }
    }else{

    	  //每当它出现，整个世界都变灰了，持续的低落、疲惫、哀伤、焦虑、自责，日子变得看不到前方，一切都慢了下来。对外界的兴趣消失了，哪儿都不想去，偶尔还会想到放弃。 




    	  if(count==7){
              ctx.fillText('这又是什么苦差事',640,80);
    	  }else if(count==8||count==9){
              ctx.fillText('Sadness around you',640,80);
          }else if(count==12||count==13||count==14){
               ctx.fillText('后果，我来承担吗',640,80);
    	  }else if(count==19||count==20){
                ctx.fillText('Fear around you',640,80);
    	  }else if(count==22||count==23||count==24){
                ctx.fillText('我该怎么办',640,80);
    	  }else if(count==29||count==30){
              ctx.fillText('Lost around you',640,80);
    	  }else if(count==32||count==33||count==34){
               ctx.fillText('我受够了',640,80);
    	  }else if(count==36||count==37){
    	  	   ctx.fillText('Rage around you',640,80);
    	  }


/*


    	  if(count>7&&count<15){
    	  	    ctx.fillText('Sadness around you',640,80);
    	  }else if(count>17&&count<25){
    	  	     ctx.fillText('Fear around you',640,80);
    	  }else if(count>27&&count<33){
    	  	     ctx.fillText('Lost around you',640,80);
    	  }else if(count>35&&count<39){
    	  	     ctx.fillText('Rage around you',640,80);
    	  }
    	  */
    	  
    }


    isLive=false;
    for (var i=0;i<curMap.length;i++ ){
		for (var j=0;j<curMap[i].length;j++ ){
            if(curMap[i][j]==4){
            	isLive=true;
            }
		}
	}
	if(!isLive)hp--;
	    if(isBack){
	        if(!isWill&&firstfoot==80){
	        	hp=hp+3;
	    	    isWill=true;
	        }
	        	
	    	if(isWill&&!isBrave&&firstfoot==75){
	    		hp=hp+3;
	    	    isBrave=true;
	    	}
	    	    
	    	if(isBrave&&!isLove&&firstfoot==44){
	    		hp=hp+3;
	    	    isLove=true;
	    	}    
	    	if(isLove&&!isHope&&firstfoot==73){
	    		hp=hp+3;
	    	    isHope=true;
	    	}	    
	    	if(isHope&&!isDream&&firstfoot==74){
	    		hp=hp+3;
	    	    isDream=true;
	    	    return true;
	    	}
	    	    
        } 
    if(isDie){
    	isBack=true;
        alert("请保持你的决心。");
        part5.pause();
        lose.play();
        drawDH(text6,true);
	       	
    }
	if(hp==0){
        isDie=true;
	}
	return false;

}
