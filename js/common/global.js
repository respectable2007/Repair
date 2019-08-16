/**
 * 公共信息
 * 公共方法
 */
(function($, owner){
  /**
   * 根据id获取dom节点
   * @param {Object} id
   */
  owner.id = function(id) {
  	return document.getElementById(id);
  }
  /**
   * 退出登录
   */
  owner.logout = function() {
  	localStorage.removeItem('$loginstate');
  	mui.plusReady(function(){
  	  plus.runtime.restart();
  	})
  }
  /*
   * 获取本地存储值
   */
  owner.getItem = function(key) {
  	var jsonStr = window.localStorage.getItem(key.toString());
  	return jsonStr ? JSON.parse(jsonStr).data: null;
  }
  /**
   * 设置本地存储值
   * @param {Object} id
   */
  owner.setItem = function(key, value) {
  	value = JSON.stringify({
  	  data: value
  	})
  	window.localStorage.setItem(key.toString(), value);
  }
  /**
   * 设置菜单
   * @param {Object} id
   */
  owner.setMenu = function(m){
  	m = JSON.stringify({
  	  data: m
  	})
  	plus.storage.setItem('$menu', m);
  }
  /**
   * 获取菜单
   * @param {Object} id
   */
  owner.getMenus = function(){
  	var jsonStr = plus.storage.getItem('$menu');
  	return jsonStr ? JSON.parse(jsonStr).data: null;
  }
  /**
   * 封装ajax
   * @param {Object} id
   */
  owner.ajax = function(url, json) {
  	if(typeof json.type == undefined) {
  	  json.type = 'post';
  	}
  	var _uuid = config.uuid;
  	mui.ajax(url, {
  	  async: json.async || true,
  	  data: json.data,
  	  dataType: 'json',
  	  type: json.type,
  	  timeout: 20000,
  	  headers: {
  	  	'Content-Type': 'application/json;charset=utf-8',
  	  	'USER_APP_ID': _uuid
  	  },
  	  beforeSend:function(){
  	  	if(json.mask){
  	  		json.mask.show();
  	  	}
  	  },
  	  complete: function(){
  	  	if(json.nwaiting){
  	  	  json.nwaiting.close();
  	  	  g.closeWaiting();
  	  	}
  	  	if(!json.isShowing){
  	  	  g.closeWaiting()
  	  	}
  	  	if(json.mask) {
  	  	  json.mask.close();
  	  	}
  	  },
  	  success: json.success,
  	  error: function(xhr,type,errorThrown) {
  	  	var btn = document.getElementById('btnSumit');
  	  	if(btn) {
  	  	  btn.disabled = false;
  	  	}
  	  	if(json.nwaiting) {
  	  		json.nwaiting.close();
  	  	}
  	  	if(json.error) {
  	  		json.error();
  	  		if(g.getNetStatus()==false) {
  	  		  mui.toast('网路异常，请稍后再试');
  	  		  return;
  	  		}
  	  	}
  	  	if(!g.getNetStatus()) {
  	  	  return;
  	  	}
  	  	var _msg = '';
  	  	try{
  	  	 if(xhr.response != null && JSON.parse(xhr.response)!= null){
  	  	   _msg = JSON.parse(xhr.response).Message;
  	  	 }
  	  	}catch(e){
  	  	 	mui.toast(e);
  	  	}
  	  	if(xhr.status == 400) {
  	  	  mui.toast(_msg);
  	  	}
  	  	if(_msg == '用户无效'){
  	  	  g.logout();
  	  	}
  	  }
  	})
  }
  
  owner.getCount = function(list , fn){
    if(config.isMock){
      var _database = new smpWebSql();
      _database.counts('tb_repairbill_g', "where STATE<>'E", function(res){
      	var data = {
  	      "StatusCode": 200,
	      "Message": null,
	      "Data": {
	        "cCount": 0,
	        "mCount": 0,
	        "rCount": 2,
	        "allCount": 0 + 0 + res,
	        "cRob": false,
	        "mRob": false,
	        "rRob": true
	      }
      	}
      	if(data.StatusCode === 200) {
	  	  	for(var i = 0; i < list.length; i++) {
	  	  	  if(list[i].name === TaskType.repair.value){
	  	  	  	list[i].taskNum = data.Data.rCount;
	  	  	  	list[i].rad = data.Data.rRob;
	  	  	  }else if(list[i].name === TaskType.polling.value){
	  	  	  	list[i].taskNum = data.Data.cCount;
	  	  	  	list[i].rad = data.Data.cRob;
	  	  	  }else if(list[i].name === TaskType.maintain.value){
	  	  	  	list[i].taskNum = data.Data.mCount;
	  	  	  	list[i].rad = data.Data.mRob;
	  	  	  }
	  	  	}
	  	  	localStorage.setItem('$EXE_COUNT', data.Data);
	  	  	if(fn){
	  	  	  fn(data.Data.allCount);
	  	  	}
	  	  return list;
	  	}else{
	  	  mui.toast(data.Message)
	  	}
      })
    }else{
      g.ajax(config.BillWorkbench,{
      	data: {
      	  orgCode: config.ORG_CODE,
      	  userId: config.USER_ID
      	},
      	success: function(data){
      	  if(data.StatusCode === 200) {
      	  	for(var i = 0; i < list.length; i++) {
      	  	  if(list[i].name === TaskType.repair.value){
      	  	  	list[i].taskNum = data.Data.rCount;
      	  	  	list[i].rad = data.Data.rRob;
      	  	  }else if(list[i].name === TaskType.polling.value){
      	  	  	list[i].taskNum = data.Data.cCount;
      	  	  	list[i].rad = data.Data.cRob;
      	  	  }else if(list[i].name === TaskType.maintain.value){
      	  	  	list[i].taskNum = data.Data.mCount;
      	  	  	list[i].rad = data.Data.mRob;
      	  	  }
      	  	}
      	  	localStorage.setItem('$EXE_COUNT', data.Data);
      	  	if(fn){
      	  	  fn(data.Data.allCount);
      	  	}
      	  	return list;
      	  }else{
      	  	mui.toast(data.Message)
      	  }
      	},
      	error: function(e){
      	  if(fn) {
      	  	fn()
      	  }
      	}
      })
    }
  }
  
  
  /*
   * 获取网络状态
   */
  owner.getNetStatus = function() {
  	if(window.plus){
  	  var ret = true,
  	      nt = plus.networkinfo.getCurrentType();
  	  switch(nt) {
  	  	case plus.networkinfo.CONNECTION_ETHERNET:
  	  	case plus.networkinfo.CONNECTION_WIFI:
  	  	  net = true;
  	  	  break;
  	  	case plus.networkinfo.CONNECTION_CELL2G:
  	  	case plus.networkinfo.CONNECTION_CELL3G:
  	  	case plus.networkinfo.CONNECTION_CELL4G:
  	  	  ret = true;
  	  	  break;
  	  	default:
  	  	  ret = false;
  	  	  break;
  	  	return ret;
  	  }
  	} else {
  	  return false;
  	}
  }

  /*
   * 关闭等待框
   */
  owner.closeWaiting = function() {
  	mui.plusReady(function(){
  	  plus.nativeUI.closeWaiting();
  	})
  }
   
   /*
    * 简单封装绘制原生view控件的方法
    * 绘制内容支持font（文本，字体图标），图片img，矩形区域rect
    */
  owner.drawNative = function(id, styles, tags) {
  	return new plus.nativeObj.View(id, styles, tags);
  }
  
  /*
   * 打开新页面
   */
  owner.openWindow = function(jsonData) {
    mui.openWindow({
      url:jsonData.url,
      id:jsonData.id,
      extras: jsonData.extras || {},
      styles: jsonData.styles || {},
      show: jsonData.show || {},
      waiting: jsonData.waiting || {}
    })
  }
  owner.openWindowWithTitle = function(webviewOptions, title) {
  	webviewOptions.styles = {
  	  titleNView: {
  	  	titleText: title,
  	  	titleColor: '#fff',
  	  	titleSize: '17px',
  	  	backgroundColor: '#449DED',
  	  	progress: {
  	  	  color: '#56CF87',
  	  	  height: '2px'
  	  	},
  	  	splitLine: {
  	  	  color: '#ccc',
  	  	  height: '0'
  	  	},
  	  	autoBackButton:true
  	  }
  	};
  	mui.openWindowWithTitle(webviewOptions)
  }
}(mui, window.g = window.g || {}));
/**
 * ------------------------------------------------菜单权限----------------------------------------
 */
var defaultInfo = '监控运行状态';
(function (m) {
    function getSmpMenus() {
        return g.getMenus() == '{}' ? {} : g.getMenus(); //GloabMenus
    }
    //获取一级菜单
    m.getFrstLevelMenus = function () {
        ////console.log('获取一级菜单')
        var smpMenus = getSmpMenus();
        //console.log(JSON.stringify(smpMenus[0]))
        if (smpMenus == undefined || smpMenus == null || smpMenus[0] == {}) {
            localStorage.removeItem('$loginstate');
            mui.openWindow({
                id: 'login',
                url: 'login.html'
            })
            return;
        }
        if (config.isTest) {
            var frstLevelMenus = [];
            var length = smpMenus.length;
            if (length > 0) {
                var _menu = null;
                for (var i = 0; i < length; i++) {
                    var temp = {};
                    _menu = smpMenus[i];
                    temp.id = _menu.id;
                    temp.icon = _menu.icon;
                    temp.title = _menu.title;
                    temp.url = _menu.url;
                    frstLevelMenus.push(temp);
                }
            }
            return frstLevelMenus;
        }
        var frstLevelMenus = [];
        ////console.log(JSON.stringify(smpMenus))
        var length = smpMenus.length;
        ////console.log('一级菜单长度:' + length)
        if (length > 0) {
            var _menu = {};
            for (var i = 0; i < length; i++) {
                _menu = smpMenus[i];
                ////console.log('LEVEL:' + _menu.LEVEL)
                if (_menu.LEVEL == 1) {
                    var temp = {};
                    temp.id = _menu.URIGHT_ID;
                    temp.icon = _menu.ICON;
                    temp.title = _menu.URIGHT_NAME;
                    temp.url = _menu.FUNC;
                    temp.name = _menu.MODULE_NAME;
                    frstLevelMenus.push(temp);
                }
            }
        }
        ////console.log('一级菜单：' + JSON.stringify(frstLevelMenus))
        return frstLevelMenus;
    };
    //获取二级菜单
    m.getTwoLevelMenus = function (id) {
        var smpMenus = getSmpMenus();
        if (config.isTest) {
            var twoLevelMenus = [];
            var length = smpMenus.length;
            if (length > 0) {
                var _menu = null;
                for (var i = 0; i < length; i++) {
                    _menu = smpMenus[i];
                    if (id == _menu.id) {
                        twoLevelMenus = _menu.children;
                        break;
                    }
                }
            }
            return twoLevelMenus;
        }
        var twoLevelMenus = [];
        var length = smpMenus.length;
        //console.log('length:' + length);
        //console.log(JSON.stringify(smpMenus[0]))
        if (length > 0) {
            for (var i = 0; i < length; i++) {
                var _menu = smpMenus[i];
                if (id == _menu.PARENT_ID) {
                    var temp = {};
                    temp.id = _menu.URIGHT_ID;
                    temp.icon = _menu.ICON;
                    temp.title = _menu.URIGHT_NAME;
                    temp.url = _menu.FUNC;
                    temp.bgColor = _menu.BACKGROUND_COLOR;
                    temp.name = _menu.MODULE_NAME;
                    twoLevelMenus.push(temp);
                }
            }
        }
        return twoLevelMenus;
    }
}(window.smp_menu = {}));