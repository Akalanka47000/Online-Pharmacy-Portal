<?php
    error_reporting(0);

    $servername = "localhost";
    $username = "root";
    $password = "";

    $conn = new mysqli($servername, $username, $password);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "CREATE DATABASE IF NOT EXISTS PharmacyDB;";
    if ($conn->query($sql) === TRUE) {
        $dbname = "PharmacyDB";
        $conn = new mysqli($servername, $username, $password, $dbname);
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $results = [];

        $table1 = "CREATE TABLE IF NOT EXISTS Users (
            email VARCHAR(30),
            username VARCHAR(20),
            password VARCHAR(20),
            userRole VARCHAR(10),
            address VARCHAR(40),
            constraint user_pk primary key (email)
        )";

        $table2 = "CREATE TABLE IF NOT EXISTS Products (
            productID VARCHAR(20),
            productName VARCHAR(30),
            productDescription VARCHAR(200),
            productImage VARCHAR(65535),
            productPrice DECIMAL (10, 2),
            productCategory VARCHAR (50),
            productBrand VARCHAR (30),
            availableStocks INTEGER,
            itemsSold INTEGER,
            constraint product_pk primary key (productID)
        )";

        $table3 = "CREATE TABLE IF NOT EXISTS Orders(
            orderID VARCHAR(20),
            email VARCHAR(30),
            productID VARCHAR(20),
            placedDate DATETIME,
            orderStatus VARCHAR(15),
            constraint orders_PK PRIMARY KEY (orderID),
            constraint orders_fk1 FOREIGN KEY (email) REFERENCES Users(email),
            constraint orders_fk2 FOREIGN KEY (productID) REFERENCES Products(productID)
        )";

        $table4 = "CREATE TABLE IF NOT EXISTS Chatrooms(
            chatroomID VARCHAR(20),
            participant1Email VARCHAR(30),
            participant2Email VARCHAR(30),
            chatroomStatus VARCHAR(15),
            constraint chatroom_pk primary key (chatroomID),
            constraint chatroom_pk_fk1 FOREIGN KEY(participant1Email) REFERENCES Users(email),
            constraint chatroom_pk_fk2 FOREIGN KEY(participant2Email) REFERENCES Users(email)
        )";

        $table5 = "CREATE TABLE IF NOT EXISTS Messages(
            messageID VARCHAR(20),
            messageBody VARCHAR(200),
            createdAt DATETIME,
            senderEmail VARCHAR(30),
            chatroomID VARCHAR(20),
            constraint msg_pk primary key(messageID),
            constraint msg_fk1 foreign key (senderEmail) references Users(email),
            constraint msg_fk2 foreign key (chatroomID) references Chatrooms(chatroomID)
        )";

        $tables = [$table1, $table2, $table3, $table4, $table5];

        foreach($tables as $k => $sql){
            $query = @$conn->query($sql);

            if(!$query){
                $results[] = "Table $k : Creation failed ($conn->error)";
            }else{
                $results[] = "Table $k : Creation done";
            }                               
        }

    } else {
        echo "Error creating database: " . $conn->error;
    }
    
?>