<?php
    require('init.php');
    @$uname = $_POST['uname'];
    @$upwd = $_POST['upwd'];
    $output = [];
    if(!$uname || !$upwd){
        $output["code"]=4;
        $output['msg'] = '传入的uname、upwd不能为空';
    }else{
        $row = mysqli_fetch_assoc(mysqli_query($conn, "select uid from bs_users where uname='$uname' and upwd='$upwd' "));
        if($row){
            $output["code"]=1;
            $output["uname"] = $uname;
            $output["uid"] = $row['uid'];
            $output['cartBadge'] = count(mysqli_fetch_all(mysqli_query($conn, "select cid from bs_cart where uid = $row[uid]"), MYSQLI_ASSOC));
        }else{
            $output["code"]=4;
            $output['msg'] = '用户名或密码输入错误！';
        }
    }
    echo json_encode($output);
?>