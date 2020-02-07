/************************绘制环境***************************/

var can = document.getElementById("canvas");
var msg = document.getElementById("msg");
var ctx = can.getContext("2d");

/**********************游戏通用变量*************************/

var w = 35,h = 35;//图片块的长宽
var perPosition = new Point(5,5);//小人的初始标值
var heart1Position=new Point(5,26);//爱心1的初始标值
var heart2Position=new Point(6,8);//爱心2的初始标值
var heart3Position=new Point(14,28);//爱心3的初始标值
var curMap;//当前的地图
var curLevel;//当前等级的地图
var nowBoom;//存放临时数组的地图数值
  
var hp=7;   //人物的血量
var curBaby;//初始化小人
var iCurlevel = 0;//关卡数
var moveTimes = 0;//移动了多少次
var lastfoot,firstfoot;//前一步，后一步的地图值
var tempMap;//临时存储地图数组
var count=6;//计数器
//文本样式:
var style={
	fontSize:50,
	fontFamily:"Arial",
	hAlign:"center",
	vAlign:"middle",
	color:"white",
	isFill:true
};

/**********************游戏flag声明*************************/

var menustart=false;//菜单开始	
var gameflag=false;//关卡是否通过
var isWallStop=true;//墙体是否阻拦
var isCopyed=false;//是否复制股过数组
var isBoomWallwithMind=false;//ming图标是否能破坏墙体
var isheartPush=false;//心脏是否能被推动
var isgirlPush=false;//女孩是否能被推动
var p1Face=1;//爱心1的行走朝向
var p2Face=1;//爱心2的行走朝向
var p3Face=1;//爱心3的行走朝向
var isLive=false;//控制人物存在标记
var isDie=false;//控制人物死亡判定
//最后一关
var isBack=false;//最后一关是否是第二遍
var isWill=false;//will是否吃到过
var isBrave=false;//brave是否吃到过
var isLove=false;//love是否吃到过
var isHope=false;//hope是否吃到过
var isDream=false;//dream是否吃到过

/**********************游戏素材声明*************************/
//图标类：
var block,box,ball,babe_l,babe_r,babe_h,babe_b,toy,door,parent_p,game_p,book_p,love,grass,green,grillove,H,P,
    mind,money,hope,dream,brave,will,wei,lost,sad,fear,rage,sleep,food;
//墙体类：
var wall1,wall2,wall3,wall4,wall5,wall6,wall7,wall8,wall9,wall0;
//文字类：
var babe_t,is_t,you_t,growth_t,wall_t,stop_t,play_t,move_t,push_t,
    sleep_t,ban_t,parent_t,play_t,book_t,game_t,food_t,parent_t,menu_t,
    door_t,money_t,defeat_t,open_t,shut_t,mind_t,love_t,green_t,heart_t;

//音乐对象:
var menu=document.getElementById("menu");
var part0=document.getElementById("part0");
var part1=document.getElementById("part1");
var part2=document.getElementById("part2");
var part3=document.getElementById("part3");
var part4=document.getElementById("part4");
var part5=document.getElementById("part5");
var lose=document.getElementById("lose");
var loseback=document.getElementById("loseback");
var music=document.getElementById("music");//按钮对象

/**********************过关小剧场文案*************************/

var text1=["（女声）别看电视了，过来帮我把玩具拿走，孩子要睡了","（男声）现在才八点半，你看孩子也是不想睡的样子",
           "（女声）八点半还不晚么，别人家孩子早睡了","（男声）不会吧，我昨天还看见","（女声）嗯？家里谁说的算","（男声）当然是您啦",
           "（男声）那我把玩具放远一点","（小声）爸爸只能帮你到这了"];
var text2=["“啊啊啊，没有游戏玩我要死了","“那动作请快一点，我绝不阻拦","“可是死之前我想最后玩一会游戏","“那就把作业拿过来","“留给我的时间不多了，真的！"
         ,"“我留给你的时间也不多了，不骗你","“我的亲妈啊！！！","“少废话，还！不！快！去！"];
var text3=["“你所赚的每一分钱"," 都是你对这个世界认知的变现"," 你所亏的每一分钱"," 都是因为对这个世界认知有缺陷"," 这个世界最大的公平在于"," 当一个人的财富大于自己的认知时",
          " 这个社会有千万种方法收割你"," 直到你的认知和财富相匹配为止","“妈，啥玩意，听不懂",'“你还小，懂得太少，社会太危险，所以'," 过完年，把压岁钱给我交喽","“啊啊！！这个理由不能成立的吧！！"];
//var text4=["“我没看错吧，最近如此勤奋好学？","“这可能就是我无法按捺的求知欲吧","“呕，你不要恶心我啊哈哈哈","“平常只是不想给你们太大的压迫感，其实我很勇的",
          //"“那你学到哪了","“异或门及其应用","“嘻嘻，比我慢","“切！走开走开，你打扰到我学习了","（内心）我什么时候才能把压岁钱给弄回来啊"];
var text4=["“喂，你说，女生无论什么天气都是天天洗澡的么","“也许吧，怎么了","“她们不冷么，不嫌麻烦么，不让浪费水资源么","“我又不是女的，你问我我怎么知道",
           "“算了算了，我为什么要问你这个大直男","“好意思说我，你不是？哎，等等","”你你你，你不会对哪个女生","“去去去！一边去","“我的天，你居然"," 哈哈，不行让我先笑会"," 要不跟我说说，哎别，冷静大哥我错了","(桌椅掀翻的声音"];
var text5=["日记","二零一九年三月十二，天气，我不知道","同龄人的优秀让我有些担忧","这种担忧甚至多过了我原本对自己的计划和期望","我无法控制地朝向那些方向看去",
           "即便我知道每一个好的背后都有各自的付出与不易","即便我知道应该更多的参与到自己的生活中来","我的质变还需要多少的量来作为积累？",
           "机械重复的生活又要再过多少遍才能迎来改变？","而这些问题的答案，我并不总是能自己给","啧，真矫情，果然","我还得再加把劲阿！"];
var text6=["每当它出现时","整个世界都变灰了","轻易地低落，疲惫，哀伤，焦虑，自责","欢笑总是一闪而逝","而伤痕会一直陪伴你",
           "留下痕迹，成长的意义莫过如此","十九岁，好胜又脆弱的时候","在这时对强壮的渴望愈发强烈","站稳了！","若想把时间再往前推进一年","我还需要抓住一些东西"];
var text7=["“还有三天，新的一年就要开始了"," 新的一年，什么愿望","“变得强壮","“哈？？？","“我追求的强壮不是一决胜负的强壮"," 我不希求用于反击外力的墙壁"," 我希求的是接受外力、忍耐外力的强壮"," 是能够静静忍受不公平不走运不理解",
           " 和悲伤等种种情况的强壮。","“那恐怕是最难得到的一类强壮。","“我知道"];



/**********************预加载所有图片*************************/

var oImgs = {
	"menu_t"   :"images/menu_t.png",
	"block"   :"images/block.png",//地板
    "babe_r"  :"images/right.png",//babe左图
    "babe_l"  :"images/left.png",//babe右图
    "babe_h"  :"images/babe-b.png",//babe左图
    "babe_b"  :"images/back1.png",//babe右图
    //文字方块
    "babe_t"  :"images/babe.png",
    "is_t"    :"images/is.png",
    "you_t"   :"images/you.png",
    "growth_t":"images/growth.png",
    "wall_t"  :"images/wall.png",
    "move_t"  :"images/move.png",
    "push_t"  :"images/push.png",
    "stop_t"  :"images/stop.png",
    "ban_t"   :"images/ban_t.png",
    "sleep_t" :"images/sleep_t.png",
    "parent_t":"images/parent_t.png",
    "book_t"  :"images/book_t.png",
    "game_t"  :"images/game_t.png",
    "food_t"  :"images/food_t.png",
    "parent_t":"images/parent_t.png",    
    "play_t"  :"images/play_t.png",
   
    //各朝向的墙
	"wall1"   :"images/wall1.png",
	"wall2"   :"images/wall2.png",
	"wall3"   :"images/wall3.png",
	"wall4"   :"images/wall4.png",
	"wall5"   :"images/wall5.png",
	"wall6"   :"images/wall6.png",
	"wall7"   :"images/wall7.png",
	"wall8"   :"images/wall8.png",
	"wall9"   :"images/wall9.png",
	"wall0"   :"images/wall0.png",

	"toy"     :"images/toy.png",
	"box"     :"images/ball.png",
	"ball"    :"images/babetxt.png",
    "parent_p":"images/parent-p.png",
    "game_p"  :"images/game-p.png",
    "book_p"  :"images/book-p.png",
	"mind"    :"images/mind.png",
	"money"   :"images/money.png",
	"door_t"  :"images/door_t.png",
	"money_t" :"images/money_t.png",
	"defeat_t":"images/defeat_t.png",
	"open_t"  :"images/open_t.png",
	"shut_t"  :"images/shut_t.png",
	"mind_t"  :"images/mind_t.png",
	"love_t"  :"images/love_t.png",
	"door"    :"images/door.png",
	"green_t" :"images/green_t.png",
	"heart_t" :"images/heart_t.png",
	"love"    :"images/love.png",
	"green"   :"images/green.png",
	"grillove":"images/grillove.png",
	"hope"    :"images/hope.png",
	"dream"   :"images/dream.png",
	"brave"   :"images/brave.png",
	"will"    :"images/will.png",
	"wei"     :"images/wei.png",
	"lost"    :"images/lost.png",
	"sad"     :"images/sad.png",
	"fear"    :"images/fear.png",
	"rage"    :"images/rage.png",
	"H"       :"images/H.png",
	"P"       :"images/P.png",
	"grass"	  :"images/grass.png",
	"sleep"	  :"images/sleep.png",
	"food"	  :"images/food.png",
};


imgPreload(oImgs,function(images){
			//console.log(images.block);
			block = images.block;
			menu_t=images.menu_t;

			//文字
			babe_t=images.babe_t; 
			is_t=images.is_t; 
			you_t=images.you_t; 
			growth_t=images.growth_t; 
			wall_t=images.wall_t; 
			stop_t=images.stop_t; 
			play_t=images.play_t; 
			move_t=images.move_t;
			push_t=images.push_t;
			sleep_t=images.sleep_t;
			ban_t=images.ban_t;
			parent_t=images.parent_t;
			book_t=images.book_t;
			game_t=images.game_t;
			food_t=images.food_t;
			parent_t=images.parent_t;
			parent_p=images.parent_p;
			game_p=images.game_p;
			book_p=images.book_p;

			//墙体
			wall1 = images.wall1;
			wall2 = images.wall2;
			wall3 = images.wall3;
			wall4= images.wall4;
			wall5= images.wall5;
			wall6= images.wall6;
			wall7= images.wall7;
			wall8= images.wall8;
			wall9= images.wall9;
			wall0= images.wall0;

			//虚体：
			toy=images.toy;
			box = images.box;
			ball = images.ball;
			babe_l = images.babe_l;
			babe_r = images.babe_r;
			babe_h = images.babe_h;
    		babe_b = images.babe_b;
            mind=images.mind;
            money=images.money;
            door=images.door;
            door_t=images.door_t;
            money_t=images.money_t;
            defeat_t=images.defeat_t;
            open_t=images.open_t;
            shut_t=images.shut_t;
            mind_t=images.mind_t;
            love_t=images.love_t;
            green_t=images.green_t;
            heart_t=images.heart_t;
            love=images.love;
            green=images.green;
            grillove=images.grillove;
            hope=images.hope;
            dream=images.dream;
            brave=images.brave;
            will=images.will;
            wei=images.wei;
            lost=images.lost;
            sad=images.sad;
            fear=images.fear;
            rage=images.rage;
            H=images.H;
            P=images.P;
            grass=images.grass;
            sleep=images.sleep;
            food=images.food;			
});

/**********************过场动画模块并启动游戏*************************/

back.src = "images/back.png";
back.onload = function() {
	canvas.onclick=function(){
		menu.play();
	}
	drawBack();
	requestNextAnimationFrame(animate);		
}


	