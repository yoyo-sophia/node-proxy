(function ($) {
    $.fn.checkForm = function (options) {
        var root = this;
        var isPhoneReg = "";
        var isOk = true;
        var opts = {};
        var defaults = {
            tips_success: "",
            tips_empty: "&times;不能为空",
            tips_empty_2: "&times;",
            tips_userEmpty: "&times;账号不能为空",
            tips_passwordEmpty: "&times;密码不能为空",
            tips_telphoneEmpty: "&times;手机号码不能为空",
            tips_verify: "&times;验证码错误",
            tips_mobile: "&times;手机号码格式有误",
            tips_mobile_2: "&times;",
            tips_password: "&times;密码格式数字加字母6-16位",
            tips_comfirmPassword: "&times;两次密码不一致",
            tips_user: "&times;长度6-16位不包含特殊字符",
            reg_phone: /^1[3458]{1}[0-9]{9}$/,
            reg_password: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/,
            reg_verify: /^[0-9]{1,4}/,
            reg_user: /^[\u4e00-\u9fa5_a-zA-Z0-9_]{6,16}$/,
            reg_code: /^[a-zA-Z0-9\s]{15,20}$/,
            reg_bankNum: /^[0-9]{16,19}$/
        };
        if (options) {
            opts = $.extend({}, defaults, options);
        }
        $(":text,:password,textarea", root).each(function () {
            $(this).blur(function () {
                var _validate = $(this).attr("check");
                if (_validate) {
                    var arr = _validate.split(" ");
                    for (var i = 0; i < arr.length; i++) {
                        if (!check($(this), arr[i], $(this).val())) {
                            $(this).attr("flag", "false");
                            return false
                        } else {
                            $(this).attr("flag", "true");
                            continue
                        }
                    }
                }
            })
        });
        var check = function (obj, _match, _val) {
            switch (_match) {
                case"empty":
                    return _val ? showMsg(obj, defaults.tips_success, true) : showMsg(obj, defaults.tips_empty, false);
                case"empty-2":
                    return _val ? showMsg(obj, defaults.tips_success, true) : showMsg(obj, defaults.tips_empty_2, false);
                case"emptyUser":
                    return _val ? showMsg(obj, defaults.tips_success, true) : showMsg(obj, defaults.tips_userEmpty, false);
                case"emptyPassword":
                    return _val ? showMsg(obj, defaults.tips_success, true) : showMsg(obj, defaults.tips_passwordEmpty, false);
                case"emptyPhone":
                    return _val ? showMsg(obj, defaults.tips_success, true) : showMsg(obj, defaults.tips_telphoneEmpty, false);
                case"phone":
                    return chk(_val, defaults.reg_phone) ? showMsg(obj, defaults.tips_success, true) : showMsg(obj, defaults.tips_mobile, false);
                case"phone-2":
                    return chk(_val, defaults.reg_phone) ? showMsg(obj, defaults.tips_success, true) : showMsg(obj, defaults.tips_mobile_2, false);
                case"pwd1":
                    return chk(_val, defaults.reg_password) ? showMsg(obj, defaults.tips_success, true) : showMsg(obj, defaults.tips_password, false);
                    return true;
                case"pwd2":
                    return pwdEqual(_val, pwd1) ? showMsg(obj, defaults.tips_success, true) : showMsg(obj, defaults.tips_pwdequal, false);
                case"user":
                    return chk(_val, defaults.reg_user) ? showMsg(obj, defaults.tips_success, true) : showMsg(obj, defaults.tips_user, false);
                case"verify":
                    return chk(_val, defaults.reg_verify) ? showMsg(obj, defaults.tips_success, true) : showMsg(obj, defaults.tips_verify, false);
                case"creditCode":
                    return chk(_val, defaults.reg_code) ? showMsg(obj, defaults.tips_success, true) : showMsg(obj, defaults.tips_empty_2, false);
                case"bankNum":
                    return chk(_val, defaults.reg_bankNum) ? showMsg(obj, defaults.tips_success, true) : showMsg(obj, defaults.tips_empty_2, false);
                default:
                    return true
            }
        };
        var pwdEqual = function (val1, val2) {
            return val1 == val2 ? true : false
        };
        var chk = function (str, reg) {
            return reg.test(str)
        };
        var showMsg = function (obj, msg, flag) {
            $(obj).next(".failMessage").remove();
            var _html = "<span class='failMessage j_failMessage'><em class='icon-tip'></em>" + msg + "</span>";
            $(obj).css({"border-color": "#ff3d1d"});
            $(obj).parent().find("em").css({color: "#ff3d1d"});
            if (flag) {
                _html = "<span class='failMessage j_failMessage'><em class='icon-tip none'></em>" + msg + "</span>";
                $(obj).css({"border-color": "#63a3ff"});
                $(obj).parent().find("em").css({color: "#63a3ff"})
            }
            $(obj).after(_html);
            return flag
        };

        function _onSubmit() {
            isOk = true;
            $(":text,:password", root).each(function () {
                if(opts.isInput){
                    $(this).trigger("input");
                }
                var _validate = $(this).attr("check");
                if (_validate) {
                    var arr = _validate.split(" ");
                    for (var i = 0; i < arr.length; i++) {
                        if (!check($(this), arr[i], $(this).val())) {
                            isOk = false;
                            $(this).attr("flag", "false");
                            return
                        }
                    }
                }
            })
        }
        if (root.is("form")) {
            root.submit(function () {
                _onSubmit();
                return isOk
            })
        }
    }
})(jQuery);