<?php
    require('init.php');

    @$uid = intval($_REQUEST['uid']);
    $output = [];

    if(!$uid){
        $output["code"]=4;
        $output["msg"]='传入的uid不能为空';
    }else{
        $rows = mysqli_fetch_all(mysqli_query($conn,"SELECT * from bs_order WHERE uid=$uid order by updateTime"), MYSQLI_ASSOC);

        if ($rows) {
            $output["code"] = 1;
            $output['data'] = $rows;
        }
    }
    echo json_encode($output);
?>