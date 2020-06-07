<?php
    require('init.php');

    @$start = intval($_REQUEST['start']) | 0;
    $output = [];
    if(is_nan($start)){
         $output["code"]=4;
         $output['msg'] = '传入的start必须是一个大于0的整数';
    }
    else{
        if($output['data']=mysqli_fetch_all(mysqli_query($conn,"select * from bs limit $start,5"), MYSQLI_ASSOC)){
            $output["code"]=1;
        }else{
            $output["code"]=4;
            $output['msg'] = '查询数据失败，请联系管理员!';
        }
    }

    echo json_encode($output);
?>