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
  owner.getMenu = function(){
  	var jsonStr = plus.localStorage.getItem('$menu');
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
  	return plus.nativeObj.View(id, styles, tags);
  }
}(mui, window.g = window.g || {}));
