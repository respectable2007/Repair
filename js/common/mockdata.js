/* 
 * 模拟ajax请求，生成并返回模板数据
 * /
 
 
/*------------------------------用户登录权限start-------------------------------------*/
var _database = new smpWebSql();
//生成一个GUID（取16位）伪随机数
function newGuid() {
    var guid = "";
    for (var i = 1; i <= 16; i++) {
        var n = Math.floor(Math.random() * 16.0).toString(16);
        guid += n;
        if ((i == 8) || (i == 12))
            guid += "-";
    }
    console.log(guid)
    return guid;
}
function getNamebyTypeId(typeId) {
    var result = "";
    switch (typeId) {
        case "GZDT01":
            result = "电梯故障";
            break;
        case "GZDT02":
            result = "水表坏了";
            break;
        default:
            break;
    }
    return result;
}
function initTableDataGlobal() {
  var list_executeuser = [{
        "USER_ID": "4403006",
        "NAME": "邹琼俊",
        "TaskQty": 0
    }, {
        "USER_ID": "4403007",
        "NAME": "邹玉杰",
        "TaskQty": 0
    }];
  _database.add('tb_executeuser_g', list_executeuser, function(res) {
  	console.log('insert success');
  })
}
//项目经理菜单权限
var pmObj = {
    "StatusCode": 200,
    "Message": null,
    "Data": {
        "U": {
            "USER_ID": "4403001",
            "ORG_CODE": "4403Z01",
            "ORG_NAME": "XX维修项目",
            "DEPT_CODE": "WXB",
            "DEP_NAME": "维修部",
            "CODE": "4403Z01YWB110",
            "IS_SYS": false,
            "ROLE_ID": "U007",
            "UROLE_TYPE": 3,
            "ROLE_NAME": "项目经理",
            "PASSWORD": "e10adc3949ba59abbe56e057f20f883e",
            "GENDER": 1,
            "BIND_PHONE": true,
            "FACE": null,
            "MEMO": null,
            "ADDRESS": null,
            "DUTY_TYPE": null,
            "ACTION_TYPE": "-1,B",
            "EMAIL": null,
            "FIX": false,
            "IS_ACC": false,
            "IS_OUT": false,
            "JOB_TYPE": null,
            "NAME": "李经理",
            "PHONE": "13200000001",
            "POSITION": null,
            "TITLE": null,
            "SUPPER_ID": null,
            "SUPPER_NAME": null,
            "SUPPER_TYPE": null,
            "SUPPER_CONTACT": null,
            "SUPPER_ADDRESS": null,
            "SUPPER_TEL": null,
            "CREATE_TIME": "2018-08-29T00:00:00",
            "CREATE_USER_ID": "admin",
            "MODIFY_USER_ID": null,
            "MODIFY_TIME": null,
            "STATE": 1,
            "sys_updatetime": "2018-08-30T09:39:27.101386Z"
        },
        //菜单
        "P": [{
            "URIGHT_ID": 1,
            "URIGHT_NAME": "工作台",
            "RIGHT_TYPE": null,
            "PARENT_ID": null,
            "LEVEL": 1,
            "ORDER_NO": 0,
            "MODULE_NAME": "home",
            "IS_MENU": false,
            "ICON": "iconfont icon-gongzuotai",
            "BACKGROUND_COLOR": "",
            "FUNC": "pages/home.html",
            "PARAMETER": "",
            "IS_SINGLE": false,
            "MEMO": "",
            "PARENT_NAME": ""
        }, {
            "URIGHT_ID": 5,
            "URIGHT_NAME": "维修",
            "RIGHT_TYPE": null,
            "PARENT_ID": 1,
            "LEVEL": 2,
            "ORDER_NO": 1,
            "MODULE_NAME": "repair",
            "IS_MENU": true,
            "ICON": "iconfont icon-weixiubaoyang",
            "BACKGROUND_COLOR": "#FFBD4D",
            "FUNC": "home/task-main.html",
            "PARAMETER": null,
            "IS_SINGLE": false,
            "MEMO": null,
            "PARENT_NAME": ""
        }, {
            "URIGHT_ID": 6,
            "URIGHT_NAME": "模块2",
            "RIGHT_TYPE": null,
            "PARENT_ID": 1,
            "LEVEL": 2,
            "ORDER_NO": 2,
            "MODULE_NAME": "polling",
            "IS_MENU": true,
            "ICON": "iconfont icon-xunjianguanli",
            "BACKGROUND_COLOR": "#6BA7F0",
            "FUNC": "home/polling/order-detail.html",
            "PARAMETER": null,
            "IS_SINGLE": false,
            "MEMO": null,
            "PARENT_NAME": ""
        }, {
            "URIGHT_ID": 7,
            "URIGHT_NAME": "模块3",
            "RIGHT_TYPE": null,
            "PARENT_ID": 1,
            "LEVEL": 2,
            "ORDER_NO": 3,
            "MODULE_NAME": "maintain",
            "IS_MENU": true,
            "ICON": "iconfont icon-Maintenance",
            "BACKGROUND_COLOR": "#5CBD9C",
            "FUNC": "home/maintain/order-detail.html",
            "PARAMETER": null,
            "IS_SINGLE": false,
            "MEMO": null,
            "PARENT_NAME": ""
        }, {
            "URIGHT_ID": 3,
            "URIGHT_NAME": "我的",
            "RIGHT_TYPE": null,
            "PARENT_ID": null,
            "LEVEL": 1,
            "ORDER_NO": 4,
            "MODULE_NAME": "my",
            "IS_MENU": true,
            "ICON": "iconfont icon-wode",
            "BACKGROUND_COLOR": null,
            "FUNC": "pages/my.html",
            "PARAMETER": null,
            "IS_SINGLE": false,
            "MEMO": null,
            "PARENT_NAME": ""
        }, {
            "URIGHT_ID": 4,
            "URIGHT_NAME": "模块4",
            "RIGHT_TYPE": null,
            "PARENT_ID": 1,
            "LEVEL": 2,
            "ORDER_NO": 4,
            "MODULE_NAME": "alarm",
            "IS_MENU": true,
            "ICON": "iconfont icon-alarm",
            "BACKGROUND_COLOR": "#F27475",
            "FUNC": "home/alarm/order-detail.html",
            "PARAMETER": null,
            "IS_SINGLE": false,
            "MEMO": null,
            "PARENT_NAME": ""
        }],
        "R": true
    }
};
//班组菜单权限
var leaderObj = {
    "StatusCode": 200,
    "Message": null,
    "Data": {
        "U": {
            "USER_ID": "4403006",
            "ORG_CODE": "4403Z01",
            "ORG_NAME": "XX维修项目",
            "DEPT_CODE": "6201X01DEP1",
            "DEP_NAME": "运维二部",
            "DIST_ID": "440300",
            "CODE": "4403006",
            "IS_SYS": false,
            "BUILD_ID": null,
            "ROLE_ID": "U008",
            "UROLE_TYPE": 3,
            "ROLE_NAME": "运维班组",
            "PASSWORD": "e10adc3949ba59abbe56e057f20f883e",
            "GENDER": 1,
            "BIND_PHONE": true,
            "FACE": null,
            "MEMO": null,
            "ADDRESS": null,
            "DUTY_TYPE": null,
            "ACTION_TYPE": "A,B",
            "EMAIL": null,
            "FIX": false,
            "IS_ACC": false,
            "IS_OUT": false,
            "JOB_TYPE": null,
            "NAME": "邹琼俊",
            "PHONE": "15243641131",
            "POSITION": null,
            "TITLE": null,
            "SUPPER_ID": null,
            "SUPPER_NAME": null,
            "SUPPER_TYPE": null,
            "SUPPER_CONTACT": null,
            "SUPPER_ADDRESS": null,
            "SUPPER_TEL": null,
            "CREATE_TIME": "2018-09-18T00:00:00",
            "CREATE_USER_ID": "admin",
            "MODIFY_USER_ID": null,
            "MODIFY_TIME": null,
            "STATE": 1,
            "sys_updatetime": "2018-09-18T18:04:47.433957Z"
        },
        "P": [{
            "URIGHT_ID": 1,
            "URIGHT_NAME": "工作台",
            "RIGHT_TYPE": null,
            "PARENT_ID": null,
            "LEVEL": 1,
            "ORDER_NO": 0,
            "MODULE_NAME": "home",
            "IS_MENU": false,
            "ICON": "iconfont icon-gongzuotai",
            "BACKGROUND_COLOR": "",
            "FUNC": "pages/home.html",
            "PARAMETER": "",
            "IS_SINGLE": false,
            "MEMO": "",
            "PARENT_NAME": ""
        }, {
            "URIGHT_ID": 5,
            "URIGHT_NAME": "维修",
            "RIGHT_TYPE": null,
            "PARENT_ID": 1,
            "LEVEL": 2,
            "ORDER_NO": 1,
            "MODULE_NAME": "repair",
            "IS_MENU": true,
            "ICON": "iconfont icon-weixiubaoyang",
            "BACKGROUND_COLOR": "#FFBD4D",
            "FUNC": "home/task-main.html",
            "PARAMETER": null,
            "IS_SINGLE": false,
            "MEMO": null,
            "PARENT_NAME": ""
        }, {
            "URIGHT_ID": 6,
            "URIGHT_NAME": "模块2",
            "RIGHT_TYPE": null,
            "PARENT_ID": 1,
            "LEVEL": 2,
            "ORDER_NO": 2,
            "MODULE_NAME": "polling",
            "IS_MENU": true,
            "ICON": "iconfont icon-xunjianguanli",
            "BACKGROUND_COLOR": "#6BA7F0",
            "FUNC": "home/polling/order-detail.html",
            "PARAMETER": null,
            "IS_SINGLE": false,
            "MEMO": null,
            "PARENT_NAME": ""
        }, {
            "URIGHT_ID": 7,
            "URIGHT_NAME": "模块3",
            "RIGHT_TYPE": null,
            "PARENT_ID": 1,
            "LEVEL": 2,
            "ORDER_NO": 3,
            "MODULE_NAME": "maintain",
            "IS_MENU": true,
            "ICON": "iconfont icon-Maintenance",
            "BACKGROUND_COLOR": "#5CBD9C",
            "FUNC": "home/maintain/order-detail.html",
            "PARAMETER": null,
            "IS_SINGLE": false,
            "MEMO": null,
            "PARENT_NAME": ""
        }, {
            "URIGHT_ID": 4,
            "URIGHT_NAME": "模块4",
            "RIGHT_TYPE": null,
            "PARENT_ID": 1,
            "LEVEL": 2,
            "ORDER_NO": 4,
            "MODULE_NAME": "alarm",
            "IS_MENU": true,
            "ICON": "iconfont icon-alarm",
            "BACKGROUND_COLOR": "#F27475",
            "FUNC": "home/alarm/order-detail.html",
            "PARAMETER": null,
            "IS_SINGLE": false,
            "MEMO": null,
            "PARENT_NAME": ""
        }, {
            "URIGHT_ID": 3,
            "URIGHT_NAME": "我的",
            "RIGHT_TYPE": null,
            "PARENT_ID": null,
            "LEVEL": 1,
            "ORDER_NO": 4,
            "MODULE_NAME": "my",
            "IS_MENU": true,
            "ICON": "iconfont icon-wode",
            "BACKGROUND_COLOR": null,
            "FUNC": "pages/my.html",
            "PARAMETER": null,
            "IS_SINGLE": false,
            "MEMO": null,
            "PARENT_NAME": ""
        }],
        "R": true
    }
};
//维修人员菜单权限
var repairmanObj = {
    "StatusCode": 200,
    "Message": null,
    "Data": {
        "U": {
            "USER_ID": "4403007",
            "ORG_CODE": "4403Z01",
            "ORG_NAME": "XX维修项目",
            "DEPT_CODE": "6201X01DEP1",
            "DEP_NAME": "运维一部",
            "DIST_ID": "440300",
            "CODE": "GZDT02",
            "IS_SYS": false,
            "BUILD_ID": null,
            "ROLE_ID": "U009",
            "UROLE_TYPE": 3,
            "ROLE_NAME": "维修人员",
            "PASSWORD": "e10adc3949ba59abbe56e057f20f883e",
            "GENDER": 1,
            "BIND_PHONE": true,
            "FACE": null,
            "MEMO": null,
            "ADDRESS": null,
            "DUTY_TYPE": null,
            "ACTION_TYPE": "-1,A",
            "EMAIL": null,
            "FIX": false,
            "IS_ACC": false,
            "IS_OUT": false,
            "JOB_TYPE": "D",
            "NAME": "邹玉杰",
            "PHONE": "13249838330",
            "POSITION": null,
            "TITLE": null,
            "SUPPER_ID": null,
            "SUPPER_NAME": null,
            "SUPPER_TYPE": null,
            "SUPPER_CONTACT": null,
            "SUPPER_ADDRESS": null,
            "SUPPER_TEL": null,
            "CREATE_TIME": "2018-09-18T00:00:00",
            "CREATE_USER_ID": "admin",
            "MODIFY_USER_ID": null,
            "MODIFY_TIME": null,
            "STATE": 1,
            "sys_updatetime": "2018-09-18T18:05:13.008656Z"
        },
        "P": [{
            "URIGHT_ID": 2,
            "URIGHT_NAME": "工作台",
            "RIGHT_TYPE": null,
            "PARENT_ID": null,
            "LEVEL": 1,
            "ORDER_NO": 0,
            "MODULE_NAME": "action-home",
            "IS_MENU": true,
            "ICON": "iconfont icon-gongzuotai",
            "BACKGROUND_COLOR": null,
            "FUNC": "pages/action-home.html",
            "PARAMETER": null,
            "IS_SINGLE": false,
            "MEMO": "执行人员",
            "PARENT_NAME": ""
        }, {
            "URIGHT_ID": 17,
            "URIGHT_NAME": "维修",
            "RIGHT_TYPE": null,
            "PARENT_ID": 2,
            "LEVEL": 2,
            "ORDER_NO": 1,
            "MODULE_NAME": "repair",
            "IS_MENU": true,
            "ICON": "iconfont icon-weixiubaoyang",
            "BACKGROUND_COLOR": "#FFBD4D",
            "FUNC": "home/task-main.html",
            "PARAMETER": null,
            "IS_SINGLE": false,
            "MEMO": null,
            "PARENT_NAME": ""
        }, {
            "URIGHT_ID": 18,
            "URIGHT_NAME": "模块1",
            "RIGHT_TYPE": null,
            "PARENT_ID": 2,
            "LEVEL": 2,
            "ORDER_NO": 2,
            "MODULE_NAME": "polling",
            "IS_MENU": true,
            "ICON": "iconfont icon-xunjianguanli",
            "BACKGROUND_COLOR": "#6BA7F0",
            "FUNC": "home/polling/order-detail.html",
            "PARAMETER": null,
            "IS_SINGLE": false,
            "MEMO": null,
            "PARENT_NAME": ""
        }, {
            "URIGHT_ID": 19,
            "URIGHT_NAME": "模块2",
            "RIGHT_TYPE": null,
            "PARENT_ID": 2,
            "LEVEL": 2,
            "ORDER_NO": 3,
            "MODULE_NAME": "maintain",
            "IS_MENU": true,
            "ICON": "iconfont icon-Maintenance",
            "BACKGROUND_COLOR": "#5CBD9C",
            "FUNC": "home/maintain/order-detail.html",
            "PARAMETER": null,
            "IS_SINGLE": false,
            "MEMO": null,
            "PARENT_NAME": ""
        }, {
            "URIGHT_ID": 3,
            "URIGHT_NAME": "我的",
            "RIGHT_TYPE": null,
            "PARENT_ID": null,
            "LEVEL": 1,
            "ORDER_NO": 4,
            "MODULE_NAME": "my",
            "IS_MENU": true,
            "ICON": "iconfont icon-wode",
            "BACKGROUND_COLOR": null,
            "FUNC": "pages/my.html",
            "PARAMETER": null,
            "IS_SINGLE": false,
            "MEMO": null,
            "PARENT_NAME": ""
        }],
        "R": true
    }
};
//报修人员菜单权限
var customerObj = {
    "StatusCode": 200,
    "Message": null,
    "Data": {
        "U": {
            "USER_ID": "4403010",
            "ORG_CODE": "4403Z01",
            "ORG_NAME": "XX维修项目",
            "DEPT_CODE": "WXB",
            "DEP_NAME": "事业部",
            "DIST_ID": "440300",
            "CODE": "4403010",
            "IS_SYS": false,
            "BUILD_ID": null,
            "ROLE_ID": "U011",
            "UROLE_TYPE": 4,
            "ROLE_NAME": "报修人员",
            "PASSWORD": "e10adc3949ba59abbe56e057f20f883e",
            "GENDER": 1,
            "BIND_PHONE": true,
            "FACE": "APP,4125e757-484c-4a62-b9b9-21aed6f0f037",
            "MEMO": null,
            "ADDRESS": null,
            "DUTY_TYPE": null,
            "ACTION_TYPE": null,
            "EMAIL": null,
            "FIX": false,
            "IS_ACC": false,
            "IS_OUT": false,
            "JOB_TYPE": null,
            "NAME": "业主丁某人",
            "PHONE": "15243641131",
            "POSITION": null,
            "TITLE": null,
            "SUPPER_ID": null,
            "SUPPER_NAME": null,
            "SUPPER_TYPE": null,
            "SUPPER_CONTACT": null,
            "SUPPER_ADDRESS": null,
            "SUPPER_TEL": null,
            "CREATE_TIME": "2018-10-11T00:00:00",
            "CREATE_USER_ID": "admin",
            "MODIFY_USER_ID": null,
            "MODIFY_TIME": null,
            "STATE": 1,
            "sys_updatetime": "2018-10-11T17:20:19.49005Z"
        },
        "P": [{
            "URIGHT_ID": 10,
            "URIGHT_NAME": "维修",
            "RIGHT_TYPE": null,
            "PARENT_ID": null,
            "LEVEL": 1,
            "ORDER_NO": 1,
            "MODULE_NAME": "repair-home",
            "IS_MENU": true,
            "ICON": "iconfont icon-weixiubaoyang",
            "BACKGROUND_COLOR": null,
            "FUNC": "pages/repair-home.html",
            "PARAMETER": null,
            "IS_SINGLE": false,
            "MEMO": "报修人员",
            "PARENT_NAME": ""
        }, {
            "URIGHT_ID": 11,
            "URIGHT_NAME": "我的",
            "RIGHT_TYPE": null,
            "PARENT_ID": null,
            "LEVEL": 1,
            "ORDER_NO": 2,
            "MODULE_NAME": "repair-my",
            "IS_MENU": true,
            "ICON": "iconfont icon-wode",
            "BACKGROUND_COLOR": null,
            "FUNC": "pages/repair-my.html",
            "PARAMETER": null,
            "IS_SINGLE": false,
            "MEMO": "报修人员",
            "PARENT_NAME": ""
        }],
        "R": true
    }
};
/*------------------------------用户登录权限end-------------------------------------*/
if (config.isMock) {
  var loginUrlErrorObj = {
        "StatusCode": 200,
        "Message": null,
        "Data": {
            "U": {
                "USER_ID": null,
                "ORG_CODE": null,
                "ORG_NAME": null,
                "DEPT_CODE": null,
                "DEP_NAME": null,
                "DIST_ID": null,
                "CODE": null,
                "IS_SYS": null,
                "BUILD_ID": null,
                "ROLE_ID": null,
                "UROLE_TYPE": 0,
                "ROLE_NAME": null,
                "PASSWORD": null,
                "GENDER": null,
                "BIND_PHONE": null,
                "FACE": null,
                "MEMO": null,
                "ADDRESS": null,
                "DUTY_TYPE": null,
                "ACTION_TYPE": null,
                "EMAIL": null,
                "FIX": null,
                "IS_ACC": null,
                "IS_OUT": null,
                "JOB_TYPE": null,
                "NAME": null,
                "PHONE": null,
                "POSITION": null,
                "TITLE": null,
                "SUPPER_ID": null,
                "SUPPER_NAME": null,
                "SUPPER_TYPE": null,
                "SUPPER_CONTACT": null,
                "SUPPER_ADDRESS": null,
                "SUPPER_TEL": null,
                "CREATE_TIME": "0001-01-01T00:00:00",
                "CREATE_USER_ID": null,
                "MODIFY_USER_ID": null,
                "MODIFY_TIME": null,
                "STATE": null,
                "sys_updatetime": "0001-01-01T00:00:00"
            },
            "P": [],
            "R": false
        }
  },
  BillWorkbenchData = {
  	"StatusCode": 200,
    "Message": null,
    "Data": {
        "cCount": 0,
        "mCount": 0,
        "rCount": 2,
        "cRob": false,
        "mRob": false,
        "rRob": true
    }
  },
  GetBuildsPageData = { 
    "StatusCode": 200,
    "Message": null,
    "Data": {
        "Total": 503,
        "List": [{
            "BUILD_ID": "440300A002",
            "BUILD_NAME": "xx小区6栋1705号",
            "DIST_ID": "440304",
            "org_code": "4403Z01",
            "OWNER": "test",
            "MANAGER": "st",
            "ADDRESS": "西单元[1705]号",
            "BUILD_YEAR": 2008,
            "FLOOR_SUM": null,
            "BUILD_TYPE": "D",
            "UP_FLOOR": null,
            "DOWN_FLOOR": null,
            "COORDINATE": "fsssssssssssssss",
            "FLOOR_HEIGHT": null,
            "TOTAL_HEIGHT": 0,
            "TOTAL_AREA": 6312,
            "AIR_AREA": 45726,
            "HEAT_AREA": 105,
            "AIR_TYPE": "A",
            "HEAT_TYPE": "A",
            "BUILD_COEFF": null,
            "STRUC_TYPE": "G",
            "WALL_MAT_TYPE": "B",
            "WALL_WARM_TYPE": "B",
            "ROOWARM_TYPE": "A",
            "WINDOW_TYPE": "A",
            "GLASS_TYPE": "A",
            "WIN_FRAME_TYPE": "A",
            "STATE": 1,
            "CREATE_TIME": "2018-01-03T14:00:00",
            "CREATE_USER_ID": "admin",
            "MODIFY_TIME": "2018-09-19T11:17:05",
            "MODIFY_USER_ID": "qyyy1",
            "BUILD_NATURE": "B",
            "BUILD_MONITOR_TYPE": null,
            "DIST_NAME": "福田区",
            "CONTACT": "周泽礵",
            "TEL": "13249838330",
            "EMAIL": null,
            "OPCS_URL": null,
            "OPEN_TIME": null,
            "CLOSE_TIME": null,
            "USED_CONTROL": false,
            "OPCS_USERNAME": null,
            "OPCS_PASSWORD": null,
            "OPCS_CERT": null,
            "OPCS_WRITE": null,
            "OPCS_REFRESH": null,
            "BUILD_TYPE_NAME": "文化教育建筑",
            "ONLINE_TIME": null,
            "MONITOR_MODE_SET": null,
            "ELEC_PRICE": null,
            "WATER_PRICE": null,
            "DAQ_INTERVAL": 15,
            "OPC_OPCTION_WCF_URL": null,
            "MH_OPCS_URL": null,
            "PROJECT_TYPE": null,
            "MARK_TYPE": null,
            "FA": null,
            "FB": null,
            "FC": null,
            "MARK_SUB": null,
            "POWER_MAIN_SUB": null,
            "POWER_CHILD_SUB": null,
            "HOUR_MAIN_SUB": null,
            "HOUR_CHILD_SUB": null,
            "PARA_SOURCE": null,
            "STAND_BEGIN": null,
            "STAND_END": null,
            "MATLAB_TYPE": null,
            "HOLIDAY_PARA": null,
            "ENERGY_RANK_TYPE": null,
            "MONITOR_TYPE": null,
            "MONITOR_LEFT_VISIBLE": null,
            "HOME_SOURCE": null,
            "FKQUOTA_SET": 1,
            "COLLECTOR_ADDRESS": null
        }, {
            "BUILD_ID": "440300A003",
            "BUILD_NAME": "xx小区4栋1205",
            "DIST_ID": "440304",
            "org_code": "4403Z01",
            "OWNER": null,
            "MANAGER": null,
            "ADDRESS": "xx小区4栋1205",
            "BUILD_YEAR": 0,
            "FLOOR_SUM": null,
            "BUILD_TYPE": "A",
            "UP_FLOOR": null,
            "DOWN_FLOOR": null,
            "COORDINATE": null,
            "FLOOR_HEIGHT": null,
            "TOTAL_HEIGHT": 0,
            "TOTAL_AREA": 85137,
            "AIR_AREA": 85137,
            "HEAT_AREA": null,
            "AIR_TYPE": "C",
            "HEAT_TYPE": "A",
            "BUILD_COEFF": null,
            "STRUC_TYPE": "A",
            "WALL_MAT_TYPE": "A",
            "WALL_WARM_TYPE": "A",
            "ROOWARM_TYPE": "A",
            "WINDOW_TYPE": "A",
            "GLASS_TYPE": "A",
            "WIN_FRAME_TYPE": "A",
            "STATE": 1,
            "CREATE_TIME": "2018-01-03T14:00:00",
            "CREATE_USER_ID": "admin",
            "MODIFY_TIME": "2018-09-17T12:18:39",
            "MODIFY_USER_ID": "qyyy1",
            "BUILD_NATURE": "A",
            "BUILD_MONITOR_TYPE": null,
            "DIST_NAME": "福田区",
            "CONTACT": null,
            "TEL": null,
            "EMAIL": null,
            "OPCS_URL": null,
            "OPEN_TIME": null,
            "CLOSE_TIME": null,
            "USED_CONTROL": false,
            "OPCS_USERNAME": null,
            "OPCS_PASSWORD": null,
            "OPCS_CERT": null,
            "OPCS_WRITE": null,
            "OPCS_REFRESH": null,
            "BUILD_TYPE_NAME": "办公及写字楼建筑",
            "ONLINE_TIME": null,
            "MONITOR_MODE_SET": null,
            "ELEC_PRICE": null,
            "WATER_PRICE": null,
            "DAQ_INTERVAL": 15,
            "OPC_OPCTION_WCF_URL": null,
            "MH_OPCS_URL": null,
            "PROJECT_TYPE": null,
            "MARK_TYPE": null,
            "FA": null,
            "FB": null,
            "FC": null,
            "MARK_SUB": null,
            "POWER_MAIN_SUB": null,
            "POWER_CHILD_SUB": null,
            "HOUR_MAIN_SUB": null,
            "HOUR_CHILD_SUB": null,
            "PARA_SOURCE": null,
            "STAND_BEGIN": null,
            "STAND_END": null,
            "MATLAB_TYPE": null,
            "HOLIDAY_PARA": null,
            "ENERGY_RANK_TYPE": null,
            "MONITOR_TYPE": null,
            "MONITOR_LEFT_VISIBLE": null,
            "HOME_SOURCE": null,
            "FKQUOTA_SET": 1,
            "COLLECTOR_ADDRESS": "2楼储物间"
        }]
    }
  },
   QueryAllDistrictTreeData = {
    "StatusCode": 200,
    "Message": null,
    "Data": [{
        "value": "440000",
        "text": "广东省",
        "children": [{
            "value": "440100",
            "text": "广州市",
            "children": [{
                "value": "440100",
                "text": "全区",
                "children": null
            }, {
                "value": "440101",
                "text": "天河区",
                "children": null
            }]
        }, {
            "value": "440300",
            "text": "深圳市",
            "children": [{
                "value": "440300",
                "text": "全区",
                "children": null
            }, {
                "value": "440303",
                "text": "罗湖区",
                "children": null
            }, {
                "value": "440304",
                "text": "福田区",
                "children": null
            }, {
                "value": "440305",
                "text": "南山区",
                "children": null
            }, {
                "value": "440306",
                "text": "宝安区",
                "children": null
            }, {
                "value": "440307",
                "text": "龙岗区",
                "children": null
            }, {
                "value": "440308",
                "text": "盐田区",
                "children": null
            }, {
                "value": "440309",
                "text": "龙华区",
                "children": null
            }]
        }]
    }]
    },
    QueryAddrList = {
        "StatusCode": 200,
        "Message": null,
        "Data": [{
            "DEP_NAME": "维修一部",
            "LSTUSER": [{
                "NAME": "报修人A",
                "PHONE": "15243641131"
            },{
                "NAME": "李存孝",
                "PHONE": "13249838340"
            }, {
                "NAME": "李星云",
                "PHONE": "18688837771"
            }]
        }, {
            "DEP_NAME": "维修二部",
            "LSTUSER": [{
                "NAME": "班组A",
                "PHONE": "13200000002"
            }, {
                "NAME": "狄仁杰",
                "PHONE": "13537872524"
            }, {
                "NAME": "李茂贞",
                "PHONE": "13923804430"
            }]
        }, {
            "DEP_NAME": "运维三部",
            "LSTUSER": [{
                "NAME": "邹玉杰",
                "PHONE": "13249838332"
            }, {
                "NAME": "钟哲颖",
                "PHONE": "13249838332"
            }, {
                "NAME": "邹琼俊",
                "PHONE": "18673126640"
            }]
        }]
    },
    QueryAppHelpPage = {
    	"StatusCode":200,
    	"Message":null,
    	"Data":{
    	  "List":[{
    	  	"_id":"5a4afdb73e652c16506e8f0e",
    	  	"ID":null,
    	  	"TITLE":"APP操作流程",
    	  	"CONTENT":"<p>&nbsp; &nbsp;维修：报修 —&gt;接单 —&gt;签到 —&gt;完工 —&gt;评价<br></p><p>&nbsp;&nbsp; 保养： 接单 —&gt;签到 —&gt;完工&nbsp;<br></p><p>&nbsp;&nbsp; 巡检： 接单 —&gt;签到 —&gt;完工&nbsp;<br></p><p>&nbsp;&nbsp; 报警： 接单 —&gt;签到 —&gt;完工</p>",
    	  	"CREATE_USER_ID":"admin",
    	  	"CREATE_TIME":"2018-01-02T03:34:15Z",
    	  	"MODIFY_USER_ID":null,
    	  	"MODIFY_TIME":"0001-01-01T00:00:00Z",
    	  	"sys_updatetime":"0001-01-01T00:00:00Z"},{
    	  	"_id":"5a41e730fc5ead4234a15f56",
    	  	"ID":"5a41e730fc5ead4234a15f56",
    	  	"TITLE":"APP驾驶舱使用方法",
    	  	"CONTENT":"<p>APP驾驶舱使用方法</p>",
    	  	"CREATE_USER_ID":"admin",
    	  	"CREATE_TIME":"2017-12-25T06:07:44Z",
    	  	"MODIFY_USER_ID":"admin",
    	  	"MODIFY_TIME":"2017-12-26T06:21:26Z",
    	  	"sys_updatetime":"0001-01-01T00:00:00Z"},{
    	  	"_id":"5a3cc64b3e652d0224a59455",
    	  	"ID":"5a3cc64b3e652d0224a59455",
    	  	"TITLE":"操盘流程",
    	  	"CONTENT":"<p>1.医护人员</p><p>&nbsp;&nbsp; 报修—&gt;催单\r\n—&gt;评价</p><p>2.运维人员</p><p>&nbsp;&nbsp; 维修：报修\r\n—&gt;接单\r\n—&gt;签到\r\n—&gt;完工\r\n—&gt;评价</p><p>&nbsp;&nbsp; 保养：\r\n接单\r\n—&gt;签到\r\n—&gt;完工 <br></p><p>&nbsp;&nbsp; 巡检：\r\n接单\r\n—&gt;签到\r\n—&gt;完工 <br></p><p>&nbsp;&nbsp; 报警：\r\n接单\r\n—&gt;签到\r\n—&gt;完工 <br></p><p>3.班组人员</p><p>\r\n</p><p>&nbsp;&nbsp; 维修：派工-报修\r\n—&gt;接单\r\n—&gt;签到\r\n—&gt;完工\r\n—&gt;评价</p><p>&nbsp;&nbsp; 保养：\r\n\r\n派工-\r\n\r\n接单\r\n—&gt;签到\r\n—&gt;完工\r\n—&gt;评价 <br></p><p>&nbsp;&nbsp; 巡检：\r\n派工-\r\n\r\n\r\n接单\r\n—&gt;签到\r\n—&gt;完工 <br></p><p>&nbsp;&nbsp; 报警：\r\n派工-\r\n\r\n\r\n接单\r\n—&gt;签到\r\n—&gt;完工 \r\n\r\n—&gt;评价 <br></p><p>4.项目经理</p><p>\r\n</p><p>&nbsp;&nbsp; 维修：派工-报修&nbsp;\r\n—&gt;评价</p><p>&nbsp;&nbsp; 保养：\r\n\r\n派工-\r\n\r\n接单\r\n—&gt;签到\r\n—&gt;完工\r\n—&gt;评价 <br></p><p>&nbsp;&nbsp; 巡检：\r\n派工-\r\n\r\n\r\n接单\r\n—&gt;签到\r\n—&gt;完工 <br></p><p>&nbsp;&nbsp; 报警：\r\n派工-\r\n\r\n\r\n接单\r\n—&gt;签到\r\n—&gt;完工 \r\n\r\n—&gt;评价 </p>\r\n\r\n\r\n\r\n<p><br></p><p><br></p>",
    	  	"CREATE_USER_ID":"admin",
    	  	"CREATE_TIME":"2017-12-22T00:46:03Z",
    	  	"MODIFY_USER_ID":"admin",
    	  	"MODIFY_TIME":"2017-12-26T06:21:33Z",
    	  	"sys_updatetime":"0001-01-01T00:00:00Z"}],
    	"recc":3}},
    QueryWorkLoadQty = {
    	"StatusCode":200,
    	"Message":null,
    	"Data":[{
    		"BusinessType":"R",
    		"NoFinishQty":4,
    		"FinishQty":2},{
    		"BusinessType":"C",
    		"NoFinishQty":2,
    		"FinishQty":1},{
    		"BusinessType":"M",
    		"NoFinishQty":3,
    		"FinishQty":1},{
    		"BusinessType":"A",
    		"NoFinishQty":2,
    		"FinishQty":0
    	}]},
    BillRewardForUser = { 
      "StatusCode": 200, 
      "Message": null, 
      "Data": { 
      	"Amount_ToDay": "0", 
      	"Amount_Month": "4.00", 
      	"Amount_Month_One": "0.00", 
      	"Amount_Month_Two": "0.00", 
      	"Amount_Month_Three": "0.00", 
      	"Amount_Month_Four": "0.00", 
      	"Amount_Month_Five": "0.00", 
      	"Amount_Month_Six": "0.00", 
      	"Amount_Month_Seven": "0.00", 
      	"Amount_Month_Eight": "0.00", 
      	"Amount_Month_Nine": "1.00", 
      	"Amount_Month_Ten": "4.00", 
      	"Amount_Month_Eleven": "0.00", 
      	"Amount_Month_Twelve": "0.00", 
      	"Detail_List": [] 
       }
    };
    //登录
  Mock.mock(config.loginUrl, null, function(options){
  	var _body = JSON.parse(options.body),
  	    userid = _body.USER_ID,
  	    result = null;
  	if(_body.PASSWORD != 'e10adc3949ba59abbe56e057f20f883e') {
  		return loginUrlErrorObj;
  	}
  	if(userid == '4403001') {
  		result = pmObj;
  	} else if(userid == '4403006') {
  		result = leaderObj;
  	} else if(userid == '4403007') {
  		result = repairmanObj;
  	} else if(userid == '4403010') {
  		result = customerObj;
  	} else {
  		result = loginUrlErrorObj;
  	}
  	return result;  
  });
  Mock.mock(config.GetFaultType, {
    "StatusCode": 200,
    "Message": null,
    "Data": [{
      "CODE": "GZDT01",
      "EQT_ID": "4403Z01",
      "NAME": "设备故障",
      "sys_updatetime": "2018-09-19T11:03:55.670795Z",
      "STATE":1,
      "CREATE_USER_ID": "zh",
      "MODIFY_TIME": null,
      "MODIFY_USER_ID": null,
      "CREATE-TIME": "2018-09-19T11:03:55"
    },{
      "CODE": "GZDT02",
      "EQT_ID": "4403Z01",
      "NAME": "采集器掉线",
      "sys_updatetime": "2018-09-19T11:04:06.984182Z",
      "STATE":1,
      "CREATE_USER_ID": "zh",
      "MODIFY_TIME": null,
      "MODIFY_USER_ID": null,
      "CREATE-TIME": "2018-09-19T11:04:06"
    }]
  });
  //获取列表条码数
  Mock.mock(config.BillWorkbench, BillWorkbenchData);
  //获取建筑数据列表
  Mock.mock(config.GetBuildsPage, GetBuildsPageData);
  //提交维修工单
  Mock.mock(config.AddRepairBill, null, function(option){
  	var _body = JSON.parse(option.body),
  	    no = newGuid(),
  	    obj = {
            "NO": no,
            "ORG_CODE": _body.ORG_CODE,
            "EQT_WORK_ID": "0",
            "IS_URGENCY": _body.IS_URGENCY,
            "STATE": _body.STATE,
            "REPORT_USER_CODE": _body.REPORT_USER_CODE,
            "CREATE_USER_ID": _body.CREATE_USER_ID,
            "REPORT_USER_NAME": _body.REPORT_USER_NAME,
            "REPORT_ROLE_ID": _body.REPORT_ROLE_ID,
            "PHONE": _body.PHONE,
            "DEPT_CODE": _body.DEPT_CODE,
            "FAULT_INFO": _body.FAULT_INFO,
            "ADDRESS": _body.ADDRESS,
            "SOURCE": "C",
            "FAULT_TYPE": _body.FAULT_TYPE,
            "LABOR_COST": 0,
            "PART_COST": 0,
            "SUMMARY": null,
            "RECEIVE_TYPE": 0,
            "BOOK_TIME": null,
            "EQ_ID": null,
            "EQP_NAME": null,
            "ACCEPT_USER_ID": "1",
            "SIGN_TIME": null,
            "ACCEPT_TIME": null,
            "DISPATCH_USER_ID": null,
            "FINISH_SIGN": null,
            "FINISH_TIME": null,
            "FINISH_INFO": null,
            "DISPATCH_TIME": null,
            "NEED_HELP": false,
            "NEED_DISPATCH": false,
            //"HELP_SEND_USER_ID": null,
            "HELP_SEND_TIME": null,
            "CONFIRM_USER_ID": null,
            "CONFIRM_TIME": null,
            "CONFIRM_STATUS": 0,
            "CONFIRM_SIGN": null,
            "REPORT_TIME": _body.REPORT_TIME,
            "PRESS_NUM": 0,
            "PRESS_FIRST_TIME": "2018-10-11T15:40:40",
            "PRESS_LAST_TIME": "2018-10-11T15:40:40",
            "MEMO": null,
            //"DEPT_CODE_NAME": "",
            //"FAULT_NAME": getNamebyTypeId(_body.FAULT_TYPE),
            //"REPAIR_USER_NAME": null,
            //"REPAIR_DEPT_NAME": null,
            //"MONEY": 2,
            //"HOURS": 1,
            "IS_WAITING": 0,
            "OTHER_DEV_NAME": null,
            "BUILD_ID": _body.BUILD_ID,
            "LIMIT_TIME": _body.LIMIT_TIME || null,
            "BUILD_NAME": _body.BUILD_NAME,
            "DIST_ID": "440303",
            //"IsOverTime": 0,
            "sys_updatetime": new Date().toLocaleString()
        };
    _database.add('tb_repairbill_g', [obj],function(res){
      console.log(res);
      console.log('添加维修工单成功');
    });
    return {"StatusCode": 200,"Message":null,"Data":no};
  });
  //行政区域
  Mock.mock(config.QueryAllDistrictTree, QueryAllDistrictTreeData);
  //通讯录
  Mock.mock(config.QueryAddrList, QueryAddrList);
  //帮助列表
  Mock.mock(config.QueryAppHelpPage, QueryAppHelpPage);
  //工作量
  Mock.mock(config.QueryWorkLoadQty, QueryWorkLoadQty);
  //奖励金额
  Mock.mock(config.BillRewardForUser, BillRewardForUser);
  //派工
  Mock.mock(config.AssignPersonRepair, null, function(options) {
  	var body = JSON.parse(options.body);
  	_database.update('tb_repairbill_g', 'NO', body.NO, {
  	  "STATE": 'B',
  	  "ACCEPT_TIME": g.operationDate(0),
  	  "ACCEPT_USER_ID": body.ACCEPT_USER_ID,
//	  "HELP_SEND_USER_ID": body.HELP_SEND_USER_ID,
  	  "HELP_SEND_TIME": body.HELP_SEND_TIME
  	},function(res){
  	  console.log(res)
  	})
  	return { "StatusCode": 200, "Message": null, "Data": 1 };
  });
}
