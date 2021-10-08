<?php
    require '../../../config/config.php';

    $function=$_POST["function"];

    if($function =="getUsers"){
        $sql = "SELECT * FROM Users WHERE userRole!='User'";
        $result = $conn->query($sql);
        
        $results = array();
        while($row = $result->fetch_assoc()) {
            $results[] = $row;
        }

        echo json_encode($results);
        
    }else if($function =="addUser"){
        if ($_SERVER['REQUEST_METHOD'] == 'POST'){
            // $password_string = '!@#$%*&abcdefghijklmnpqrstuwxyzABCDEFGHJKLMNPQRSTUWXYZ23456789';
            // $password = substr(str_shuffle($password_string), 0, 12);
            $password = "123456";
            $encrypedPassword = md5($password);

            $email=$_POST["email"];
            $username=$_POST["username"];
            $userRole=$_POST["userRole"];
        
            $sql = "INSERT INTO Users (email, username, password, userRole, address)
            VALUES ('$email', '$username', '$encrypedPassword' , '$userRole', 'NULL')";

            $result='';

            if ($conn->query($sql) === TRUE) {
                $to_email = $email;
                $subject = "Simple Meds Login Credentials";
                $body = "Congratulations! You have been added as a ".$userRole." to the Simple Meds Web Portal. Following are your login credentials:\nUsername : ".$username."\nPassword: ".$password."\n\nThank You.\nBest Regards,\nSimple Meds Team.";

                if(mail($to_email, $subject, $body, "")){
                    $result="{\"success\":true,\"message\":\"User added successfully\"}";
                }else{
                    $result="{\"success\":false,\"message\":\"User added sucessfully but failed to send email\"}";
                }

            } else {
                $result="{\"success\":false,\"message\":\"".$conn->error."\"}";
            }
        
            echo $result;

        }
        
    }else if($function =="deleteUser"){
        $email=$_POST["email"];
        $sql = "DELETE FROM Users WHERE email='$email'";
        
        $result='';
        
        if ($conn->query($sql) === TRUE) {
            $to_email = $email;
            $subject = "Access Revoked";
            $body = "Your access to the Simple Meds Web Portal has been revoked\n\nThank You.\nBest Regards,\nSimple Meds Team.";
            mail($to_email, $subject, $body, "");
            $result="{\"success\":true,\"message\":\"User deleted successfully\"}";
        } else {
            $result="{\"success\":false,\"message\":\"".$conn->error."\"}";
        }
        
        echo $result;
    }


    $conn->close();
