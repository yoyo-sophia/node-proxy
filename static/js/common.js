(function ($) {
    //默认参数宽高
    var defaults = {
        width: 500,
        height:500,
        btnColse:'.btn-close',
        objForm:'.commForm'
    };
    var methods = {
        "Close":function (contentObj,obj) {
            //contentObj 为当前的弹出内容
            contentObj.addClass("none");
            $(".fixed-wrap").addClass("none");
            $(obj+' input').val("");
        }
    };
    $.fn.showDialog = function (opts) {
        //替换默认属性
        var options = $.extend({},defaults,opts);
        //    支持链式调用
        return this.each(function(e){
        //取消冒泡
            var e = window.event || e;
            if(e && e.stopPropagation) {
                e.stopPropagation();
            }else{
                e.cancelBubble = true;
            }
            //获取当前dom的jquery对象
            var $this = $(this);
            //显示弹窗
            $this.removeClass("none");
            $(".fixed-wrap").removeClass("none");
            //设置弹窗居中
            $this.css({
                "width":options.width+'px',
                "height":options.height+'px',
                "margin-left":(-options.width/2)+'px',
                "margin-top":(-options.height/2)+'px'
            });
            //左上角关闭按钮
            $(options.btnColse).on("click",function () {
                methods.Close($this,opts.objForm);
            });
            //遮罩及按钮
            $(".btn-comfirm,.btn-cancle,.fixed-wrap").on('click',function () {
                methods.Close($this,opts.objForm);
            })
        })
    };
})(jQuery);
