/**
 * 公共信息
 * 公共方法
 */
(function($, owner){
	owner.AppRoleType = localStorage.getItem('$appRoleType');
	//订单生成时的初始化状态名称
    owner.getOrderInitStatusText = function () {
        var txt = '';
        var roleType = g.AppRoleType;
        //console.log('roleType:' + roleType)
        switch (roleType) {
            case comm.repairman: //运维人员
            case comm.leader: //班组
                txt = '待抢单';
                break;
            case comm.customer:
                txt = '待接受';
                break;
            case comm.pm:
                txt = '待派工';
                break;
            default:
                txt = '待抢单';
                break;
        }
        ////console.log('角色ID:' + roleid)
        return txt;
    }
	/**
	 * 工单状态
	 */
	var WorkOrderStatus = {
	    waitOrder: {
	        value: 'A',
	        text: g.getOrderInitStatusText()
	    },
	    waitSignin: {
	        value: 'B',
	        text: '待签到'
	    },
	    waitOver: {
	        value: 'C',
	        text: '待完工'
	    },
	    waitAudit: {
	        value: 'D',
	        text: '待评价'
	    },
	    Revoke: {
	        value: 'F',
	        text: '已撤单'
	    },
	    Over: {
	        value: 'E',
	        text: '已结束'
	    }
	}
	/**
	 * 获取工单状态
	 */
    owner.getOrderStatusPicker = function (typeid, tag) {
        var picker = new mui.PopPicker(),
            aVal = { value: 'A', text: '待接受' }, //巡检保养初始化状态
            aInitVal = { value: 'A', text: g.getOrderInitStatusText() }; //维修初始化状态
        switch (typeid) {
            case TaskType.repair.value:
                if (tag == "action") {
                    picker.setData([{
                        value: null,
                        text: '全部'
                    }, aInitVal, WorkOrderStatus.waitSignin, WorkOrderStatus.waitOver, WorkOrderStatus.Revoke, WorkOrderStatus.Over]);
                } else if (tag == "manage") {
                    picker.setData([{
                        value: null,
                        text: '全部'
                    }, aInitVal, WorkOrderStatus.waitSignin, WorkOrderStatus.waitOver, WorkOrderStatus.Revoke, WorkOrderStatus.Over]);
                }
                else {
                    picker.setData([{
                        value: null,
                        text: '全部'
                    }, aInitVal, WorkOrderStatus.waitSignin, WorkOrderStatus.waitOver, WorkOrderStatus.waitAudit, WorkOrderStatus.Revoke, WorkOrderStatus.Over]);
                }
                break;
            default:
                break;
        }
        return picker;
    }
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
  owner.getUserInfo = function() {
  	return g.getItem('$userinfo');
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
  function pad2(n) {
    return n < 10 ? '0' + n : n
  }
  /**
   * 获取当前时间
   * @param {Object} id
   */
  //日期格式化处理
  owner.getCurrentTimeFormat = function(){
  	var oDate = new Date();
  	return oDate.getFullYear().toString() + pad2(oDate.getMonth() + 1)
  	       +  pad2(oDate.getDay()) + pad2(oDate.getHours())
  	       + pad2(oDate.getMinutes()) + pad2(oDate.getSeconds());
  }
  owner.formatDate = function(value, type) {
    if (value == undefined || value == null || value == 'null') {
        return '';
    }

    var dataTime = "";
    var date;
    if (!value) {
        return dataTime;
    }
    else if (value == 'D') {
        date = new Date();
    }
    else if (value.toString().indexOf('T') >= 0) {
        value = value.toString().replace('T', ' ');
        date = new Date(value);
    } else {
        date = new Date(value);
    }
    if (date.toString() == 'Invalid Date') {
        if (type == 'YMDHMS') {
            return value;
        }
        else if (type == 'YMDHM') {
            //console.log(type + ':' + value.split(':')[0] + value.split(':')[1]);
            return value.split(':')[0] + ':' + value.split(':')[1];
        }
        else if (type == 'YMD') {
            return value.split(' ')[0];
        }
    }
    ////console.log('data:' + value + ',' + date);
    var year = date.getFullYear();
    var month = addZero(parseInt(date.getMonth()) + 1);
    var day = addZero(date.getDate());
    var hour = addZero(date.getHours());//getUTCHours
    var minute = addZero(date.getMinutes());
    var second = addZero(date.getSeconds());

    if (type == "YMD") {
        dataTime = year + "-" + month + "-" + day;
    } else if (type == "YMDHMS") {
        dataTime = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
    } else if (type == "YMDHM") {
        dataTime = year + "-" + month + "-" + day + " " + hour + ":" + minute;
    }
    else if (type == "HMS") {
        dataTime = hour + ":" + minute + ":" + second;
    } else if (type == "YM") {
        dataTime = year + "-" + month;
    } else if (type == "MD") {
        dataTime = month + "-" + day;
    }
    ////console.log('dataTime;' + dataTime);
    return dataTime;
  }
  function addZero(val) {
    if (val < 10) {
      return "0" + val;
    } else {
      return val;
    }
   };
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
  	if(json.type == undefined) {
  	  json.type = 'post';
  	}
  	var _uuid = config.uuid;
  	mui.ajax(url, {
  	  async: json.async || true,
  	  data: json.data || '',
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
  	mui.openWindow(webviewOptions)
  }
  owner.getScreenInfo = function(option) {
  	if(option === 'width') {
  	  return document.documentElement.clientWidth || document.body.clientWidth;
  	} else {
  	  return document.documentElement.clientHeight || document.body.clientHeight;
  	}
  }
  owner.initScroll = function(options) {
    options = options || {};
    var deceleration = mui.os.ios ? 0.003 : 0.0009;
    if(options.id === undefined) {
      var _scroll_wrapper = mui('.mui-scroll-wrapper');
      if(_scroll_wrapper === (undefined || null)) {
      	return;
      }
      var  _h = _scroll_wrapper[0].style.height;
      _scroll_wrapper[0].style.height = options.h || (_h ? _h : '200px');
      mui('.mui-scroll-wrapper').scroll({
      	bounce: false,
        indicators: true,
        deceleration: deceleration
      })
    } else {
      var _wrapper = document.querySelector('#' + options.id),
          _h = (_wrapper === undefined || _wrapper == null) ? 0 : _wrapper.style.height;
      _wrapper.style.height = options.h || (_h ? _h : '200px');
      mui('#' + options.id).scroll({
        bounce: false,
        indicators: true,
        deceleration: deceleration
      })
    }
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