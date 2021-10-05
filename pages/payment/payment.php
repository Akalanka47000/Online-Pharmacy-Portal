<?php
    require '../../config/config.php';

    $function=$_POST["function"];

    if($function =="processPayment"){
        $email=$_POST["email"];
        $sql = "UPDATE Orders set orderStatus = 'Active' WHERE email = '$email'";
        $result='';
        
        if ($conn->query($sql) === TRUE) {
            $result="{\"success\":true,\"message\":\"Payment processed successfully\"}";
        } else {
            $result="{\"success\":false,\"message\":\"Payment rejected\"}";
        }
        echo $result;
    }

    $conn->close();
?>