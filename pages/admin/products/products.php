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

if($function =="getAllProducts"){
    $sql = "SELECT * FROM Products";
    $result = $conn->query($sql);
    
    $results = array();
    while($row = $result->fetch_assoc()) {
        $results[] = $row;
    }

    echo json_encode($results);
    
}else if($function =="addProduct"){
    if ($_SERVER['REQUEST_METHOD'] == 'POST'){

        $id=uniqid();
        $name=$_POST["name"];
        $description=$_POST["description"];
        $image=$_POST["image"];
        $price=$_POST["price"];
        $category=$_POST["category"];
        $brand=$_POST["brand"];
        $stocks=$_POST["stocks"];
    
        $sql = "INSERT INTO Products (productID, productName, productDescription, productImage, productPrice, productCategory, productBrand, availableStocks, itemsSold)
        VALUES ('$id', '$name', '$description' , '$image','$price','$category','$brand','$stocks',0)";
    
        $result='';
    
        if ($conn->query($sql) === TRUE) {
          $result="{\"success\":true,\"message\":\"Product added successfully\"}";
        } else {
          $result="{\"success\":false,\"message\":\"".$conn->error."\"}";
        }
    
        echo $result;
    }
    
}else if($function =="editProduct"){
    if ($_SERVER['REQUEST_METHOD'] == 'POST'){

        $id=$_POST["id"];
        $name=$_POST["name"];
        $description=$_POST["description"];
        $image=$_POST["image"];
        $price=$_POST["price"];
        $category=$_POST["category"];
        $brand=$_POST["brand"];
        $stocks=$_POST["stocks"];
    
        $sql = "UPDATE Products SET productName='$name', productDescription='$description', productImage='$image', productPrice='$price', productCategory='$category', productBrand='$brand', availableStocks='$stocks'
        WHERE productID='$id' ";
    
        $result='';
    
        if ($conn->query($sql) === TRUE) {
          $result="{\"success\":true,\"message\":\"Product updated successfully\"}";
        } else {
          $result="{\"success\":false,\"message\":\"".$conn->error."\"}";
        }
    
        echo $result;
    }
    
}else if($function =="deleteProduct"){
    $productID=$_POST["productID"];
    $sql = "DELETE FROM Products WHERE productID='$productID'";
    
    $result='';
    
    if ($conn->query($sql) === TRUE) {
        $result="{\"success\":true,\"message\":\"Product deleted successfully\"}";
    } else {
        $result="{\"success\":false,\"message\":\"".$conn->error."\"}";
    }
    
    echo $result;

}else if($function =="getActiveOrders"){
    $sql = "SELECT o.orderID, o.email, o.placedDate, o.orderStatus , p.productName  FROM Orders o, Products p WHERE o.orderStatus='Active' AND o.productID=p.productID";
    $result = $conn->query($sql);
    
    $results = array();
    while($row = $result->fetch_assoc()) {
        $results[] = $row;
    }

    echo json_encode($results);

}else if($function =="getCompletedOrders"){
    $sql = "SELECT o.orderID, o.email, o.placedDate, o.orderStatus, p.productName  FROM Orders o, Products p WHERE o.orderStatus='Completed' AND o.productID=p.productID";
    $result = $conn->query($sql);
    
    $results = array();
    while($row = $result->fetch_assoc()) {
        $results[] = $row;
    }

    echo json_encode($results);

}



$conn->close();
?>