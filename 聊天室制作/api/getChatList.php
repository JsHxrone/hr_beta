<?php

    if (!isset($_COOKIE["username"])){
        echo json_encode(
        array('vaild' => false,'isLogin' =>'您未登陆'),JSON_UNESCAPED_UNICODE
        );
       exit();
    }


   include 'conn.php';
   $result = mysqli_query($conn,'SELECT * FROM chatList');
   $users = mysqli_fetch_all($result,MYSQLI_ASSOC);
   echo json_encode($users);