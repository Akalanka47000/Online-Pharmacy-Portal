<?php
    require "../../../config/config.php";

    $function=$_POST["function"];
    
    if($function == "getAllProducts"){
        $categoryFilter=$_POST["categoryFilter"];

        $sql="";
        if($categoryFilter=="All"){
            $sql = "SELECT * FROM Products";
        }else{
            $sql = "SELECT * FROM Products WHERE productCategory='$categoryFilter'";
        }
        
        $result = $conn->query($sql);

        $results = array();
        while($row = $result->fetch_assoc()){
            $results[]=$row;
        }

        echo json_encode($results);
    }
    $conn->close();
