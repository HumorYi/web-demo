<?php
    require('init.php');
    @$uid = $_POST['uid'];
    @$oldUpwd = $_POST['oldUpwd'];
    @$newUpwd = $_POST['newUpwd'];
    $output = [];

    if(empty($uid) || empty($oldUpwd) || empty($newUpwd)){
        $output["code"]=4;
        $output["msg"]='传入的uid、oldUpwd、newUpwd不能为空';
    }else{
       $row = mysqli_fetch_assoc(mysqli_query($conn,"select * from bs_users where uid = $uid"));

        if($row){
            if ($row['upwd'] !== $oldUpwd) {
                $output["code"] = 4;
                $output["msg"]='请输入正确的旧密码';
            }
            else {
                if(mysqli_query($conn, "update bs_users set upwd = '$newUpwd' where uid = $uid ")){
                    $output["code"] = 1;
                }else{
                    $output["code"] = 4;
                    $output["msg"]='更改密码失败，请联系管理员！';
                }
            }
        }else{
            $output["code"] = 4;
            $output["msg"]='该用户不存在，请联系管理员！';
        }
    }
    echo json_encode($output);
?>