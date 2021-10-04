<?php
    require '../../../config/config.php';

    $function=$_POST["function"];

    if($function =="loginUser"){
        if ($_SERVER['REQUEST_METHOD'] == 'POST'){
            
            $email=$_POST["email"];
            $password=$_POST["password"];
        
            $sql = "SELECT * FROM Users WHERE email='$email' AND password='$password'";
            $result = $conn->query($sql);
            $userRole = "";
            while($row = $result->fetch_assoc()) {
                $userRole = $row["userRole"];
            
            }
            echo json_encode($result);

            if (!empty($result)) {
                echo "{\"success\":true,\"userRole\":\"".$userRole."\"}";
            } else {
                echo "{\"success\":false,\"message\":\"Invalid credentials\"}";
            }
        
        }
        
    }

    $conn->close();
?>