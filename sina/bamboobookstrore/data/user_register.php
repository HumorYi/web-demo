<?php
    require('init.php');
    @$uname = $_POST['uname'];
    @$upwd = $_POST['upwd'];
    $output = [];
    if(empty($uname) || empty($upwd)){
        $output["code"]=4;
        $output["msg"]='传入的uname、upwd不能为空';
    }else{
        if(mysqli_fetch_assoc(mysqli_query($conn, "select uid from bs_users where uname = '$uname'"))){
           $output['code'] = 4;
           $output["msg"]='注册失败，该用户名已存在！';
        }else{
           if($output['code'] = mysqli_query($conn, "insert into bs_users values(null, '$uname', '$upwd', now(), now())")){
               $output['code'] = 1;
               $output["msg"]='注册成功，请登录！';
           }else{
               $output['code'] = 4;
               $output["msg"]='注册失败，请联系管理员！';
           }
        }
    }
    echo json_encode($output);
?>