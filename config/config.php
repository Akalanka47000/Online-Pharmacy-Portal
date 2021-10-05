<?php
    require 'initializeDB.php';

    error_reporting(0);

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "pharmacyDB";

    $tryCount=0;
    while($tryCount<2){
        $conn = new mysqli($servername, $username, $password, $dbname);
        if ($conn->connect_error) {
             if(str_contains($conn->connect_error,'Unknown database')){
                initializeDB();
             }
             $tryCount++;
        }else{
            break;
        }
    }
    
?>