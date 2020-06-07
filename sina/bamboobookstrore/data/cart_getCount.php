<?php
    require('init.php');
    @$uid = intval($_REQUEST['uid']);
    $output = [];

    if(!$uid){
        $output["code"]=4;
        $output['msg'] = '传入的用户id不能为空';
    }else if(is_nan($uid)){
        $output["code"]=4;
        $output['msg'] = '传入的用户id必须是一个大于0的整数';
    }else{
        $output['code'] = 1;
        $output['cartBadge'] = count(mysqli_fetch_all(mysqli_query($conn,"SELECT * from bs_cart where uid = $uid"), MYSQLI_ASSOC));
    }

    echo json_encode($output);
?>