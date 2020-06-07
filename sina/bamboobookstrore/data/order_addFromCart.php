<?php
    require('init.php');
    @$cids = explode(",", $_POST['cids']);
    @$uid = intval($_POST['uid']);
    @$uname = $_POST['uname'];
    @$phone = $_POST['phone'];
    @$addr = $_POST['addr'];
    @$cidCount = count($cids);
    $output = [];
    $bookInfos = [];
    $totalPrice = 0;

    if (!$uid || !$uname || !$phone || !$addr) {
        $output["code"]=4;
        $output['msg'] = '传入的uid、uname、phone、addr不能为空';
    } else if (is_nan($uid)) {
        $output["code"]=4;
        $output['msg'] = '传入的uid必须是一个大于0的整数';
    } else {
        for ($i=0; $i<$cidCount; $i++) {
            $cid = $cids[$i];
            // 获取书车
            $cart = mysqli_fetch_assoc(mysqli_query($conn, "SELECT * FROM bs_cart where cid = $cid"));
            if ($cart) {
                $bid = $cart['bid'];
                // 获取图书
                $book = mysqli_fetch_assoc(mysqli_query($conn, "SELECT * FROM bs where bid = $bid"));

                if ($book) {
                    $price = intval($book['price']);
                    $bookCount = $cart['bookCount'];
                    // 计算当前书的总价
                    $totalPrice += $price * $bookCount;

                    $bookInfo = [];
                    $bookInfo['bid'] = [$bid];
                    $bookInfo['price'] = $price;
                    $bookInfo['bookCount'] = $bookCount;

                    // 把当前书数据添加到书信息数组中
                    array_push($bookInfos, json_encode($bookInfo));

                    // 更新商品购买次数
                    if (!mysqli_query($conn, "UPDATE bs SET buyCount = buyCount+$bookCount WHERE bid = $bid")) {
                        $output['code'] = 4;
                        $output['msg'] = "更新商品购买次数失败，请联系管理员!";
                        return;
                    }

                    // 删除书车记录
                    if (!mysqli_query($conn, "DELETE FROM bs_cart WHERE cid = $cid")) {
                        $output['code'] = 4;
                        $output['msg'] = "删除书车记录失败，请联系管理员!";
                        return;
                    }
                }
                else {
                    $output['code'] = 4;
                    $output['msg'] = "获取图书记录失败，请联系管理员!";
                    return;
                }
            }
            else {
                $output['code'] = 4;
                $output['msg'] = "获取书车记录失败，请联系管理员!";
                return;
            }
        }

        $bookInfos = json_encode($bookInfos);
        if(mysqli_query($conn, "INSERT INTO bs_order values(null, $uid, '$uname', '$phone', '$addr', $totalPrice, '$bookInfos', now(), now())")) {
            // 获取刚刚插入订单记录的oid
            $output['code'] = 1;
            $output['oid'] = mysqli_insert_id($conn);
        }
        else {
            $output['code'] = 4;
            $output['msg'] = "生成订单失败，请联系管理员!";
        }
    }

    echo json_encode($output);
?>
