/**
 * 公共信息
 */

/**
 * 全局函数
 * 
 */
(function($, owner){
  /**
   * 根据id获取dom节点
   * @param {Object} id
   */
  owner.id = function(id) {
  	return document.getElementById(id);
  }
	
}(mui, window.g = window.g || {}));
