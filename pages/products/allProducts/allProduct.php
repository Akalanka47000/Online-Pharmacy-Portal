<?php
require"../../config/config.php";
    // $conn=new mysqli("localhost","root","","Pharmacydb");
$function=$_POST["function"];
if($function == "getAllProducts"){
    $sql = "SELECT * FROM Products";
   $result = $conn ->query($sql);

    $results = array();
    while($row = $result->fetch_assoc()){
        $result[]=$row;
    
    echo json_encode($results);}
}
    
$conn->close();
?>