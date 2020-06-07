/**
 * Created by luoxing on 2018/4/9 15:30
 */

$(function() {
    // 为需要验证的表单元素添加验证规则
    (function() {
        $("#username").data("bv", {
            "require"       : {
                "val" : true,
                "msg" : "用户名必须填写"
            },
            "regex"         : {
                "val" : "^\w+$",
                "msg" : "用户应该是由字母数字下划线所组成"
            },
            "betweenlength" : {
                "val" : "6-12",
                "msg" : "用户名长度必须是在6-12位字符之间"
            }
        });
        $("#pwd").data("bv", {
            "require"       : {
                "val" : true,
                "msg" : "密码必须填写"
            },
            "regex"         : {
                "val" : "^[A-z\d]+$",
                "msg" : "密码应该是由字母数组所组成"
            },
            "betweenlength" : {
                "val" : "8-12",
                "msg" : "密码度必须是在8-12位字符之间"
            }
        });
        $("#verifyCode").data("bv", {
            "require" : {
                "val" : true,
                "msg" : "验证码必须填写"
            },
            "length"  : {
                "val" : "4",
                "msg" : "验证码必须是四位"
            },
            "regex"   : {
                "val" : "^[A-z\d]+$",
                "msg" : "验证码必须是由字母和数字所组成、长度为四位的序列"
            }
        });
    })();

    $("#formLogin").bootStrapValidator(1)
                   .on("error", function(e, args) {
                       console.log("error");
                   })
                   .on("success", function(e, args) {
                       console.log("success");
                       this.submit();
                       return false;
                   })
    ;
});