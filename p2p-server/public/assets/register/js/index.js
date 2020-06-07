/**
 * Created by luoxing on 2018/4/9 15:30
 */

$(function() {
    // 为需要验证的表单元素添加验证规则
    (function(){
        $("#phone").data("bv", {
            "require" : {
                "val" : true,
                "msg" : "手机号码为必填项"
            },
            "mobile"  : {
                "val" : true,
                "msg" : "手机号码不合法"
            }
        });
        $("#verifyCode").data("bv", {
            "require" : {
                "val" : true,
                "msg" : "验证码为必填项"
            },
            "integer" : {
                "val" : true,
                "msg" : "验证码必须是整数"
            },
            "length"  : {
                "val" : 6,
                "msg" : "验证码必须是6位"
            }
        });
        $("#loginPwd").data("bv", {
            "require"       : {
                "val" : true,
                "msg" : "登录密码必须填写"
            },
            "regex"         : {
                "val" : "^[A-z\d]+$",
                "msg" : "登录密码应该是由字母数组所组成"
            },
            "betweenlength" : {
                "val" : "8-12",
                "msg" : "登录密码长度必须是8到12位之间"
            },
            "equalto"       : {
                "val" : "#confirmPwd",
                "msg" : "登录密码和确认密码不一致"
            }
        });
        $("#confirmPwd").data("bv", {
            "require"       : {
                "val" : true,
                "msg" : "确认密码必须填写"
            },
            "regex"         : {
                "val" : "^[A-z\d]+$",
                "msg" : "确认密码应该是由字母数组所组成"
            },
            "betweenlength" : {
                "val" : "8-12",
                "msg" : "确认密码长度必须是8到12位之间"
            },
            "equalto"       : {
                "val" : "#loginPwd",
                "msg" : "确认密码和登录密码不一致"
            }
        });
    })();

    $("#formRegister").bootStrapValidator()
                      .on("error", function(e, args) {
                          console.log("error");
                      })
                      .on("success", function(e, args) {
                          console.log("success");
                          this.submit();
                          return false;
                      })
    ;

    $("#phone").on("blur", function(e) {
        $("#btnVerifyCode").prop("disabled", $(this).parent(".input-group").hasClass("has-error"));
    });

    var second = 60;
    $("#btnVerifyCode").on("click", function(e) {
        var $this = $(this);
        $this.prop("disabled", true).text("请" + second + "秒后重新获取");

        var timer = setInterval(function() {
            $this.text("请" + (--second) + "秒后重新获取");

            if (second === 0) {
                clearInterval(timer);
                $this.prop("disabled", $("#btnVerifyCode").parent(".input-group").hasClass("has-error")).text("获取验证码");
                second = 60;
            }
        }, 1000);
    });
});