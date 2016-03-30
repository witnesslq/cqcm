	/***
	 * 界面初始化及事件控制
	 * @author:chen.yiwan
	 */
	var map = null;
	
	var northPlaza=null;//北广场
	var ltsBusStation=null;//龙头寺长途汽车站
	var northRailStation=null;//火车北站站内
	var southPlazaTransitHub=null; //南广场枢纽
	
	var selectObj=null;	//当前选择的哪一块区域
	//定义覆盖物数组
	var polygonArray=null;
	
	//定义四块覆盖物中显示的标题及详情内容对象
	var ltsTip=null;
	var northTip=null;
	var stationTip=null;
	var southTip=null;
	
	//定义四块覆盖物中显示的标题及详情内容对象 数组
	var tipArray=null;
	
	var lineChart=null;	//折线图echart
	var pieChart=null;	//饼图
	var disPieChart=null;
	
	/**
	 * 定义每块区域对应的channel_id
	 */
	var cqb_channel_id='457113547';  //重庆北站channel_id
	var channelArray=[{name:'cqb',channel_id:'457113547',channel_name:'重庆北站'},{name:'ltsBusStation',channel_id:'460940273',channel_name:'龙头寺长途汽车站'},{name:'northPlaza',channel_id:'460942880',channel_name:'北广场'},
	                 {name:'northRailStation',channel_id:'460941813',channel_name:'火车北站站内'},{name:'southPlazaTransitHub',channel_id:'460941043',channel_name:'南广场枢纽'}];
	
	
	var lineChartDynamicInterval=null;	//动态折线计时器
	////////////////////////////////////////////////数据声明定义完毕/////////////////////////////////////////////
	
	
	//添加覆盖物
	function add_overlay(){
		//北广场初始化覆盖物
		northPlaza=new BMap.Polygon([
          new BMap.Point(106.556122,29.615526),new BMap.Point(106.556145,29.617795),new BMap.Point(106.556158,29.619172),new BMap.Point(106.559671,29.61911),new BMap.Point(106.559787,29.619102),new BMap.Point(106.559918,29.619074),new BMap.Point(106.559958,29.619055),new BMap.Point(106.559985,29.619039),new BMap.Point(106.560048,29.618996),new BMap.Point(106.560084,29.618957),new BMap.Point(106.560102,29.618925),new BMap.Point(106.560142,29.618898),new BMap.Point(106.560151,29.618866),new BMap.Point(106.560187,29.618819),new BMap.Point(106.560192,29.618768),new BMap.Point(106.560192,29.618682),new BMap.Point(106.560174,29.615938),new BMap.Point(106.560169,29.615467),new BMap.Point(106.559248,29.615479),new BMap.Point(106.558287,29.615487),new BMap.Point(106.557178,29.615499)                         
		], {strokeColor:"#727272",strokeWeight:1,strokeOpacity:1});
		northPlaza.setFillOpacity(0.25);
		northPlaza.setFillColor("#4D4D4D");
		//northPlaza.enableEditing();
		northPlaza.addEventListener("click",function(type, target, point, pixel){
			polygonClickListener(northPlaza,"northPlaza");
	  	});
	  
	  		
	  		//初始化龙头寺长途汽车站
		ltsBusStation=new BMap.Polygon([
        	new BMap.Point(106.552938,29.615542),new BMap.Point(106.552987,29.618902),new BMap.Point(106.553032,29.619011),new BMap.Point(106.553086,29.619078),new BMap.Point(106.553153,29.619117),new BMap.Point(106.553234,29.619165),new BMap.Point(106.553333,29.619192),new BMap.Point(106.553517,29.619196),new BMap.Point(106.556158,29.619172),new BMap.Point(106.556127,29.615522)
		], {strokeColor:"#727272",strokeWeight:1,strokeOpacity:1});
		
		ltsBusStation.setFillOpacity(0.25);
		ltsBusStation.setFillColor("#4D4D4D");
		//ltsBusStation.enableEditing();
		ltsBusStation.addEventListener("click",function(type, target, point, pixel){
			polygonClickListener(ltsBusStation,"ltsBusStation");
		});
		
		
		//初始化火车北站站内
		northRailStation=new BMap.Polygon([
          new BMap.Point(106.552938,29.615546),new BMap.Point(106.552947,29.613568),new BMap.Point(106.560187,29.613521),new BMap.Point(106.560169,29.615467)
		], {strokeColor:"#727272",strokeWeight:1,strokeOpacity:1});
		
		northRailStation.setFillOpacity(0.25);
		northRailStation.setFillColor("#4D4D4D");
		//northRailStation.enableEditing();
		northRailStation.addEventListener("click",function(type, target, point, pixel){
			polygonClickListener(northRailStation,"northRailStation");
		});
		
	    //初始化南广场枢纽
		southPlazaTransitHub=new BMap.Polygon([
	       new BMap.Point(106.552956,29.611334),new BMap.Point(106.552942,29.613576),new BMap.Point(106.560187,29.613521),new BMap.Point(106.560192,29.612261),new BMap.Point(106.560187,29.611468),new BMap.Point(106.560183,29.611181),new BMap.Point(106.560151,29.611064),new BMap.Point(106.560088,29.610977),new BMap.Point(106.560021,29.610903),new BMap.Point(106.559945,29.610852),new BMap.Point(106.55981,29.610832),new BMap.Point(106.559576,29.610828),new BMap.Point(106.553248,29.610804),new BMap.Point(106.553104,29.610832),new BMap.Point(106.55305,29.610887),new BMap.Point(106.553032,29.610922),new BMap.Point(106.553005,29.610942),new BMap.Point(106.552992,29.610965),new BMap.Point(106.552992,29.610981),new BMap.Point(106.552978,29.610989),new BMap.Point(106.552969,29.611024),new BMap.Point(106.552956,29.611064),new BMap.Point(106.552956,29.611197)
		], {strokeColor:"#727272",strokeWeight:1,strokeOpacity:1});
		
		southPlazaTransitHub.setFillOpacity(0.25);
		southPlazaTransitHub.setFillColor("#4D4D4D");
		//southPlazaTransitHub.enableEditing();
		southPlazaTransitHub.addEventListener("click",function(type, target, point, pixel){
			polygonClickListener(southPlazaTransitHub,"southPlazaTransitHub");
		});
		
		//添加覆盖物
		map.addOverlay(ltsBusStation);
		map.addOverlay(northPlaza);
		map.addOverlay(northRailStation);
		map.addOverlay(southPlazaTransitHub);
		
		polygonArray=[{name:"ltsBusStation",polygon:ltsBusStation},
		              {name:"northPlaza",polygon:northPlaza},
			          {name:"northRailStation",polygon:northRailStation},
			          {name:"southPlazaTransitHub",polygon:southPlazaTransitHub}];
	}
	
	/**
	 * 辅助打印经纬度信息
	 * */
	function PathPrint(obj){
		var retString="";
		for(var i=0;i<obj.length;i++)
		{
			retString+="new BMap.Point("+obj[i].lng+","+obj[i].lat+"),";
		}
		retString=retString.substr(0,retString.length-1);
		console.log(retString);
	}
	
	/***
	 * 覆盖物点击事件
	 * @param obj
	 */
	function polygonClickListener(obj,polygonName){
		//PathPrint(southPlazaTransitHub.getPath());
		for(var i=0;i<polygonArray.length;i++){
			if(polygonArray[i].name===polygonName){
				polygonArray[i].polygon.setStrokeStyle("dashed");
				//tipArray[i].tip.selected();
				//tipArray[i].tip.changeImg('selected.png');
				
				polygonArray[i].polygon.setFillColor("#999999");
				polygonArray[i].polygon.setFillOpacity(0.8);
			
				selectObj={name:polygonName,polygon:obj};
				
				$("#layer").show("slow");
				//更新层中显示信息
				updateLayer(selectObj);
			}else{
				polygonArray[i].polygon.setStrokeStyle("solid");

				polygonArray[i].polygon.setFillColor("#4D4D4D");
				polygonArray[i].polygon.setFillOpacity(0.25);
				
				//tipArray[i].tip.unSelected();
				//tipArray[i].tip.changeImg('unSelected.png');
			}
		}
		
		
		//重置轮播效果
		//resetPlay();
		
	}
	
	
	function resetPlay(){
		window.clearInterval(hoverInteval);
		window.clearInterval(hoverIntevalSource);
		
		carouselSource();
		carouselDistributed();
		
	}
	
	/***
	 * 初始化地图
	 */
	function initMap(){
		map=new BMap.Map("allmap");
		map.centerAndZoom(new BMap.Point(106.563643,29.613000), 17);
		//var navControl=new BMap.NavigationControl();
		//navControl.setAnchor(BMAP_ANCHOR_BOTTOM_LEFT); 	      //控制地图平移控件位置
		//map.addControl(navControl);      				      //添加平移缩放控件
		//map.addControl(new BMap.ScaleControl());            //添加比例尺控件
		//map.addControl(new BMap.OverviewMapControl());      //添加缩略地图控件
		//map.enableScrollWheelZoom();                        //启用滚轮放大缩小
		//map.addControl(new BMap.MapTypeControl());          //添加地图类型控件
		//map.disableDragging(); 							  //禁用地图拖拽
		
		/***
		//添加地图点击事件
		map.addEventListener("click",function(e){
		     if(e.overlay){
		         //PathPrint(southPlazaTransitHub.getPath());
		     }
		});
		***/
		
		add_overlay();
	}
	
	//初始化四大覆盖物的信息提示
	function initTipOverlay(){

	    northTip = new ComplexCustomOverlay(new BMap.Point(106.556979,29.616800), "北广场","当前人数：0人<br/>滞留人数：0人");
	    map.addOverlay(northTip);
		
		ltsTip = new ComplexCustomOverlay(new BMap.Point(106.55330,29.617536), "龙头寺长途汽车站","当前人数：0人<br/>滞留人数：0人");
	    map.addOverlay(ltsTip);
	    
	    stationTip = new ComplexCustomOverlay(new BMap.Point(106.555580,29.614690), "火车北站站内","当前人数：0人<br/>滞留人数：0人");
	    map.addOverlay(stationTip);
	    
	    southTip = new ComplexCustomOverlay(new BMap.Point(106.555389,29.612000), "南广场枢纽","当前人数：0人<br/>滞留人数：0人");
	    map.addOverlay(southTip);
	    
	    tipArray=[ {name:"ltsBusStation",tip:ltsTip},
			          {name:"northPlaza",tip:northTip},
			          {name:"northRailStation",tip:stationTip},
			          {name:"southPlazaTransitHub",tip:southTip}];
	    
	    //给复杂覆盖物添加点击事件
	    /***
	     //在IE678上不支持addEventListener
	    ltsTip._div.addEventListener("click",function(){
	    	polygonClickListener(ltsBusStation,"ltsBusStation");
	    }, false);
	    
	    northTip._div.addEventListener("click",function(){
	    	polygonClickListener(northPlaza,"northPlaza");
	    }, false);
	    
	    stationTip._div.addEventListener("click",function(){
	    	polygonClickListener(northRailStation,"northRailStation");
	    }, false);
	    
	    southTip._div.addEventListener("click",function(){
	    	polygonClickListener(southPlazaTransitHub,"southPlazaTransitHub");
	    }, false);
	    ***/
	    
	    ltsTip._div.onclick=function(){
	    	polygonClickListener(ltsBusStation,"ltsBusStation");
	    }
	    
	    northTip._div.onclick=function(){
	    	polygonClickListener(northPlaza,"northPlaza");
	    };
	    
	    stationTip._div.onclick=function(){
	    	polygonClickListener(northRailStation,"northRailStation");
	    };
	    
	    southTip._div.onclick=function(){
	    	polygonClickListener(southPlazaTransitHub,"southPlazaTransitHub");
	    };
	}
	
	
	/***
	 * 关闭信息层
	 */
	function closeLayer(){
		$("#layer").hide("slow");
	}
	
	/***
	 * 加载当前时间
	 * 每隔一分钟更新一数当前时间
	 */
	function initTime(){
		$("#currTime").html(getDateWeekTime());
		setInterval(function(){
			$("#currTime").html(getDateWeekTime());
		},1000*60);
	}
	
	
	/***
	 * 初始化lineChart
	 */
	function initLineChart(){
		lineChart = echarts.init(document.getElementById('lineChartDiv'));
	}
	
	/**
	 * 初始化滞留人数来源饼图
	 */
	function initPieChart(){
		pieChart=echarts.init(document.getElementById('pieChartDiv'));
	}
	
	/**
	 * 初始化滞留人数分布饼图
	 */
	function initDistributedPieChart(){
		disPieChart=echarts.init(document.getElementById('distributedPieChartDiv'));
	}
	
	/***
	 * 滞留人数分布滚动
	 */
	var hoverInteval=null;
	function carouselDistributed(){
		var t1=$("#distributedTableDiv");
		var t2=$("#distributedPieChartDiv");
		
		hoverInteval=window.setInterval(function(){
			if(t1.css("display")=="block"){ //当前T1处于display
				t1.hide();
				t2.animate({
				      height:'toggle'
			    });
			}else{
				t2.hide();
				t1.animate({
				      height:'toggle'
			    });
			}
		},1000*10);
	}
	
	function mouseOverStop(){
		window.clearInterval(hoverInteval);
	}
	
	function mouseOutStart(){
		carouselDistributed();
	}
	
	
	/***
	 * 外省漫入人数滚动
	 * 
	 */
	var hoverIntevalSource=null; //外省漫游人数滚动
	function carouselSource(){
		var t1=$("#pieTable");
		var t2=$("#pieChartDiv");
		
		hoverIntevalSource=window.setInterval(function(){
			if(t1.css("display")=="block"){ //当前T1处于display
				t1.hide();
				t2.animate({
				      height:'toggle'
			    });
			}else{
				t2.hide();
				t1.animate({
				      height:'toggle'
			    });
			}
		},1000*10);
	}
	
	function mouseOverStopSource(){
		window.clearInterval(hoverIntevalSource);
	}
	
	function mouseOutStartSource(){
		carouselSource();
	}
	
	
	
	
	/***
	 * 轮播四块覆盖物图标
	 */
	var four_idx=0;
	function carouselFourPolygonCackground(){
		var tipObj=null;
		var old_tipObj=null;
		window.setInterval(function(){
			if(four_idx>3){
				four_idx=0;
			}
			tipObj=tipArray[four_idx].tip;
			tipObj.changeImg("polygon.gif");
			
			four_idx=four_idx+1;
			if(old_tipObj!=null){
				old_tipObj.changeImg('unSelected.png');
			}
			
			old_tipObj=tipObj;
		},6*1000);
	}
	
	/***
	 * 初始化主界面各元素
	 */
	function initView(){
		$("#allmap").height($(document).height()-$("#titleBar").height()+10);
		$("#allmap").width($(document).width());
		$("#allmap").css("overFlow","hidden");
		$("#footer").show('slow');
		$("#footer").css("top",$(document).height());
		
		$("#layer").hide();
		
		initMap(); //初始化地图
		initTipOverlay(); //初始化四块覆盖物中显示的标题及详情对象
		
		initLineChart(); //初始化lineChart
		initPieChart();  //初始饼图
		
		initDistributedPieChart();  //初始饼图
		
		//显示当前时间
		initTime();
		
		//重庆北站默认添加点击事件
		$("#titleBar").click(function(){
			defaultLoadCQB();
		});
		
		//轮播 四块覆盖物
		carouselFourPolygonCackground();
		
		//轮播 外省人数来源
		carouselSource();
		//轮播 滞留 分布
		carouselDistributed();
		
	}
	
	/***
	 * 查看历史
	 */
	function viewHistory(){
		window.open("/cqcm/cqb/historyLineChart.html?name="+selectObj.name);
	}