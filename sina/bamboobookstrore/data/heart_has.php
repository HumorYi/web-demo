<?php
    require('init.php');
    @$bid = intval($_REQUEST['bid']);
    @$uid = intval($_REQUEST['uid']);
    $output = [];

    if(!$bid || !$uid){
        $output["code"]=4;
        $output['msg'] = '传入的 bid、uid 不能为空';
    }else if(is_nan($bid) || is_nan($uid)){
        $output["code"]=4;
        $output['msg'] = '传入的bid、uid必须是大于0的整数';
    }else{
        if(mysqli_fetch_assoc(mysqli_query($conn,"select hid from bs_heart where bid=$bid and uid=$uid"))){
            $output['code']=1;
            $output["isHeart"]=true;
        }
        else {
            $output['code']=1;
            $output["isHeart"]=false;
        }
    }
    echo json_encode($output);
?>