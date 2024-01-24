<?php
require("connection.php");
$data = json_decode(file_get_contents("php://input"), true);
session_start();
$loggedinemail = $_SESSION["user"];
$query = "SELECT * FROM e1seat where email= '$loggedinemail'";
    if (mysqli_num_rows(mysqli_query($con, $query))) {
        die("You already booked a seat");
    }
if (isset($data['v1'])) {
    $status = "Occupé";
    $v1 = $data['v1'];
    $statusoc = "Occupé";
    $req = "INSERT INTO e1seat(seat_number, status, email) VALUES(?,?,?)";
    $init = mysqli_stmt_init($con);
    $prep = mysqli_stmt_prepare($init, $req);
    if ($prep) {
        mysqli_stmt_bind_param($init, "iss", $v1, $status, $_SESSION["user"]);
        mysqli_stmt_execute($init);
        echo "seat registrated successfully";
    } else {
        die("Seat not registrated");
    }
} else {
    echo "Error: No data received";
}
