<?php
    require('init.php');
    @$uid = $_POST['uid'];
    @$uname = $_POST['uname'];
    $output = [];
    if(!$uid || !$uname){
        $output["code"]=4;
        $output['msg'] = '传入的uid、uname不能为空';
    }
    else{
        if (mysqli_query($conn, "update bs_users set uname = '$uname' where uid = $uid ")) {
            $output["code"] = 1;
        }
        else {
            $output["code"] = 4;
            $output['msg'] = '修改用户名失败，请联系管理员，谢谢!';
        }
    }
    echo json_encode($output);
?>