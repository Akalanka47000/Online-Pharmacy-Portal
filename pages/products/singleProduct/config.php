<?php

    require "../../../config/config.php";
    $dbServerName = "localhost";
    $dbuserName="root";
    $dbPassword= "";
    $dbName="pharmacydb";

    $conn = mysqli_connect($dbServerName,$dbuserName,$dbPassword,$dbName);
    if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";
    $json=array();
    $sql ="Select * from products";
    $stmt=$conn->prepare($sql);
    $stmt->execute();
    $result=$stmt->get_result();
        //echo"<pre>";
    while($row=$result->fetch_assoc()){
        array_push($json,$row);
    }
    echo json_encode($json);
    $con->close();
?>