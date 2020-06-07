<?php
    require('init.php');
    $uid = intval($_REQUEST['uid']);
    $output = [];

    if(!$uid){
        $output["code"]=4;
        $output['msg'] = '传入的用户id不能为空';
    }else if(is_nan($uid)){
        $output["code"]=4;
        $output['msg'] = '传入的用户id必须是一个大于0的整数';
    }else{
        if($output['data'] = mysqli_fetch_all(mysqli_query($conn,"select bs_heart.hid,bs_heart.bid,bs.name,bs.img_sm,bs.price,bs.author,bs.buyCount from bs_heart,bs where bs_heart.bid=bs.bid and bs_heart.uid=$uid order by bs_heart.updateTime desc"), MYSQLI_ASSOC)){
            $output['code'] = 1;
        }
    }
    echo json_encode($output);
?>