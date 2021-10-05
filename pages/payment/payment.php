<?php
    require '../../config/config.php';

    $function=$_POST["function"];

    if($function =="processPayment"){
        $email=$_POST["email"];

        $sqlSelect = "SELECT * FROM Orders WHERE email = '$email' AND orderStatus='InCart'";

        $queryResult = $conn->query($sqlSelect);

        $success = TRUE;
        if ($queryResult->num_rows > 0) {
            while($row = $queryResult->fetch_assoc()) {
                $productID=$row["productID"];
                $sql = "UPDATE Products set itemsSold = itemsSold+1 WHERE productID = '$productID'";
                if ($conn->query($sql) !== TRUE) {
                    $success=FALSE;
                }
            }
        }

        $sql = "UPDATE Orders set orderStatus = 'Active' WHERE email = '$email' AND orderStatus='InCart'";
        
        $result='';

        if ($conn->query($sql) === TRUE && $success === TRUE) {
            $result="{\"success\":true,\"message\":\"Payment processed successfully\"}";
        } else {
            $result="{\"success\":false,\"message\":\"Payment rejected\"}";
        }
        echo $result;
    }

    $conn->close();
?>