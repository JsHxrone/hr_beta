<?php
  include 'conn.php';
  $message = '';
if(isset($_GET['userid']) AND is_numeric($_GET['userid']) AND $_GET['userid']!=""){
    $result =mysqli_query($conn, 'DELETE FROM users where  userId='.$_GET['userid']);
    $message = '账户删除成功';
}
   echo json_encode(
    array('message'=>$message),JSON_UNESCAPED_UNICODE
);
?>