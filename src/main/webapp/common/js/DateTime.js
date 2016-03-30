function CurentTime()
{ 
    var now = new Date();
   
    var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();            //日
   
    var hh = now.getHours();            //时
    var mm = now.getMinutes();          //分
   
    var clock = year + "-";
   
    if(month < 10)
        clock += "0";
   
    clock += month + "-";
   
    if(day < 10)
        clock += "0";
       
    clock += day + " ";
    
    clock+= getWeek(now) +" ";
   
    if(hh < 10)
        clock += "0";
       
    clock += hh + ":";
    if (mm < 10) clock += '0'; 
    clock += mm; 
    return(clock); 
} 

function getDateWeekTime(){
	return getWeek()+"&nbsp;&nbsp;"+getHourMinute();
}

function getHourMinute(){
	var now = new Date();
	var hh = now.getHours();            //时
	var mm = now.getMinutes();          //分
	var clock="";
	if(hh < 10)
        clock += "0";
    clock += hh + ":";
    if (mm < 10) clock += '0'; 
    clock += mm; 
    return (clock);
}

function getWeek(){
	var tDate=new Date();
    var str = tDate.toLocaleDateString();  
    var Week = ['日','一','二','三','四','五','六'];  
    str += '&nbsp;&nbsp; 星期' + Week[tDate.getDay()];  
    return str;  
}


Date.prototype.format = function (fmt) { //author: meizz 
	//yyyy-MM-dd hh:mm:ss
	
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

/***
 * 供给折线图使用
 */
function parseDateTime(str){
	try{
		if(str!="")
		{
			//str.substr(6,2)+"号"+
			return parseInt(str.substr(6,2))+"日 "+str.substr(8,2)+":"+str.substr(10,2);
			
		}
	}catch(e){
		return str;
	}
	return str;
}

/***
 * 供给折线图使用 月
 */
function parseDateTimeByMonth(str){
	try{
		if(str!="")
		{
			return parseInt(str.substr(4,2))+"月 "+parseInt(str.substr(6,2))+"日 "+str.substr(8,2)+":"+str.substr(10,2);
			
		}
	}catch(e){
		return str;
	}
	return str;
}