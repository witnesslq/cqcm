	/***
	 * 定义复杂覆盖物
	 * @param point
	 * @param text
	 * @param mouseoverText
	 * @returns {ComplexCustomOverlay}
	 * @author chen.yiwan
	 */
    function ComplexCustomOverlay(point, html, tip){
      this._point = point;
      this._text = html;
      this._tip = tip;
      this.titleSpan=null;	//标题对象
      this.detailSpan=null;	//当前人次及滞留人次对象
      this._div=null;
      this.img=null;	//前置图标对象
    }
    ComplexCustomOverlay.prototype.titleSpan=null;
    ComplexCustomOverlay.prototype = new BMap.Overlay();
    ComplexCustomOverlay.prototype.initialize = function(map){
      this._map = map;
      var div = this._div = document.createElement("div");
      div.style.position = "absolute";
      div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
      //div.style.background = "url(./images/circle.png) no-repeat";
      div.style.color = "white";
      div.style.padding = "2px";
      div.style.whiteSpace = "nowrap";
      div.style.MozUserSelect = "none";
      div.style.fontSize = "16px";
      div.style.fontWeight="bold";
      
      //前置图标对象
      var img=document.createElement("img");
      img.src="/cqcm/cqb/images/unSelected.png";
      img.style.verticalAlign="top";
      img.style.width="18px";
      img.style.height="18px";
      img.style.paddingTop="2px";
      div.appendChild(img);
      this.img=img;
      
      //标题对象 
      var span = this._span = document.createElement("span");
      span.innerHTML=this._text;
      div.appendChild(span);    
      this.titleSpan=span;
      var that = this;

      var arrow = this._arrow = document.createElement("div");
      arrow.style.position = "absolute";
      arrow.style.top = "22px";
      arrow.style.left = "0px";
      arrow.style.fontSize="14px";
      
      //详情对象
      var span1=document.createElement("span");
      span1.innerHTML=this._tip;
      arrow.appendChild(span1);
      this.detailSpan=span1;
      div.appendChild(arrow);
     
      /***
      div.onmouseover = function(){
        this.style.backgroundColor = "#6BADCA";
        this.style.borderColor = "#0000ff";
        this.getElementsByTagName("span")[0].innerHTML = that.tip;
        arrow.style.backgroundPosition = "0px -20px";
      }

      div.onmouseout = function(){
        this.style.backgroundColor = "#EE5D5B";
        this.style.borderColor = "#BC3B3A";
        this.getElementsByTagName("span")[0].innerHTML = that._text;
        arrow.style.backgroundPosition = "0px 0px";
      }
      ***/

      map.getPanes().labelPane.appendChild(div);
      
      return div;
    }
    
    ComplexCustomOverlay.prototype.draw = function(){
      var map = this._map;
      var pixel = map.pointToOverlayPixel(this._point);
      this._div.style.left = pixel.x - parseInt(this._arrow.style.left) + "px";
      this._div.style.top  = pixel.y - 30 + "px";
    }
    
    /***
     * 封装对外提供的点击选择事件，
     * author:chen.yiwan
     */
    ComplexCustomOverlay.prototype.selected=function(){
    	this.titleSpan.style.color="red";
    }
    ComplexCustomOverlay.prototype.unSelected=function(){
    	this.titleSpan.style.color="white";
    }
    /***
     * 对外提供更新显示内容的方法
     * @param innerHTML
     * @author chen.yiwan
     */
    ComplexCustomOverlay.prototype.setDetailInfo=function(innerHTML){
    	this.detailSpan.innerHTML=innerHTML;
    }
    
    /***
     * 对外提供修改image图标的方法
     * @param imageName
     * @author chen.yiwan
     */
    ComplexCustomOverlay.prototype.changeImg=function(imageName){
    	this.img.src="/cqcm/cqb/images/"+imageName;
    }
    