<?php
    require "../../../config/config.php";

    $function=$_POST["function"];
    
    if($function == "getAllProducts"){
        $sql = "SELECT * FROM Products";
        $result = $conn->query($sql);

        $results = array();
        while($row = $result->fetch_assoc()){
            $results[]=$row;
        }

        echo json_encode($results);
    }
    $conn->close();
