<?php
    require('init.php');
    @$uid = intval($_POST['uid']);
    @$bid = intval($_POST['bid']);
    $output = [];

    if(!$uid || !$bid){
        $output["code"]=4;
        $output['msg'] = '传入的bid、uid不能为空!';
    }else if(is_nan($uid) || is_nan($bid)){
        $output["code"]=4;
        $output['msg'] = '传入的bid、uid必须是一个大于0的整数!';
    }else{
        //判断书车表中是否已经存在该商品记录
        $cid = mysqli_fetch_assoc(mysqli_query($conn,"select cid from bs_cart where uid=$uid and bid=$bid"))['cid'];

        if($cid){
          if(mysqli_query($conn,"update bs_cart set bookCount=bookCount+1 where cid = $cid")){
            $output["code"] = 1;
            $output["isExist"] = true;
          }else{
            $output["code"]=4;
            $output['msg'] = '更新购物车数量失败，请联系管理员!';
          }
        }
        else { //之前从未购买过该商品，则添加购买记录，购买数量为1
          if(mysqli_query($conn,"INSERT INTO bs_cart values(null, $uid, $bid, 1, 1, now(), now())")){
            $output["code"] = 1;
            $output["isExist"] = false;
          }else{
            $output["code"]=4;
            $output['msg'] = '添加到书车失败，请联系管理员!';
          }
        }
    }
    echo json_encode($output);
?>