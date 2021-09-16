<?php
    require '../../config/config.php';
    $function=$_POST["function"];

    if($function =="getCartItems"){
        $email=$_POST["email"];
        $sql = "SELECT p.productName, p.productDescription , p.productPrice , p.productCategory, p.productBrand FROM Orders o, Products p WHERE o.orderStatus='InCart' AND o.productID=p.productID AND o.email='$email'";
        $result = $conn->query($sql);
        
        $results = array();
        while($row = $result->fetch_assoc()) {
            $results[] = $row;
        }
        if(!$results){
            $results=[];
        }
        echo json_encode($results);
        
    }

    $conn->close();
?>