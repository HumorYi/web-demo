<?php
    require('init.php');
    @$bid = intval($_REQUEST['bid']);
    $output = [];
    if(!$bid){
        $output["code"]=4;
        $output['msg'] = '传入的bid不能为空';
    }else if(is_nan($bid)){
        $output["code"]=4;
        $output['msg'] = '传入的bid必须是一个大于0的整数';
    }else{
        if($output['data'] = mysqli_fetch_assoc(mysqli_query($conn,"select * from bs where bid=$bid"))){
            $output["code"]=1;
        }else{
            $output["code"]=4;
            $output['msg'] = '查询数据失败，请联系管理员！';
        }
    }
    echo json_encode($output);
?>