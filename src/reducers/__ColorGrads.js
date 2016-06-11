var Extend = function(destination, source) {
    for (var property in source) {
        destination[property] = source[property];
    }
    return destination;
}
var Map = function(array, callback, thisObject) {
    if (array.map) {
        return array.map(callback, thisObject);
    } else {
        var res = [];
        for (var i = 0, len = array.length; i < len; i++) {
            res.push(callback.call(thisObject, array[i], i, array));
        }
        return res;
    }
}

var ColorGrads = function(options) {
    this.SetOptions(options);
    this.StartColor = this.options.StartColor;
    this.EndColor = this.options.EndColor;
    this.Step = Math.abs(this.options.Step);
};
ColorGrads.prototype = {
    //设置默认属性
    SetOptions: function(options) {
        this.options = { //默认值
            StartColor: "#fff", //开始颜色
            EndColor: "#000", //结束颜色
            Step: 20 //渐变级数
        };
        Extend(this.options, options || {});
    },
    //获取渐变颜色集合
    Create: function() {
        var colors = [],
            startColor = this.GetColor(this.StartColor),
            endColor = this.GetColor(this.EndColor),
            stepR = (endColor[0] - startColor[0]) / this.Step,
            stepG = (endColor[1] - startColor[1]) / this.Step,
            stepB = (endColor[2] - startColor[2]) / this.Step;
        //生成颜色集合
        for (var i = 0, n = this.Step, r = startColor[0], g = startColor[1], b = startColor[2]; i < n; i++) {
            colors.push([r, g, b]);
            r += stepR;
            g += stepG;
            b += stepB;
        }
        colors.push(endColor);
        //修正颜色值
        return Map(colors, function(x) {
            return Map(x, function(x) {
                return Math.min(Math.max(0, Math.floor(x)), 255);
            });
        });
    },
    //获取颜色数据
    GetColor: function(color) {
        if (/^#[0-9a-f]{6}$/i.test(color)) { //#rrggbb
            return Map([color.substr(1, 2), color.substr(3, 2), color.substr(5, 2)],
                function(x) {
                    return parseInt(x, 16);
                }
            )
        } else if (/^#[0-9a-f]{3}$/i.test(color)) { //#rgb
            return Map([color.substr(1, 1), color.substr(2, 1), color.substr(3, 1)],
                function(x) {
                    return parseInt(x + x, 16);
                }
            )
        } else if (/^rgb(.*)$/i.test(color)) { //rgb(n,n,n) or rgb(n%,n%,n%)
            return Map(color.match(/\d+(\.\d+)?\%?/g),
                function(x) {
                    return parseInt(x.indexOf("%") > 0 ? parseFloat(x, 10) * 2.55 : x, 10);
                }
            )
        } else { //color
            var mapping = {
                "red": "#FF0000",
                "blue": "#0000FF",
                "green": "#008000",
                "pink": "#FF6F88"
            }; //略
            color = mapping[color.toLowerCase()];
            if (color) {
                return Map([color.substr(1, 2), color.substr(3, 2), color.substr(5, 2)],
                    function(x) {
                        return parseInt(x, 16);
                    }
                )
            }
        }
    }
};


//////////////////////////////////////////////////


// by zhangxinxu welcome to visit my personal website http://www.zhangxinxu.com/
// 2010-03-12 v1.0.0
//十六进制颜色值域RGB格式颜色值之间的相互转换

//-------------------------------------
//十六进制颜色值的正则表达式
var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
/*RGB颜色转换为16进制*/
String.prototype.colorHex = function(){
  var that = this;
  if(/^(rgb|RGB)/.test(that)){
    var aColor = that.replace(/(?:\(|\)|rgb|RGB)*/g,"").split(",");
    var strHex = "#";
    for(var i=0; i<aColor.length; i++){
      var hex = Number(aColor[i]).toString(16);
      if(hex === "0"){
        hex += hex; 
      }
      strHex += hex;
    }
    if(strHex.length !== 7){
      strHex = that;  
    }
    return strHex;
  }else if(reg.test(that)){
    var aNum = that.replace(/#/,"").split("");
    if(aNum.length === 6){
      return that;  
    }else if(aNum.length === 3){
      var numHex = "#";
      for(var i=0; i<aNum.length; i+=1){
        numHex += (aNum[i]+aNum[i]);
      }
      return numHex;
    }
  }else{
    return that;  
  }
};

//-------------------------------------------------

/*16进制颜色转为RGB格式*/
String.prototype.colorRgb = function(){
  var sColor = this.toLowerCase();
  if(sColor && reg.test(sColor)){
    if(sColor.length === 4){
      var sColorNew = "#";
      for(var i=1; i<4; i+=1){
        sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1)); 
      }
      sColor = sColorNew;
    }
    //处理六位的颜色值
    var sColorChange = [];
    for(var i=1; i<7; i+=2){
      sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)));  
    }
    return "RGB(" + sColorChange.join(",") + ")";
  }else{
    return sColor;  
  }
};

export default ColorGrads
