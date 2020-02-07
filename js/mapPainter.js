/*
Function :mapPainter(地图绘制器)
Author   :黄家辉，张序楷
Build-Date:2019-11-16
Version  :4.0
*/

//绘制地板
function InitMap(){
	for (var i=0;i<16 ;i++ ){
		for (var j=0;j<16 ;j++ ){
			ctx.drawImage(block,w*j,h*i,w,h);
		}
	}
}

//用于解决绘制小人出现的地图缺口bug
function repairMap(i,j,pic){
	ctx.drawImage(block,w*j-(pic.width-w)/2,h*i-(pic.height-h),pic.width,pic.height);

	switch(firstfoot){
        case 11:
            ctx.drawImage(wall1,w*j-(pic.width-w)/2,h*i-(pic.height-h),pic.width,pic.height);	
			break;
		case 12:
            ctx.drawImage(wall2,w*j-(pic.width-w)/2,h*i-(pic.height-h),pic.width,pic.height);	
			break;
		case 13:
            ctx.drawImage(wall3,w*j-(pic.width-w)/2,h*i-(pic.height-h),pic.width,pic.height);	
			break;
		case 14:
            ctx.drawImage(wall4,w*j-(pic.width-w)/2,h*i-(pic.height-h),pic.width,pic.height);	
			break;
		case 15:
            ctx.drawImage(wall5,w*j-(pic.width-w)/2,h*i-(pic.height-h),pic.width,pic.height);	
			break;
		case 16:
            ctx.drawImage(wall6,w*j-(pic.width-w)/2,h*i-(pic.height-h),pic.width,pic.height);	
			break;
		case 17:
            ctx.drawImage(wall7,w*j-(pic.width-w)/2,h*i-(pic.height-h),pic.width,pic.height);	
			break;
		case 18:
            ctx.drawImage(wall8,w*j-(pic.width-w)/2,h*i-(pic.height-h),pic.width,pic.height);	
			break;
		case 19:
            ctx.drawImage(wall9,w*j-(pic.width-w)/2,h*i-(pic.height-h),pic.width,pic.height);	
			break;
		case 10:
            ctx.drawImage(wall0,w*j-(pic.width-w)/2,h*i-(pic.height-h),pic.width,pic.height);	
			break;
    }
}


//绘制地图
/*case:
*1×：墙壁方块
*2×：替换特殊方块
*3456×：可推动方块
*7×：   可食用方块
*/
function DrawMap(level){
	for (var i=0;i<level.length ;i++ ){
		for (var j=0;j<level[i].length ;j++ ){
			var pic = block;//初始图片
			switch (level[i][j]){


                //推箱子原设定
				case 1://绘制墙壁,原设定，现图为门
					pic = door;
					break;
				case 2://绘制终点
					pic = ball;
					break;
				case 3://绘制箱子
					pic = food;
					break;
				case 4://绘制小人
					pic = curBabe;//小人有四个方向 具体显示哪个图片需要和上下左右方位值关联
					repairMap(i,j,pic);                   
					perPosition.x = i;
					perPosition.y = j;
					break;
				case 5://绘制箱子及陷进位置重合的亚子
					pic = box;
					break;


				//绘制墙壁
				case 10:
                    pic = wall0;
					break;
                case 11:
                    pic = wall1;
					break;
				case 12:
                    pic = wall2;
					break;
				case 13:
                    pic = wall3;
					break;
			    case 14:
                    pic = wall4;
					break;
				case 15:
                    pic = wall5;
					break;
				case 16:
                    pic = wall6;
					break;
				case 17:
                    pic = wall7;
					break;
				case 18:
                    pic = wall8;
					break;
				case 19:
                    pic = wall9;
					break;

			    //文字
			    case 30:
					pic=move_t;
					break;
			    case 42:

					pic=heart_t;
					break;
			    case 43:
					pic=green_t;
					break;
				case 44:
					pic=love_t;
					break;
				case 46:
					pic=book_t;
					break;
				case 47:
					pic=parent_t;
					break;
				case 48:
					pic=ban_t;
					break;
				case 49:
					pic=game_t;
					break;
				case 50:
				   pic=is_t;
				   break;
				case 51:
				   pic=babe_t;
				   break;
				case 52:
				   pic=you_t;
				   break;
				case 53:
				   pic=growth_t;
				   break;
				case 54:
				   pic=play_t;
				   break;
				case 55:
				   pic=wall_t;
				   break;
				case 56:
				   pic=stop_t;
				   break;
				case 57:
				   pic=push_t;
				   break;
				case 58:
				   pic=sleep_t;
				   break;
				case 59:
				   pic=food_t;
				   break;
				   




				case 61:
				    pic=money_t;
				    break;
				case 62:
				    pic=defeat_t;
				    break;
				case 63:
				    pic=open_t;
				    break;
				case 64:
				    pic=shut_t;
				    break;
				case 65:
				    pic=mind_t;
				    break;
				case 66:
				    pic=mind;
				    break;
				case 67:
				    pic=door_t;
				    break;


				//虚体
				case 70:
				   pic=sleep;
				   break;
				case 71:
				    pic=money;
				    break;
				case 72:
				    pic=green;
				    break;
				case 73:
				    pic=hope;
				    break;
				case 74:
				    pic=dream;
				    break;
				case 75:
				    pic=brave;
				    break;
				case 76:
				    pic=fear;
				    break;
				case 77:
				    pic=wei;
				    break;
				case 78:
				    pic=lost;
				    break;
				case 79:
				    pic=sad;
				    break;
				case 80:
				    pic=will;
				    break;
				case 81:
				    pic=rage;
				    break;
				case 82:
				    pic=H;
				    break;
				case 83:
				    pic=P;
				    break;
				case 84:
				    pic=grass;
				    break;
				case 85:
				    pic=toy;
				    break;
				case 86:
				    pic=game_p;
				    break;
				case 87:
				    pic=food;
				    break;

                //level[2]特殊
			    case 20:
					pic=parent_p;
					break;   
				case 21:
					pic=book_p;
					break;
				case 22:
					pic=book_p;
					break;
			    case 23:
					pic=parent_p;
					break;								
				case 45:
					pic=book_p;
					break;
				case 60:
					pic=parent_p;
					break;
				case 68:
					pic=game_p;
					break;
				case 69:
					pic=book_p;
					break;
				//level[4]特殊
				case 40:
					pic=love;
					break; 
				case 39:
					pic=love;
					break; 
				case 38:
					pic=love;
					break; 
				case 37:
					pic=grillove;
					break;  
			}
			//if为修复语句
			if(curMap[i][j]!=4)ctx.drawImage(block,w*j-(pic.width-w)/2,h*i-(pic.height-h),pic.width,pic.height);		  
		        ctx.drawImage(pic,w*j-(pic.width-w)/2,h*i-(pic.height-h),pic.width,pic.height);		   
		}
	}
}