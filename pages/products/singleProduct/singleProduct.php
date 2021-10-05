<?php
    require "../../../config/config.php";

    $function = $_POST["function"];

    if ($function == "getSingleProduct") {
        $productId = $_POST["productId"];
        $sql = "SELECT * FROM Products WHERE productID='$productId'";
        $result = $conn->query($sql);

        $results = array();
        while ($row = $result->fetch_assoc()) {
            $results[] = $row;
        }

        echo json_encode($results);
    } else if ($function == "addToCart") {
        $email = $_POST["email"];
        $productID = $_POST["productID"];

        $id = uniqid();
        $date = date("Y-m-d h:i:sa");
        $sql = "INSERT INTO Orders (orderID, email, productID, placedDate, orderStatus)
            VALUES ('$id', '$email', '$productID' , '$date', 'InCart')";

        $result = '';

        if ($conn->query($sql) === TRUE) {
            $result = "{\"success\":true,\"message\":\"Item added to cart\"}";
        } else {
            $result = "{\"success\":false,\"message\":\"" . $conn->error . "\"}";
        }

        echo $result;
    }
    $conn->close();
?>