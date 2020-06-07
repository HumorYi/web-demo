<?php
    require('init.php');
    @$uid = intval($_REQUEST['uid']);
    $output = [];
    if(!$uid){
        $output["code"]=4;
        $output['msg'] = '传入的uid不能为空';
    }else if(is_nan($uid)){
        $output["code"]=4;
        $output['msg'] = '传入的uid必须是大于0的整数';
    }else{
        $output["code"]=1;
        $output['heartBadge'] = count(mysqli_fetch_all(mysqli_query($conn,"select hid from bs_heart where uid=$uid"),MYSQLI_ASSOC));
        $output['orderBadge'] = count(mysqli_fetch_all(mysqli_query($conn,"select oid from bs_order where uid=$uid"),MYSQLI_ASSOC));
    }
    echo json_encode($output);
?>