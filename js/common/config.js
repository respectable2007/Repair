/**
 * 项目配置信息
 */

(function(owner){
  owner.isPublish = true;
  var apiDomain = '';
  if (owner.isPublish === true) {
  	apiDomain = 'http://www.repair.com';
  	owner.OpenLog = false;
  } else {
  	apiDomain = 'http://www.repairtest.com';
  	owner.isMock = true;
  	owner.OpenLog = true;
  }
  owner.GetFaultType = apiDomain + 'api/Repair/GetFaultType';
}(window.config = {}));
