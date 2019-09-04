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
  	owner.isMock = true;
  	owner.OpenLog = true;
  	apiDomain = 'http://www.repairtest.com';
  	owner.apkUrl = apiDomain + '/app/android.apk';
  }
  /*
   * 接口
   */
  owner.GetFaultType = apiDomain + 'api/Repair/GetFaultType';
  //登录
  owner.loginUrl = apiDomain + 'api/Base/LoginApp';
  /*工单类*/
  owner.BillWorkbench = apiDomain + '/api/Maintain/BillWorkbench'; //工作台
  owner.QueryExecuteUserList = apiDomain + '/api/Bill/QueryExecuteUserList'; //查询执行人员列表
  /*基础类*/
  owner.GetBuildsPage = apiDomain + '/api/Base/GetBuildsPage'; //建筑信息列表
  owner.QueryAllDistrictTree = apiDomain + '/api/Base/QueryAllDistrictTree'; //获取行政区域树
  owner.QueryAddrList = apiDomain + '/api/Base/QueryAddrList'; //获取通讯录
  owner.QueryAppHelpPage = apiDomain + '/api/Base/QueryAppHelpPage'; //帮助分页查询
  owner.QueryWorkLoadQty = apiDomain + '/api/Base/QueryWorkLoadQty'; //工作量
  /*维修*/
  owner.AddRepairBill = apiDomain + '/api/Repair/AddRepairBill'; //维修报修
  owner.AssignPersonRepair = apiDomain + '/api/Repair/AssignPersonRepair'; //维修抢单、派工
  owner.TransferRepair = apiDomain + '/api/Repair/TransferRepair';//转单
  
  /*统计信息*/
  owner.BillRewardForUser = apiDomain + '/api/Maintain/BillRewardForUser'; //奖励金额
}(window.config = {}));

//APP角色类型
(function(owner){
  owner.pm = 'pm';//项目经理
  owner.leader = 'leader';//维修组长
  owner.repair = 'repairman';//维修人员
  owner.customer = 'customer';//报修人员
})(window.comm = {})
/** 
 * 任务类型 -工作台模块
 */
var TaskType = {
    //维修
    repair: {
        value: 'repair',
        name: 'repair'
    },
    polling: {
        value: 'polling',
        name: 'polling'
    },
    maintain: {
        value: 'maintain',
        name: 'maintain'
    }
}
//websql 数据表 （离线存储数据表）
var smp_tb = {
    repair_tb: 'tb_repair_order', //维修工单表
    img_tb: 'tb_img_order', //工单图片表
    signin_tb: 'tb_signin', //拍照签到表
    over_tb: 'tb_over',//完工表
    fault_type_tb: 'tb_faultType', //故障类型
}