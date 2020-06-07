<?php
    require('init.php');
    @$kw = $_REQUEST['kw'];
    $output = [];

    if(!$kw){
        $output["code"]=4;
        $output['msg'] = '传入的kw不能为空';
    }else{
        if($output['data'] = mysqli_fetch_all(mysqli_query($conn,"select * from bs where name like '%$kw%' "), MYSQLI_ASSOC)){
            $output["code"]=1;
        }
    }
    echo json_encode($output);
?>