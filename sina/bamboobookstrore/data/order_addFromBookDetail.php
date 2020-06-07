<?php
    require('init.php');
    @$bid = intval($_POST['bid']);
    @$uid = intval($_POST['uid']);
    @$uname = $_POST['uname'];
    @$phone = $_POST['phone'];
    @$addr = $_POST['addr'];

    $output = [];


    if(!$bid || !$uid || !$uname || !$phone || !$addr){
        $output["code"]=4;
        $output['msg'] = '传入的bid, uid、uname、phone、addr不能为空';
    }else if(is_nan($bid) || is_nan($uid)){
        $output["code"]=4;
        $output['msg'] = '传入的uid必须是一个大于0的整数';
    }else{
        // 获取图书
        $book = mysqli_fetch_assoc(mysqli_query($conn, "SELECT * FROM bs where bid = $bid"));

        if ($book) {
            $price = intval($book['price']);

            $bookInfos = [];
            $bookInfo = [];
            $bookInfo['bid'] = [$bid];
            $bookInfo['price'] = $price;
            $bookInfo['bookCount'] = 1;
            array_push($bookInfos, json_encode($bookInfo));
            $bookInfos = json_encode($bookInfos);

            // TODO 这里还有支付记录，目前先不弄

            if(mysqli_query($conn, "INSERT INTO bs_order values(null, $uid, '$uname', '$phone', '$addr', $price, '$bookInfos', now(), now())")) {
                // 获取刚刚插入订单记录的oid
                $oid = mysqli_insert_id($conn);
                // 更新商品购买次数
                if (mysqli_query($conn, "UPDATE bs SET buyCount = buyCount+1 WHERE bid = $bid")) {
                    $output['code'] = 1;
                    $output['oid'] = $oid;
                }else {
                    $output['code'] = 4;
                    $output['msg'] = "更新商品购买次数失败，请联系管理员!";
                }
            }
            else {
                $output['code'] = 4;
                $output['msg'] = "生成订单失败，请联系管理员!";
            }
        }
        else {
            $output['code'] = 4;
            $output['msg'] = "找不到该书，请联系管理员!";
        }
    }

    echo json_encode($output);
?>
