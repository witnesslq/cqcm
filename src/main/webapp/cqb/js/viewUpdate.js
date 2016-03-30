/****
 * 更新界面显示数据
 * 
 * 
 * @author chen.yiwan
 */

/*******************************************************************************
 * 更新火车北站主信息 当前人数 及 图片 滞留人数 及 图片
 * 
 * @param json
 */
function updateMainInfo(json) {
	if (null == json) {
		$("#currPNum").html("0人");
		$("#waitPNum").html("0人");
		return;
	}
	$("#currPNum").html(
			typeof (json["channel_flow_current_count"]) == "undefined" ? "0人"
					: json["channel_flow_current_count"] + "人");
	$("#waitPNum").html(
			typeof (json["current_resident_user_count"]) == "undefined" ? "0人"
					: json["current_resident_user_count"] + "人");

	// 数据是否上升或下降
	/***************************************************************************
	 * if(1<2){ $("#currPNumImg").src="/cqcm/cqb/images/ico_06.png"; //下降
	 * }else{ $("#currPNumImg").src="/cqcm/cqb/images/ico_08.png"; //上升 }
	 * 
	 * if(1<2){ $("#waitPNumImg").src="/cqcm/cqb/images/ico_06.png"; //下降
	 * }else{ $("#waitPNumImg").src="/cqcm/cqb/images/ico_08.png"; //上升 }
	 **************************************************************************/
}

/*******************************************************************************
 * 更新右部中间区域数据 当前人数 及 图片 滞留人数 及 图片
 * 
 * @param json
 */
function updateRightInfo(json) {
	if (null == json) {
		$("#rightCurrPNum").html(0)
		$("#rightWaitPNum").html(0);
		return;
	}
	$("#rightCurrPNum").html(
			(typeof (json["channel_flow_current_count"]) == "undefined" ? "0"
					: json["channel_flow_current_count"]));
	$("#rightWaitPNum").html(
			(typeof (json["current_resident_user_count"]) == "undefined" ? "0"
					: json["current_resident_user_count"]));

	// 数据是否上升或下降
	/***************************************************************************
	 * if(1<2){ $("#rightCurrPImg").src="/cqcm/cqb/images/ico_06.png"; //下降
	 * }else{ $("#rightCurrPImg").src="/cqcm/cqb/images/ico_08.png"; //上升 }
	 * 
	 * if(1<2){ $("#rightWaitPImg").src="/cqcm/cqb/images/ico_06.png"; //下降
	 * }else{ $("#rightWaitPImg").src="/cqcm/cqb/images/ico_08.png"; //上升 }
	 **************************************************************************/

}

/*******************************************************************************
 * 更新滞留人数来源表格数据
 * 
 * @param json
 */
function updateRightTableInfo(json) {

	if (null == json) {
		$("#source0_2").html("0");
		$("#source0_2_pro").html("0");
		$("#source2_4").html("0");
		$("#source2_4_pro").html("0");
		$("#source4_8").html("0");
		$("#source4_8_pro").html("0");
		$("#source8_24").html("0");
		$("#source8_24_pro").html("0");
		$("#source24_").html("0");
		$("#source24_pro").html("0");

		return;
	}

	$("#source0_2").html(
			typeof (json["bt_le_2"]) == "undefined" ? "0" : json["bt_le_2"]);
	$("#source0_2_pro").html(
			typeof (json["bt_le_2_per"]) == "undefined" ? "0%"
					: parsePercent((json["bt_le_2_per"] + "")));

	$("#source2_4").html(
			typeof (json["bt_2_4"]) == "undefined" ? "0" : json["bt_2_4"]);
	$("#source2_4_pro").html(
			typeof (json["bt_2_4_per"]) == "undefined" ? "0%"
					: parsePercent((json["bt_2_4_per"] + "")));

	$("#source4_8").html(
			typeof (json["bt_4_8"]) == "undefined" ? "0" : json["bt_4_8"]);
	$("#source4_8_pro").html(
			typeof (json["bt_4_8_per"]) == "undefined" ? "0%"
					: parsePercent((json["bt_4_8_per"] + "")));

	$("#source8_24").html(
			typeof (json["bt_8_24"]) == "undefined" ? "0" : json["bt_8_24"]);
	$("#source8_24_pro").html(
			typeof (json["bt_8_24_per"]) == "undefined" ? "0%"
					: parsePercent((json["bt_8_24_per"] + "")));

	$("#source24_").html(
			typeof (json["bt_eg_24"]) == "undefined" ? "0" : json["bt_eg_24"]);
	$("#source24_pro").html(
			typeof (json["bt_eg_24_per"]) == "undefined" ? "0%"
					: parsePercent((json["bt_eg_24_per"] + "")));

	updateDistributedChart(json);
}

/*******************************************************************************
 * 更新昨日全天累计人数
 * 
 * @param json
 */
function updateRightBottomNum1(json) {
	if (null == json) {
		$("#num1").html("0");
		$("#time1").html("");
		return;
	}
	$("#num1").html(
			typeof (json["acc_user_count_sum"]) == "undefined" ? "0"
					: json["acc_user_count_sum"]);
	$("#time1").html(
			typeof (json["op_date"]) == "undefined" ? "" : json["op_date"]);
}

function updateRightBottomNum2(json) {
	if (null == json) {
		$("#num2").html("0");
		$("#time2").html("");
		return;
	}
	$("#num2").html(
			typeof (json["people_count"]) == "undefined" ? "0"
					: json["people_count"]);
	$("#time2").html(
			typeof (json["time_info"]) == "undefined" ? "" : json["time_info"]);
}

function updateRightBottomNum3(json) {
	if (null == json) {
		$("#num3").html("0");
		$("#time3").html("");
		return;
	}
	$("#num3").html(
			typeof (json["total_hist_count"]) == "undefined" ? "0"
					: json["total_hist_count"]);
	$("#time3").html(
			typeof (json["yes_tme_info"]) == "undefined" ? ""
					: json["yes_tme_info"]);

}

function updateRightBottomNum4(json) {
	if (null == json) {
		$("#num4").html("0");
		$("#time4").html("");
		return;
	}
	$("#num4").html(
			typeof (json["max_user_count_mon"]) == "undefined" ? "0"
					: json["max_user_count_mon"]);
	$("#time4").html(
			typeof (json["tminfo"]) == "undefined" ? "" : json["tminfo"]);
}

/*******************************************************************************
 * 生成lineChart数据
 * 
 * @param json
 */
function getLineChartOption(json) {
	//json=$.parseJSON(testJson);
	
	if (null == json) {
		lineChart.clear();
		return;
	}
	var name = selectObj.name;
	var channel_name = "";
	for ( var i = 0; i < channelArray.length; i++) {
		if (channelArray[i].name == name) {
			channel_name = channelArray[i].channel_name;
			break;
		}
	}

	var data1, data2, data3;
	data1 = new Array();
	data2 = new Array();
	data3 = new Array();

	for ( var i = 0; i < json.length; i++) {
		data1.push(typeof (json[i].op_time) == "undefined" ? ""
				: parseDateTime(json[i].op_time));
		data2.push(typeof (json[i].current_people_count) == "undefined" ? "0"
				: json[i].current_people_count);
		data3.push(typeof (json[i].current_resident_user_count) == "undefined" ? "0"
						: json[i].current_resident_user_count);
	}

	var option = {
		title : {
			text : channel_name
		},
		tooltip : {
			trigger : 'axis'
		},
		color : [ '#00a0e9', '#ff00ff' ],
		legend : {
			data : [ '当前总人数', '滞留人数' ]
		},
		grid : {
			left : '5%',
			right : '5%',
			bottom : '20%',
			containLabel : true
		},
		xAxis : [ {
			type : 'category',
			boundaryGap : false,
			data : data1,
			axisLabel : {
				rotate : 90,
				interval : 4,
				margin : 5,
				textStyle : {
					fontSize : 12
				}
			}
		} ],
		yAxis : [ {
			type : 'value',
			axisLabel : {
				formatter : '{value}'
			}
		} ],
		series : [ {
			name : '当前总人数',
			type : 'line',
			itemStyle : {
				normal : {
					lineStyle : {
						width : 1
					}
				}
			},markPoint : {
                data : [
                        {type : 'max', name: '最大值'},
                        {type : 'min', name: '最小值'}
                    ]
                },
			data : data2
		}, {
			name : '滞留人数',
			type : 'line',
			itemStyle : {
				normal : {
					lineStyle : {
						width : 1
					}
				}
			},markPoint : {
                data : [
                        {type : 'max', name: '最大值'},
                        {type : 'min', name: '最小值'}
                    ]
                },
			data : data3
		} ]
	};

	return option;
}

/*******************************************************************************
 * 生成PieChart数据
 * 
 * @param json
 */
function getPieChartOption(json) {
	if (null == json) {
		pieChart.clear();
		return;
	}
	var data = new Array();
	for ( var i = 0; i < json.length; i++) {
		data.push({
			//百分比使用echart自动算
			value :typeof(json[i]["total_coun"])=="undefined"?0:json[i]["total_coun"],
			name : json[i]["province_name"]
		});
	}
	var option = {
		tooltip : {
			trigger : 'item',
			formatter : "{a} <br/>{b} : {c}  ({d}%)"
		},
		color : [ '#0CACFF', '#FFD200', '#FF9B00', '#FF00DE', '#04E46B',
				'#FF0000' ],
		series : [ {
			name : '滞留人数来源',
			type : 'pie',
			radius : '50%',
			center : [ '50%', '50%' ],
			// roseType: 'angle',
			labelLine : {
				normal : {
					smooth : 0.2,
					length : 2,
					length2 : 2
				}
			},
			data : data
		} ]
	};
	return option;
}

// 转换百分比
function parsePercent(str) {
	var p = (parseFloat(str) * 100) + "";
	p = p.substr(0, p.indexOf(".") + 3) + "%";
	return p;
}

// 转换百分比不要百分号
function parsePercentNoSymbol(str) {
	var p = (parseFloat(str) * 100) + "";
	p = p.substr(0, p.indexOf(".") + 3);
	return p;
}

/*******************************************************************************
 * 生成DistributedPieChart数据
 * 
 * @param json
 */
function getDistributedPieChartOption(json) {

	if (null == json) {
		disPieChart.clear();
		return;
	}
	var data2 = new Array();

	var value1 = typeof (json["bt_le_2_per"]) == "undefined" ? 0
			: parsePercentNoSymbol((json["bt_le_2_per"] + ""));
	data2.push({
		value : value1,
		name : "0-2小时"
	});

	var value2 = typeof (json["bt_2_4_per"]) == "undefined" ? 0
			: parsePercentNoSymbol((json["bt_2_4_per"] + ""));
	data2.push({
		value : value2,
		name : "2-4小时"
	});

	var value3 = typeof (json["bt_4_8_per"]) == "undefined" ? 0
			: parsePercentNoSymbol((json["bt_4_8_per"] + ""));
	data2.push({
		value : value3,
		name : "4-8小时"
	});

	var value4 = typeof (json["bt_8_24_per"]) == "undefined" ? 0
			: parsePercentNoSymbol((json["bt_8_24_per"] + ""));
	data2.push({
		value : value4,
		name : "8-24 小时"
	});

	var value5 = typeof (json["bt_eg_24_per"]) == "undefined" ? 0
			: parsePercentNoSymbol((json["bt_eg_24_per"] + ""));
	data2.push({
		value : value5,
		name : "24小时以上"
	});

	var option = {
		tooltip : {
			trigger : 'item',
			formatter : "{a} <br/>{b}: {d}%"
		},
		color : [ '#0CACFF', '#FFD200', '#FF9B00', '#FF00DE', '#04E46B',
				'#FF0000' ],
		series : [ {
			name : '滞留人数分布',
			type : 'pie',
			radius : [ '0%', '50%' ],
			center : [ '50%', '50%' ],
			roseType : 'angle',
			labelLine : {
				normal : {
					smooth : 0.2,
					length : 2,
					length2 : 2
				}
			},
			data : data2
		} ]
	};
	return option;
}

/***
 * 更新外省漫游人数来源表格数据
 * @param json
 */
function updateSourceTableProvince(json){
	if (null == json) {
		
		for ( var i = 0; i < 5; i++) {
			$("#sourceRow"+(i+1)+"Col0").html("");
			$("#sourceRow"+(i+1)+"Col1").html("");
			$("#sourceRow"+(i+1)+"Col2").html("");
		}
		
		return;
	}
	var data = new Array();
	for ( var i = 0; i < json.length; i++) {
		
		var percents =(typeof(json[i]["per"])=="undefined"?"0":json[i]["per"])+"%";
		var count=typeof(json[i]["total_coun"])=="undefined"?0:json[i]["total_coun"];
		var province_name=typeof(json[i]["province_name"])=="undefined"?0:json[i]["province_name"];
		
		$("#sourceRow"+(i+1)+"Col0").html(province_name);
		$("#sourceRow"+(i+1)+"Col1").html(count);
		$("#sourceRow"+(i+1)+"Col2").html(percents);
	}
}



function updatePieChart(json) {
	updateSourceTableProvince(json)
	pieChart.setOption(getPieChartOption(json));
}

function updateLineChart(json) {
	lineChart.setOption(getLineChartOption(json));

	/***************************************************************************
	 * //启动动态数据折线 if(null!=lineChartDynamicInterval){
	 * clearInterval(lineChartDynamicInterval); } setTimeout(function(){
	 * startInterval(); },1000*10);
	 **************************************************************************/
}

function updateDistributedChart(json) {
	disPieChart.setOption(getDistributedPieChartOption(json));
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/***
 * 后台数据获取 
 * @author:chen.yiwan 
 */
function loadData(){
	
	queryOne({sqlid:'BaseDataMapper.CURRENT_RESIDENT',channel_id:'457113547'},updateMainInfo);  //火车北站当前人数和滞留人数
	
	
	//更新四块覆盖物信息显示
	//龙头寺
	queryOne({sqlid:'BaseDataMapper.CURRENT_RESIDENT',channel_id:'460940273'},function(json){
		if(null==json)
		{
			tipArray[0].tip.setDetailInfo("当前人数：0人<br/>滞留人数：0人");
			return false;
		}
		tipArray[0].tip.setDetailInfo("当前人数："+(typeof(json["channel_flow_current_count"])=="undefined"?"0":json["channel_flow_current_count"])+"人<br/>滞留人数："+(typeof(json["current_resident_user_count"])=="undefined"?"0":json["current_resident_user_count"])+"人");
	}); 
	
	//北广场
	queryOne({sqlid:'BaseDataMapper.CURRENT_RESIDENT',channel_id:'460942880'},function(json){
		if(null==json)
		{
			tipArray[1].tip.setDetailInfo("当前人数：0人<br/>滞留人数：0人");
			return false;
		}
		tipArray[1].tip.setDetailInfo("当前人数："+(typeof(json["channel_flow_current_count"])=="undefined"?"0":json["channel_flow_current_count"])+"人<br/>滞留人数："+(typeof(json["current_resident_user_count"])=="undefined"?"0":json["current_resident_user_count"])+"人");
	}); 
	
	//站内
	queryOne({sqlid:'BaseDataMapper.CURRENT_RESIDENT',channel_id:'460941813'},function(json){
		if(null==json)
		{
			tipArray[2].tip.setDetailInfo("当前人数：0人<br/>滞留人数：0人");
			return false;
		}
		tipArray[2].tip.setDetailInfo("当前人数："+(typeof(json["channel_flow_current_count"])=="undefined"?"0":json["channel_flow_current_count"])+"人<br/>滞留人数："+(typeof(json["current_resident_user_count"])=="undefined"?"0":json["current_resident_user_count"])+"人");
	}); 
	
	//南广场
	queryOne({sqlid:'BaseDataMapper.CURRENT_RESIDENT',channel_id:'460941043'},function(json){
		if(null==json)
		{
			tipArray[3].tip.setDetailInfo("当前人数：0人<br/>滞留人数：0人");
			return false;
		}
		tipArray[3].tip.setDetailInfo("当前人数："+(typeof(json["channel_flow_current_count"])=="undefined"?"0":json["channel_flow_current_count"])+"人<br/>滞留人数："+(typeof(json["current_resident_user_count"])=="undefined"?"0":json["current_resident_user_count"])+"人");
	}); 
	
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*******************************************************************************
 * 图层所有数据更新
 * 
 */
function updateLayer(selectObj) {

	var name = selectObj.name;

	var channel_id = "";
	for ( var i = 0; i < channelArray.length; i++) {
		if (channelArray[i].name == name) {
			channel_id = channelArray[i].channel_id;
			break;
		}
	}
	if (channel_id == "") {
		channel_id = cqb_channel_id;
	}

	// 获取指定chanel_id对应的数据
	// 更新折线图
	queryList({
		sqlid : 'BaseDataMapper.CURRENT_RESIDENT_LINECHART',
		channel_id : channel_id
	}, updateLineChart);
	
	// 更新层中间显示的当前人数和滞留人数
	queryOne({
		sqlid : 'BaseDataMapper.CURRENT_RESIDENT',
		channel_id : channel_id
	}, updateRightInfo);
	
	// 更新饼图
	queryList({
		sqlid : 'BaseDataMapper.DELAY_SOURCE',
		channel_id : channel_id
	}, updatePieChart);
	
	// 更新分布表格
	queryOne({
		sqlid : 'BaseDataMapper.DELAY_DISTRIBUTED',
		channel_id : channel_id
	}, updateRightTableInfo);
	
	// 昨日全天累计人数
	queryOne({
		sqlid : 'BaseDataMapper.YESTERDAY_MAX_PEOPLE_COUNT',
		channel_id : channel_id
	}, updateRightBottomNum1);
	// 历史最高人数及时间
	queryOne({
		sqlid : 'BaseDataMapper.HIS_MAX_PEOPLO_COUNT',
		channel_id : channel_id
	}, updateRightBottomNum2);

	/**
	 * //昨日滞留人数峰值 及时间
	 * queryOne({sqlid:'BaseDataMapper.YESTERDAY_RESIDENT_MAX_PEOPLO_COUNT',channel_id:channel_id},updateRightBottomNum3);
	 */
	// 历史滞留人数峰值 及时间
	queryOne({
		sqlid : 'BaseDataMapper.HIS_RESIDENT_MAX_PEOPLO_COUNT',
		channel_id : channel_id
	}, updateRightBottomNum4);

}

/**
 * 启动动态数据折线图
 */
function startInterval() {
	lineChartDynamicInterval = setInterval(function() {
		// 动态数据接口 addData
		var data1 = new Array();
		var data2 = new Array();
		var data3 = new Array();

		data1.push(getHourMinute() + ":" + new Date().getSeconds()); // x轴标签
		data2.push((Math.random() * 200 * Math.random() * 20).toFixed(1)); // 今日人数
		data3.push((Math.random() * 150 * Math.random() * 3).toFixed(1)); // 滞留人数

		lineChart.addData([ [ 0, // 系列索引
		data2, true, // 新增数据是否从队列头部插入
		true // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
		], [ 1, // 系列索引
		data3, // 新增数据
		true, // 新增数据是否从队列头部插入
		true, // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
		data1 // 坐标轴标签
		] ]);
	}, 1000 * 5);
}


/**
 * 默认加载重庆北
 */
function defaultLoadCQB(){
	$("#layer").show("slow");
	selectObj={name:"cqb",polygon:null};
	updateLayer(selectObj);
}


$(document).ready(function(){
	initView();
	//加载界面数据
	loadData();
	
	//默认加载重庆北站
	defaultLoadCQB();
	
	//更新数据
	setInterval(function(){
		loadData();
		if($("#layer").css("display")=="block"){
			updateLayer(selectObj);
		}
	},1000*60*10);
});