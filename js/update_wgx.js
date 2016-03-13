 // 
 //  update_wgx.js
 //  <project>
 //  
 //  Created by spider on 2016-01-21.
 //  Copyright 2016 spider. All rights reserved.
 // 
 
(function(w){
var server="";
var wgtVer=null;
 
function plusReady(){
    // ......
    // 获取本地应用资源版本号
    plus.runtime.getProperty(plus.runtime.appid,function(inf){
        wgtVer=inf.version;
        console.log("当前应用版本："+wgtVer);
       checkUpdate(); 
          
       
    });
}
if(window.plus){
    plusReady();
}else{
    document.addEventListener('plusready',plusReady,false);
}
// 检测更新
var checkUrl="http://demo.dcloud.net.cn/test/update/check.php";
function checkUpdate(){
    plus.nativeUI.showWaiting("检测更新...");
    var xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        switch(xhr.readyState){
            case 4:
            plus.nativeUI.closeWaiting();
            if(xhr.status==200){
                console.log("检测更新成功："+xhr.responseText);
                var newVer=xhr.responseText;
                if(wgtVer&&newVer&&(wgtVer!=newVer)){                   
                 console.log('aa')  				// 提示用户是否升级
			// 提示用户是否升级
			plus.nativeUI.confirm( wgtVer+'更新为'+newVer, function(i){
				if ( 0==i.index ) {
					downWgt(); 
				} else if ( 1==i.index ) {
					  return; 
				} else {
				  return; 
				}
			}, '是否升级', ["立即更新","跳过此版本","取　　消"] );  
                }else{
                    plus.nativeUI.alert("无新版本可更新！");
                }
            }else{
                console.log("检测更新失败！");
                plus.nativeUI.alert("检测更新失败！");
            }
            break;
            default:
            break;
        }
    }
    xhr.open('GET',checkUrl);
    xhr.send();
}

// 下载wgt文件
var wgtUrl="http://www.xczs.co/m/H5E60632F.wgt.zip";
//"http://demo.dcloud.net.cn/test/update/H5EF3C469.wgt";
function downWgt(){
    plus.nativeUI.showWaiting("下载更新文件...");
    plus.downloader.createDownload( wgtUrl, {}, function(d,status){
        if ( status == 200 ) { 
            console.log("下载更新文件成功："+d.filename);
            
            installWgt(d.filename); // 安装wgt包
        } else {
            console.log(status+"下载wgt失败！");
            plus.nativeUI.alert("下载wgt失败！");
        }
        plus.nativeUI.closeWaiting();
    }).start();
}
// 更新应用资源
function installWgt(path){
    plus.nativeUI.showWaiting("安装wgt文件...");
    plus.runtime.install(path,{},function(){
        plus.nativeUI.closeWaiting();
        console.log("安装wgt文件成功！");
        plus.nativeUI.alert("应用资源更新完成！",function(){
            plus.runtime.restart();
        });
    },function(e){
        plus.nativeUI.closeWaiting();
        console.log("安装wgt文件失败["+e.code+"]："+e.message);
        plus.nativeUI.alert("安装wgt文件失败["+e.code+"]："+e.message);
    });
}
})(window);