<?php
    require('init.php');
    @$uid = intval($_POST['uid']);
    @$cid = intval($_POST['cid']);
    @$bookCount = intval($_POST['bookCount']);
    $output = [];

    if(mysqli_query($conn, "UPDATE bs_cart SET isSelect = 1, bookCount = $bookCount WHERE uid = $uid and cid = $cid")){
        $output["code"] = 1;
    }
    else{
        $output["code"] = 4;
        $output["msg"]='更改选中物品失败，请联系管理员！';
    }

    echo json_encode($output);
?>