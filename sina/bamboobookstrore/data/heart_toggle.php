<?php
    require('init.php');
    @$bid = intval($_POST['bid']);
    @$uid = intval($_POST['uid']);
    $output = [];
    if(!$bid || !$uid){
        $output["code"]=4;
        $output['msg'] = '传入的uid、bid不能为空！';
    }else if(is_nan($uid) || is_nan($bid)){
        $output["code"]=4;
        $output['msg'] = '传入的uid、bid必须是一个大于0的整数！';
    }
    else{
        $hid = mysqli_fetch_assoc(mysqli_query($conn,"select hid from bs_heart where uid=$uid and bid=$bid"))["hid"];

        // 已关注就删除关注记录，未关注就创建关注记录
        if($hid){
            if(mysqli_query($conn,"delete from bs_heart where hid=$hid")) {
                $output["code"] = 1;
                $output["isHeart"] = false;
            }
            else {
                $output["code"] = 4;
                $output["msg"] = '取消关注该书失败，请联系管理员！';
            }
        }
        else{
            if(mysqli_query($conn, "insert into bs_heart values(null,$bid,$uid,now(),now())")){
                $output["code"] = 1;
                $output["isHeart"] = true;
            }
            else{
                $output["code"] = 4;
                $output["msg"] = '关注该书失败，请联系管理员！';
            }
        }
    }
    echo json_encode($output);
?>