<?php
    require '../../config/config.php';

    $function=$_POST["function"];

    if($function =="getTopSellingProducts"){
        $sql = "SELECT * FROM Products ORDER BY itemsSold DESC LIMIT 2";
        $result = $conn->query($sql);
        
        $results = array();
        while($row = $result->fetch_assoc()) {
            $results[] = $row;
        }

        echo json_encode($results);
        
    }

    $conn->close();
?>