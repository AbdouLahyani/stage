<?php
require("connection.php");
$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['v1'])) {
    $statusoc = "Occupé";
    $v1 = $data['v1'];
}
$query = "SELECT * FROM e1seat where status='$statusoc' and seat_number='$v1'";
if (mysqli_num_rows(mysqli_query($con, $query))) {
    die("Seat already occupied");
};
