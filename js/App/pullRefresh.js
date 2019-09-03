var pageSize = 10,
	pageIndex = 0,
	database = new smpWebSql(),
	dvAll = [];
//初始化查询条件
function initSearch(o) {
  if(o === 1) {
  	pageIndex = 0;
  }
}

//获取工单列表
/*
 *operateType：操作类型，1是下拉刷新，2是上拉下载
 */
function getList(v, app, operateType) {
  initSearch(operateType);
  if(!g.getNetStatus()) {
  	if(app.typeid == TaskType.repair.value) {
  	  var counts = 0,
  	      where = '';
  	  database.counts(smp_tb.repair_tb, "", function(res) {
  	  	counts = res;
  	  })
  	}
  } else{
  	if(config.isMock) {
  	  var where = 'where 1=1';
  	  if(v.buildId) {
  	  	where += ' and BUILD_ID="' + v.buildId + '"';
  	  }
  	  if(v.districtId) {
  	  	where += ' and DISTRICT_ID="' + v.districtId + '"';
  	  }
  	  if(v.state) {
  	  	where += ' and STATE="' + v.state + '"';
  	  }
  	  where += ' ORDER BY REPORT_TIME DESC limit ' + pageIndex * v.pageSize + ',' + v.pageSize;
  	  database.read('tb_repairbill_g', where, function(res) {
  	  	var data = {
  	  	  "StatusCode": 200,
  	  	  "message": null,
  	  	  "Data": {
  	  	  	"lstData": res,
  	  	  	"recc": res.length
  	  	  }
  	  	};
  	  	if(operateType === 2) {
  	  	  dvAll = dvAll.concat(res);
  	  	  app.list = dvAll;
  	  	  if(app.list.length > res.length) {
            mui('#pullRefresh').pullRefresh().endPullupToRefresh(true); //结束上拉
          } else {
            mui('#pullRefresh').pullRefresh().endPullupToRefresh(false); //结束上拉
            pageIndex++;
          }
  	  	} else {
  	  	  pageIndex = 0;
  	  	  app.list = res;
          mui('#pullRefresh').pullRefresh().endPulldown(); //结束下拉刷新
  	  	}
  	  })
    } else {
  	
    }
  }
}


//获取人员列表
function getStaffsList(app) {
  database.read('tb_executeuser_g', '', function(data){
  	app.staffs = data;
  })
}
