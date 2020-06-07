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
        if($output['data'] = mysqli_fetch_all(mysqli_query($conn,"select bs_cart.cid,bs_cart.bid,bs_cart.bookCount,bs_cart.isSelect,bs.name,bs.img_sm,bs.price,bs.author from bs_cart,bs where bs_cart.bid=bs.bid and bs_cart.uid=$uid order by bs_cart.updateTime desc"), MYSQLI_ASSOC)){
            $output['code'] = 1;
        }
    }
    echo json_encode($output);
?>