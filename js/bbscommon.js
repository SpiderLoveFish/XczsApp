var _baseUrl = "http://mb.xczs.co/webserver/bbsapi.asmx";
var _url="http://mb.xczs.co/";
//var _baseUrl = "http://localhost:8080";
var _user_token = "607b879cd56346358e8d17ada25a4f78";
var _user_nickname = "user_nickname";
var _tab_ = '_tab_';
var _topic_id = "topic_id";
var reply_weiba_active = 'reply_weiba_active';
var reply_weiba = "<br>来自手机客户端 <a target='_blank' href='http://xczs.co'>xczs_mobile</a>"
var countnotreadtime = 300000;

function topic_detail(tid) {
	plus.storage.setItem(_topic_id, tid);
	mui.openWindow({
		id: 'detail',
		url: 'topic-detail.html'
	});
}

function getTopicTab(_data) {
	var span_content;
	if ((_data.good == 1 && _data.t_top == 1) || (_data.good == 0 && _data.t_top == 1)) {
		span_content = "置顶";
	} else if (_data.t_top == 0 && _data.good == 1) {
		span_content = "精华";
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
