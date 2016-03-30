
/****
 * 公共配置
 * @author Chen.yiwan
 */
var Common={
		web_protocol:'http://',
		web_ip:'localhost',
		web_port:80,
		web_context:'/cqcm/h5intf/json_intf/',
		getServiceWebPath:function(){
		   return this.web_protocol+this.web_ip+":"+this.web_port+this.web_context;
		},
		
		/***
		 * 公共ajax查询
		 * @param paraObj
		 * @author Chen.yiwan
		 */
		query:function(paraObj){
            var opts = $.extend({
                url: Common.getServiceWebPath()+paraObj.method,
                type: 'get',
                dataType: 'json'
            }, paraObj);
            
            var callTime = new Date().getTime();
           
            //辅助请求参数，避免缓存
            opts.data["rand"]=Math.random();
            opts.data["dateTime"]=new Date().getTime();
            
            $.ajax({
                url: opts.url,
                type:opts.type,
                dataType:opts.dataType,
                data: opts.data,
                timeout: 180000, //30秒超时
                success:opts.success,
                error: function(err){
                    console.log("服务调用出错" + callTime, err);
                }
            });
        }
}

/////////////////////////////////////////////////////////////////////////////////////////////
/***
 * 获取HTML地址栏参数
 * @param name
 * @returns {String}
 */
function getParameter(name) {  
    var url = document.location.href;  
    var start = url.indexOf("?")+1;  
    if (start==0) {  
        return "";  
    }  
    var value = "";  
    var queryString = url.substring(start);  
    var paraNames = queryString.split("&");  
    for (var i=0; i<paraNames.length; i++) {  
        if (name==getParameterName(paraNames[i])) {  
            value = getParameterValue(paraNames[i])  
        }  
    }  
    return value;  
}  

function getParameterName(str) {  
    var start = str.indexOf("=");  
    if (start==-1) {  
        return str;  
    }  
    return str.substring(0,start);  
}  
  
function getParameterValue(str) {  
    var start = str.indexOf("=");  
    if (start==-1) {  
        return "";  
    }  
    return str.substring(start+1);  
}  

/////////////////////////////////////////////////////////////////////////////////////////////
/***
 * 查询单行返回
 * @param opts
 * @param fun
 */
function queryOne(opts,fun){
	//请求的参数
	var data={
		
	};
	
	data=$.extend(data,opts);
	
	Common.query({
		method:'getOne', 
        data:data,
        success: function(data){
           fun(data.data);
        }
	});
}

/***
 * 查询列表
 * @param opts
 * @param fun
 */
function queryList(opts,fun){
	//请求的参数
	var data={
		
	};
	
	data=$.extend(data,opts);
	
	Common.query({
		method:'getList', 
        data:data,
        success: function(data){
           fun(data.data);
        }
	});
}

///////////////////////////////////////////////////////////////////////////////////////////////
//测试json数据

var testJson='[{"current_resident_user_count":2006,"current_people_count":44940},{"current_resident_user_count":5366,"op_time":"2016020118"},{"current_resident_user_count":20466,"op_time":"2016020117"},{"current_resident_user_count":21315,"op_time":"2016020116"},{"current_resident_user_count":27297,"op_time":"2016020115"},{"current_resident_user_count":25479,"op_time":"2016020114"},{"current_resident_user_count":21348,"op_time":"2016020113"},{"current_resident_user_count":14066,"op_time":"2016020112"},{"current_resident_user_count":18384,"op_time":"2016020111"},{"current_resident_user_count":23742,"op_time":"2016020110"},{"current_resident_user_count":20983,"op_time":"2016020109"},{"current_resident_user_count":20734,"op_time":"2016020108"},{"current_resident_user_count":21014,"op_time":"2016020107"},{"current_resident_user_count":14663,"op_time":"2016020106"},{"current_resident_user_count":6886,"op_time":"2016020105"},{"current_resident_user_count":5555,"op_time":"2016020104"},{"current_resident_user_count":5269,"op_time":"2016020103"},{"current_resident_user_count":4825,"op_time":"2016020102"},{"current_resident_user_count":5234,"op_time":"2016020101"},{"current_resident_user_count":5854,"op_time":"2016020100"},{"current_resident_user_count":12879,"op_time":"2016013123"},{"current_resident_user_count":15352,"op_time":"2016013122"},{"current_resident_user_count":17990,"op_time":"2016013121"},{"current_resident_user_count":18684,"op_time":"2016013120"},{"current_resident_user_count":18723,"op_time":"2016013119"},{"current_resident_user_count":20344,"op_time":"2016013118"},{"current_resident_user_count":19646,"op_time":"2016013117"},{"current_resident_user_count":15434,"op_time":"2016013116"},{"current_resident_user_count":25496,"op_time":"2016013115"},{"current_resident_user_count":16120,"op_time":"2016013114"},{"current_resident_user_count":17716,"op_time":"2016013113"},{"current_resident_user_count":19440,"op_time":"2016013112"},{"current_resident_user_count":18559,"op_time":"2016013111"},{"current_resident_user_count":23080,"op_time":"2016013110"},{"current_resident_user_count":21632,"op_time":"2016013109"},{"current_resident_user_count":18104,"op_time":"2016013108"},{"current_resident_user_count":18135,"op_time":"2016013107"},{"current_resident_user_count":14144,"op_time":"2016013106"},{"current_resident_user_count":6309,"op_time":"2016013105"},{"current_resident_user_count":5370,"op_time":"2016013104"},{"current_resident_user_count":5321,"op_time":"2016013103"},{"current_resident_user_count":5020,"op_time":"2016013102"},{"current_resident_user_count":5007,"op_time":"2016013101"},{"current_resident_user_count":5351,"op_time":"2016013100"},{"current_resident_user_count":10165,"op_time":"2016013023"},{"current_resident_user_count":14321,"op_time":"2016013022"},{"current_resident_user_count":15884,"op_time":"2016013021"},{"current_resident_user_count":13398,"op_time":"2016013020"},{"current_resident_user_count":12764,"op_time":"2016013019"},{"current_resident_user_count":13293,"op_time":"2016013018"},{"current_resident_user_count":16864,"op_time":"2016013017"},{"current_resident_user_count":17134,"op_time":"2016013016"},{"current_resident_user_count":16767,"op_time":"2016013015"},{"current_resident_user_count":19961,"op_time":"2016013014"},{"current_resident_user_count":16448,"op_time":"2016013013"},{"current_resident_user_count":21458,"op_time":"2016013012"},{"current_resident_user_count":5211,"op_time":"2016013011"},{"current_resident_user_count":17502,"op_time":"2016013010"},{"current_resident_user_count":20101,"op_time":"2016013009"},{"current_resident_user_count":19259,"op_time":"2016013008"},{"current_resident_user_count":15982,"op_time":"2016013007"},{"current_resident_user_count":10906,"op_time":"2016013006"},{"current_resident_user_count":3905,"op_time":"2016013005"},{"current_resident_user_count":2677,"op_time":"2016013004"},{"current_resident_user_count":744,"op_time":"2016013003"},{"current_resident_user_count":634,"op_time":"2016013002"},{"current_resident_user_count":664,"op_time":"2016013001"},{"current_resident_user_count":1010,"op_time":"2016013000"},{"current_resident_user_count":1169,"op_time":"2016012922"},{"current_resident_user_count":1268,"op_time":"2016012919"},{"current_resident_user_count":824,"op_time":"2016012910"},{"current_resident_user_count":262,"op_time":"2016012909"},{"current_resident_user_count":873,"op_time":"2016012908"},{"current_resident_user_count":322,"op_time":"2016012907"},{"current_resident_user_count":221,"op_time":"2016012901"},{"current_resident_user_count":244,"op_time":"2016012900"},{"current_resident_user_count":1340,"op_time":"2016012816"},{"current_resident_user_count":1199,"op_time":"2016012814"},{"current_resident_user_count":2008,"op_time":"2016012810"},{"current_resident_user_count":2382,"op_time":"2016012809"},{"current_resident_user_count":2993,"op_time":"2016012808"},{"current_resident_user_count":2826,"op_time":"2016012807"},{"current_resident_user_count":2090,"op_time":"2016012806"},{"current_resident_user_count":781,"op_time":"2016012805"},{"current_resident_user_count":662,"op_time":"2016012804"},{"current_resident_user_count":475,"op_time":"2016012803"},{"current_resident_user_count":637,"op_time":"2016012802"},{"current_resident_user_count":374,"op_time":"2016012801"},{"current_resident_user_count":644,"op_time":"2016012800"},{"current_resident_user_count":1526,"op_time":"2016012723"},{"current_resident_user_count":2199,"op_time":"2016012722"},{"current_resident_user_count":3299,"op_time":"2016012721"},{"current_resident_user_count":2580,"op_time":"2016012720"},{"current_resident_user_count":978,"op_time":"2016012717"},{"current_resident_user_count":1980,"op_time":"2016012716"},{"current_resident_user_count":1338,"op_time":"2016012713"}]';
