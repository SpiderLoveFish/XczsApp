

var _baseUrl = "http://mb.xczs.co/webserver/bbsapi.asmx";
var _url=getUrl()+'/' ;
//"http://mb.xczs.co/";
//var _baseUrl = "http://localhost:8080";
var _user_token = "_user_token";
var _user_nickname = "user_nickname";
var _tab_ = '_tab_';
var _topic_id = "topic_id";
var reply_weiba_active = 'reply_weiba_active';
var reply_weiba = '</br>来自手机客户端 <span style="color:green;">xczs_mobile</span>'
var countnotreadtime = 300000;

//状态
function getUrl() {
	setUrl("http://mb.xczs.co");
	var settingsText = localStorage.getItem('$lurdata') || "{}";
	if(settingsText=='{}')
	setUrl("http://mb.xczs.co");
	console.log(settingsText)
		return JSON.parse(settingsText);
}
function setUrl(state) {
	state = state || {};
		localStorage.setItem('$lurdata', JSON.stringify(state));
}

function topic_detail(tid) {
	console.log(tid)
	plus.storage.setItem(_topic_id, tid);
	mui.openWindow({
		id: 'detail',
		url: 'topic-detail.html'
	});
}

function getTopicTab(_data) {
	var span_content;
	if ((_data.good == 1 && _data.t_top == 1) || (_data.good == 0 && _data.t_top == 1)) {
		span_content = '<span style="color:red;">置顶</span>';
	} else if (_data.t_top == 0 && _data.good == 1) {
		span_content = '<span style="color:green;">精华</span>';;
	} else if (_data.t_top == 0 && _data.good == 0) {
		span_content = _data.sectionName;
	}
	return span_content;
}

function trim(str) {　　
	return str.replace(/(^\s*)|(\s*$)/g, "");　　
}

function isLogin() {
	var userToken = plus.storage.getItem(_user_token);
	if (userToken && userToken != "") {
		return true;
	} else {
		return false;
	}
}
  function   formatDate(dtt)   {  
  	if(dtt==""||dtt==undefined)
  	{
          var dt = new	Date(); 
        var   year=dt.getFullYear();       
        var   month=dt.getMonth()+1;       
        var   date=dt.getDate();       
        var   hour=dt.getHours();       
        var   minute=dt.getMinutes();       
        var   second=dt.getSeconds();      
    }
  	 else{
  	 	var Dtime = dtt;
          var dt = new Date(parseInt(Dtime.slice(6, 19)));
        var   year=dt.getFullYear();       
        var   month=dt.getMonth()+1;       
        var   date=dt.getDate();       
        var   hour=dt.getHours();       
        var   minute=dt.getMinutes();       
        var   second=dt.getSeconds();   
  	 	
  	 }
        return   year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;       
    }   

function myHTMLDeCode(str) {
    var s = "";
    if (str == null) return "";
    else
        if (str.length == 0) return "";
        else {
            s = str.replace(/&amp;/g, "&");
            s = s.replace(/&lt;/g, "<");
            s = s.replace(/&gt;/g, ">");
            //s = s.replace(/&nbsp;/g, " ");
            s = s.replace(/&#39;/g, "\'");
            s = s.replace(/&quot;/g, "\"");
            s = s.replace(/<br>/g, "\n");
            return s;
        }
}