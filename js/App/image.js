(function(){
  function Camera(app){
  	this.app = app;
  }
  Camera.prototype = {
  	constructor: Camera,
  	sltImgCount: 0,//当前选中的图片数
  	showDetailFun:undefined,//选择图片后回调函数
  	callBackFun:undefined,//显示图片后回调函数
  	localImgUrl:'',//压缩后本地相对路径
  	fullLocalImgUrl:'',//压缩后本地绝对路径
  	smpImgArray:[],//压缩后图片列表
  	smpCurUrl:'',//图片地址
  	showActionSheet: function(item) {
	  	var divid = item.id,
	  	   imgCount = item.imgCount || 5,
	  	   showDetailFun = item.showDetailFun,
	  	   callBackFun = item.callBackFun || undefined,
	  	   that = this;
	  	if(item.type == 'paizhao') {
	  	  this.getImage(divid,item);
	  	} else {
	  	  var actionSheet = {
	  	  	title: '选取照片',
	  	  	cancel: '取消',
	  	  	buttons: [{
	  	  	  title: '拍照'
	  	  	},{
	  	  	  title: '相册选取'
	  	  	}]
	  	  }
	  	  plus.nativeUI.actionSheet(actionSheet, function(e){
	  	  	if(e.index === 1) {
	  	  	  that.getImage(divid, item);
	  	  	} else if(e.index === 2) {
	  	  	  that.galleryImage(divid, item);
	  	  	}
	  	  })
	  	}
	},
	//本地系统选择图片
    /**
     * @param {string} divid 字段名称
     * @param {object} conf  图片对象
    */
	galleryImage: function(divid, conf) {
	  	//单选
	  	var that = this;
	  	if(conf.multiple == undefined || conf.multiple == false) {
	  	  plus.gallery.pick(function(path){//path-选择图片或文件路径，以file:///storage为开头
	  	  	//操作文件
	  	  	plus.io.resolveLocalFileSystemURL(path,function(entry){//entry-请求到的目录或文件对象
	  	  	  /*entry.toLocalURL()-获取目录路径转换为本地路径URL地址，以file:///storage为开头
	  	  	   * entry.name-操作文件的文件名
	  	  	   */
	  	  	  that.compressImage(entry.toLocalURL(), entry.name, divid);
	  	  	  that.sltImgCount = 1;
	  	  	  if(that.callBackFun != undefined) {
	  	  	  	that.callBackFun('sltImgCount', sltImgCount);
	  	  	  }
	  	  	}, function(e){
	  	  		plus.nativeUI.toast('读取相册文件错误' + e.message);
	  	  	})
	  	  },function(){
	  	  	console.log('取消选择图片');
	  	  },{
	  	  	multiple: false,
	  	  	filename: '_doc/camera/'
	  	  })
	  	//多选
	  	} else {
	  	 plus.gallery.pick(function(e) {
	  	   var i = 0;
	  	   that.sltImgCount += e.files.length;
	  	   if(that.sltImgCount > conf.imgCount) {
	  	   	 mui.toast('最多只能选择' + conf.imgCount + '张图片');
	  	   	 that.sltImgCount -= e.files.length;
	  	   	 return;
	  	   }
	  	   setTimeout(file, 200);
	  	   function file() {
	  	   	 plus.io.resolveLocalFileSystemURL(e.files[i],function(entry){
	  	   	 	that.compressImage(entry.toLocalURL(), entry.name, divid);
	  	   	 },function(e){
	  	   	 	plus.nativeUI.toast('读取相册文件失败'+e.message);
	  	   	 })
	  	   	 i++;
	  	   	 if(i < e.files.length) {
	  	       setTimeout(file, 200);
	  	   	 }
	  	   }
	  	 }, function(e){
	  	   plus.nativeUI.toast('选择照片失败' + e.message);
	  	 },{
	  	   filename: '_doc/camera/',
	  	   multiple: 'true',
	  	   maximum: conf.imgCount,
	  	   system: false,
	  	   onmaxed: function(){
	  	   	mui.toast('最多只能选择' + conf.imgCount + '张图片');
	  	   }
	  	 })
	  	}
	  },
	/**
   * 调用摄像头
   * @param {string} divid 字段名称
   * @param {object} conf  操作对象
   */
	getImage: function(divid, conf){
	  	//获取设备默认的摄像头对象
	  	var cmr = plus.camera.getCamera(),
	  	    that = this;
	  	if(that.sltImgCount > conf.imgCount) {
	  	  mui.toast('最多只能选择' + conf.imgCount + '张图片');
	  	  return;
	  	}
	  	cmr.captureImage(function(path){
	  	  plus.io.resolveLocalFileSystemURL(path, function(entry){
	  	  	that.compressImage(entry.toLocalURL(), entry.name, divid);
	  	  	that.sltImgCount += 1;
	  	  	if(that.callBackFun != undefined) {
	  	  	  that.callBackFun('sltImgCount', that.sltImgCount);
	  	  	}
	  	  }, function(e){
	  	  	 mui.toast('读取图片失败：' + e.message);
	  	  })
	  	},function(){
	  	  mui.toast('拍照失败');
	  	},{
	  	  filename: "_doc/camera/",
	  	  index: 1
	  	})
	},
	//压缩图片
	compressImage: function(url, name, divid){
	  	var path = '_doc/upload/' + divid + "-" + g.getCurrentTimeFormat() + name,//压缩图片保存相对路径，以_doc为开头
	  	    that = this;
	  	plus.zip.compressImage({
	  	  src: url,//压缩转换图片原始路径，file:
	  	  dst: path,//压缩转换图片保存的相对路径，_doc/
	  	  quality: 20,//压缩图片质量
	  	  overwrite: true//是否覆盖新生成的文件
	  	}, function(e){
	  	  //压缩完成后，检测图片是否成功
	  	  plus.io.resolveLocalFileSystemURL(path, function(entry){
	  	  	var compress_path = entry.toLocalURL();
	  	  	that.fullLocalImgUrl = compress_path;//压缩转换图片的本地路径
	  	  	that.localImgUrl = path;//相对路径
	  	  	//e.target-压缩转换后的图片url路径，以"file://"开头
	  	  	that.saveImage(e.target,divid,name,compress_path);
	  	  },function(e){
	  	  	plus.nativeUI.toast('本地保存失败：' + e.message);
	  	  })
	  	}, function(e){
	  	  plus.nativeUI.toast('压缩图片失败，请稍后再试');
	  	})
	},
	/**
   * 保存压缩图片
   * @param {string} target 压缩转换后的图片路径
   * @param {string} divid  字段名称
   * @param {string} name  图片名称
   * @param {string} path  压缩转换后图片的本地路径
   */
	saveImage: function(target, divid, name, path) {
	  	plus.nativeUI.showWaiting();
	  	this.smpImgArray.push(path);
	  	if(this.showDetailFun == undefined) {
	  	  this.showImageDetail(name, divid, target, path);
	  	} else {
	  	  this.smpCurUrl = target;
	  	  this.showDetailFun(name, divid, target, path);
	  	}
	  	plus.nativeUI.closeWaiting();
	},
	/**
   * 显示压缩图片
   * @param {string} target 压缩转换后的图片路径
   * @param {string} divid  字段名称
   * @param {string} name  图片名称
   * @param {string} path  压缩转换后图片的本地路径
   */
	showImageDetail: function(name,divid,url,path) {
		console.log(this.app);
	  	this.app.imgItemList.push({
	  	  name: name,
	  	  divid: divid,
	  	  url: url,
	  	  path: path
	  	})
	}
  }
  //模块输出
//if(typeof module != undefined && module.exports) {
//	module.exports = Camera;
//} else if(typeof define == 'function' && define.amd){
//	define(function(){
//	  return Camera;
//	})
//} else{
//	var global = (function(){
//	  return this || (0, eval)('this');
//	})();
//	('Camera' in global) && (global.Camera = Camera);
//}
  window.Camera = Camera;
})(window.Camera);




//var sltImgCount = 0,
//  showDetailFun = undefined,
//  callBackFun = undefined,
//  ocalImgUrl = '',
//  fullLocalImgUrl = '',
//  smpImgArray = [],
//  smpCurUrl = '';
  //相册选择或拍照
//function showActionSheet(item) {
//	var divid = item.id,
//	   imgCount = item.imgCount || 5,
//	   showDetailFun = item.showDetailFun,
//	   callBackFun = item.callBackFun || undefined;
//	if(item.type == 'paizhao') {
//	  getImage(divid,item);
//	} else {
//	  var actionSheet = {
//	  	title: '选取照片',
//	  	cancel: '取消',
//	  	buttons: [{
//	  	  title: '拍照'
//	  	},{
//	  	  title: '相册选取'
//	  	}]
//	  }
//	  plus.nativeUI.actionSheet(actionSheet, function(e){
//	  	if(e.index === 1) {
//	  	  getImage(divid, item);
//	  	} else if(e.index === 2) {
//	  	  galleryImage(divid, item);
//	  	}
//	  })
//	}
//}
  
  
  
 
  
  