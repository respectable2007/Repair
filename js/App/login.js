var nwaiting = null;
(function($, owner) {
  owner.login = function(loginInfo, callback) {
  	if(g.getNetStatus() == false) {
  	  mui.toast('网络异常，请稍后再试');
  	  return;
  	}
  	callback = callback || mui.noop;
  	loginInfo = loginInfo || {};
  	loginInfo.account = loginInfo.account || '';
  	loginInfo.password = loginInfo.password || '';
  	var pwd =  md5(loginInfo.password);
  	var _where = {
  	  USER_ID:loginInfo.account,
  	  PASSWORD:pwd
  	}
  	nwaiting = plus.nativeUI.showWaiting();
  	g.ajax(config.loginUrl, {
  	  type: 'post',
  	  data: _where,
  	  nwaiting: nwaiting,
  	  success: function(data){  
  	    if(nwaiting){
  	      nwaiting.close();
  	    }
  	    if(data.StatusCode == 200) {
  	      var _user = data.Data.U;
  	      if(_user.USER_ID == null) {
  	      	mui.toast('用户名或密码错误');
  	      	return;
  	      }
  	      var _GlobalMenus = data.Data.P;
  	      if(_GlobalMenus != null && _GlobalMenus.length > 0) {
  	        g.setMenu(_GlobalMenus);
  	        localStorage.setItem('$loginstate', true);
	          u.createUserInfo(_user, callback);
  	      }
  	    }
  	  }
  	})
  }
  
  owner.createUserInfo = function(user, callback) {
  	if(user.ORG_CODE != null){
  	  localStorage.setItem('$ORG_CODE', user.ORG_CODE)
  	}
  	if(user.ROLE_ID != null){
  	  localStorage.setItem('$ROLE_ID', user.ROLE_ID)
  	}
  	if(user.USER_ID != null){
  	  localStorage.setItem('$USER_ID', user.USER_ID)
  	}
  	user.token = 'token123456789';
  	if(user.PASSWORD != null && user.PASSWORD != ''){
  	  localStorage.setItem('$smp_cur_pwd',user.PASSWORD);
  	}
  	g.setItem('$userinfo',user);
  	saveAppRoleType(user);
  	return callback();
  }
  function saveAppRoleType(_user){
  	var roleType = '',
  	    action_type = _user.ACTION_TYPE;//用户权限，A-抢单操作，B-派工操作
  	if(action_type == undefined || action_type == null) {
  	  roleType = comm.customer;
  	} else {
  	  var canDispatching = action_type.indexOf('B') >= 0 ? true: false,
  	      canGetOrder = action_type.indexOf('A') >= 0 ? true: false;
  	  if(canGetOrder && canDispatching) {
  	  	roleType = comm.leader;
  	  } else if(canGetOrder) {
  	  	roleType = comm.repairman;
  	  } else if(canDispatching) {
  	  	roleType = comm.pm;
  	  } else {
  	  	roleType = comm.customer;
  	  }
  	}
  	if(roleType != ''){
  	  localStorage.setItem('$AppRoleType', roleType);
  	}
  }
})(mui, window.u = {})
