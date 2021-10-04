<?php
    require '../../config/config.php';

    $function=$_POST["function"];
    $email=$_POST["email"];

    if($function =="getActiveOrders"){
        $sql = "SELECT o.orderID, o.email, o.placedDate, o.orderStatus , p.productName  FROM Orders o, Products p WHERE o.orderStatus='Active' AND o.productID=p.productID AND o.email='$email'";
        $result = $conn->query($sql);
        
        $results = array();
        while($row = $result->fetch_assoc()) {
            $results[] = $row;
        }

        echo json_encode($results);

    }else if($function =="getCompletedOrders"){
        $sql = "SELECT o.orderID, o.email, o.placedDate, o.orderStatus, p.productName  FROM Orders o, Products p WHERE o.orderStatus='Completed' AND o.productID=p.productID AND o.email='$email'";
        $result = $conn->query($sql);
        
        $results = array();
        while($row = $result->fetch_assoc()) {
            $results[] = $row;
        }

        echo json_encode($results);

    }

    $conn->close();
?>