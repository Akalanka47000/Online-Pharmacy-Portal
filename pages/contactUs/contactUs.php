<?php
    error_reporting(0);

    $name=$_POST["name"];
    $email=$_POST["email"];
    $message=$_POST["message"];

    $to_email = "it21072642@my.sliit.lk";
    $subject = "Hello there!";
    $body = "From : ".$email."\nName : ".$name."\nMessage: ".$message;
    
    if (mail($to_email, $subject, $body, "")) {
        echo "{\"success\":true,\"message\":\"Email sent successfully\"}";
    } else {
        echo "{\"success\":false,\"message\":\"Failed to send mail\"}";
    }

?>