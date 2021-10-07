<?php
    error_reporting(0);

    $name=$_POST["name"];
    $email=$_POST["email"];
    $message=$_POST["message"];

    $to_email = "it21072642@my.sliit.lk";
    $subject = "Hello there!";
    $body = "From : ".$email."\nName : ".$name."\nMessage: ".$message;
    $headers = "";
    
    if (mail($to_email, $subject, $body, $headers)) {
        echo "{\"success\":true,\"message\":\"Email sent successfully\"}";
    } else {
        echo "{\"success\":false,\"message\":\"Failed to send mail\"}";
    }

?>