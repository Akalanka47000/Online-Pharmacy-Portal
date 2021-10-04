<?php
    require '../../../config/config.php';

    $function=$_POST["function"];

    if($function =="registerUser"){
        if ($_SERVER['REQUEST_METHOD'] == 'POST'){
            
            $email=$_POST["email"];
            $username=$_POST["username"];
            $password=$_POST["password"];
            $address=$_POST["address"];
        
            $sql = "INSERT INTO Users (email, username, password, userRole, address)
            VALUES ('$email', '$username', '$password' , 'User', '$address')";
        
            $result='';
        
            if ($conn->query($sql) === TRUE) {
            $result="{\"success\":true,\"message\":\"User added successfully\"}";
            } else {
            $result="{\"success\":false,\"message\":\"".$conn->error."\"}";
            }
        
            echo $result;
        }
        
    }

    $conn->close();
?>