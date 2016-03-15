//获取设置
function getSettings() {
	var settingsText = localStorage.getItem('$settings') || "{}";
	return JSON.parse(settingsText);

}
//设置
function setSettings(settings) {
	settings = settings || {};
	localStorage.setItem('$settings', JSON.stringify(settings));
}
//状态
function getState() {
	var stateText = localStorage.getItem('$state') || "{}";
	return JSON.parse(stateText);
}

function setState(state) {
	state = state || {};
	localStorage.setItem('$state', JSON.stringify(state));
}


 

function createState(user) {
	var state = getState();
	state.account = user.uid;
	state.nickname = user.nickname;
	state.avatar = user.avatar;
	state.token = user.token;
	state.userid=user.userid;
	state.grade=user.levelgrade;//级别
	//特殊的token特殊赋值
	plus.storage.setItem(_user_token, user.token);
	setState(state);
}


function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
}
//后一天
	function getNextDay(d){
        d = new Date(d);
        d = +d + 1000*60*60*24;
        d = new Date(d);
        return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
         
    }
	//前一天
	function getPreDay(d){
        d = new Date(d);
        d = -d + 1000*60*60*24;
        d = new Date(d);
        return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
       }
	//当天年月日
	function getday(d)
	{
		 d = new Date(d);
       // d = -d + 1000*60*60*24;
        d = new Date(d);
        return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
	}
         
//js日期比较(yyyy-mm-dd)
 function duibi(a, b) {
 	if(a=='') 
 	a=getPreDay(new Date());
    var arr = a.split("-");
    var starttime = new Date(arr[0], arr[1], arr[2]);
    var starttimes = starttime.getTime();

    var arrs = b.split("-");
    var lktime = new Date(arrs[0], arrs[1], arrs[2]);
    var lktimes = lktime.getTime();
    if (starttimes >= lktimes) {

       // alert('开始时间大于离开时间，请检查');
        return false;
    }
    else
        return true;

}