<?php
    require('init.php');
    @$uid = intval($_POST['uid']);
    @$cids = explode(",",$_POST['cids']);
    @$isSelect = intval($_POST['isSelect']);
    $output = [];
    $count=count($cids);

    for ($i=0; $i<$count; $i++) {
         if (mysqli_query($conn, "UPDATE bs_cart SET isSelect = $isSelect WHERE uid = $uid and cid = $cids[$i]")) {
            $output["code"] = 1;
        }
        else{
            $output["code"] = 4;
            $output["msg"]='更改选中物品失败，请联系管理员！';

            return;
        }
    }

    echo json_encode($output);
?>