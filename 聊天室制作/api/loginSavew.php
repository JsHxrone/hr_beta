<?php
include 'conn.php';
$valid   = true;
$message = '';
if(isset($_GET['send']) && $_GET['send']==1){

     if (isset($_GET['username']) && $_GET['username']!="") {
           $username =  htmlentities($_GET['username'], ENT_QUOTES, 'UTF-8');
           $regexp = "/^[\x7f-\xff]+$/";

          if (!preg_match($regexp,$username)){
             $message = "用户名必须全部由中文汉字组成";
             $valid   = false;
            }

      }else{
        $message = "用户名帐号不合法";
        $valid   = false;
      }
        
      if (isset($_GET['password']) && $_GET['password']!="") {
          $password = $_GET['password'];
          $password = sha1($password);
      }else{
        $message = '密码不能为空';
        $valid   = false;
      }


     if ($valid) {
         
         $sql = "SELECT * From users WHERE userName = '$username' &&  passWord='$password'";
         $result = mysqli_query($conn,$sql);  //验证是否存在
         $row = $result->fetch_assoc();
        if(mysqli_num_rows($result) == 1 ){
                
       
                $expire=time()+60*60*24*7;
                $_SESSION['username']=$row['userName'];
                setcookie("username",$row['userName'],$expire,"/");
                setcookie("userId", $row['userId'],$expire,"/");
                setcookie("userlevel", $row['userLevel'],$expire,"/");
                $message = '登陆成功';

          }else{
              $message =  "帐号或密码不正确";
              $valid   = false;
          }

     }else{
              $message =  $message;
              $valid   = false;
     } 

}else{
  $valid   = false;
  $message = '接口调用失败';
}


// echo json_encode(
//      array('valid' => $valid, 'message' => 'a($message)'),JSON_UNESCAPED_UNICODE
// ); 
echo "callback('$message')";
?> 