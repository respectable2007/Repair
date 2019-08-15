/**
 * 项目配置信息
 * 环境配置、API域名、接口、角色类型
 */

(function(owner){
  //是否发布到正式环境
  owner.isPublish = false;
  owner.AppTitle = '维护平台';
  //获取设备的唯一标识号
  owner.uuid = localStorage.getItem('$uuid');
  //项目编码
  owner.ORG_CODE = localStorage.getItem('$ORG_CODE');
  //登录角色编号
  owner.ROLE_ID = localStorage.getItem('$ROLE_ID');
  //登录用户编号
  owner.USER_ID = localStorage.getItem('$USER_ID');
  owner.getCount = localStorage.getItem('$EXE_COUNT');
  //API域名地址
  var apiDomain = '';
  //生产环境
  if (owner.isPublish === true) {
  	//API域名
  	apiDomain = 'http://www.repair.com';
    //Android安装包下载地址  	
  	owner.apkUrl = apiDomain + '/App/android.apk';
  	//是否开启日志，控制台日志开关
  	owner.OpenLog = false;
  } else {
  	apiDomain = 'http://www.repairtest.com';
  	owner.apkUrl = apiDomain + '/App/android.apk';
  	owner.isMock = true;
  	owner.OpenLog = true;
  }
  /*
   * 接口
   */
  owner.GetFaultType = apiDomain + 'api/Repair/GetFaultType';
  //登录
  owner.loginUrl = apiDomain + 'api/Base/LoginApp';
}(window.config = {}));

//APP角色类型
(function(owner){
  owner.pm = 'pm';//项目经理
  owner.leader = 'leader';//维修组长
  owner.repairman = 'repairman';//维修人员
  owner.customer = 'customer';//报修人员
})(window.comm = {})
