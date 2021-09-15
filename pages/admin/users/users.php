<?php
error_reporting(0);

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "PharmacyDB";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

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
    
        $email=$_POST["email"];
        $username=$_POST["username"];
        $password=$_POST["password"];
        $userRole=$_POST["userRole"];
    
        $sql = "INSERT INTO Users (email, username, password, userRole, address)
        VALUES ('$email', '$username', '$password' , '$userRole', 'NULL')";
    
        $result='';
    
        if ($conn->query($sql) === TRUE) {
          $result="{\"success\":true,\"message\":\"User added successfully\"}";
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
        $result="{\"success\":true,\"message\":\"User deleted successfully\"}";
    } else {
        $result="{\"success\":false,\"message\":\"".$conn->error."\"}";
    }
    
    echo $result;
}


$conn->close();
?>