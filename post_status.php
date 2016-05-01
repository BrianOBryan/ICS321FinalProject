<?php
//enable this when finished
//error_reporting(0);
session_start();
if (file_exists('config.php')) {
    include('config.php');
}
else {
    include('../../config.php');
}

$conn = mysql_connect($sqlHost, $sqlUser, $sqlPass) or die("Can't connect to host : " . mysql_error());

$db = mysql_select_db($sqlDatabase, $conn) or die("Can't database to database: " . mysql_error());

$error = "";

$posting= $_POST['post_desc'];
$userid = $_SESSION['login_user'];
$lat = (string)$_POST['lat'];
$lon = (string)$_POST['lon'];
$location = $lat ." ". $lon;
$timestamp = $_POST['timestamp'];

$posting = stripslashes($posting);
$posting = mysql_real_escape_string($posting);
$userid = stripslashes($userid);
$userid = mysql_real_escape_string($userid);
$location = stripslashes($location);
$location = mysql_real_escape_string($location);
$timestamp = stripslashes($timestamp);
$timestamp = mysql_real_escape_string($timestamp);


$sql = "INSERT INTO Posts (User_ID, Post_ID, Post_Desc, Location, Time_Stamp) Values (".($userid).", NULL, '$posting', '$location', '$timestamp')";
$execute = mysql_query($sql, $conn) or die($sql . " : " . mysql_error());

$sql = "SELECT * FROM Posts as P INNER JOIN Account as A ON P.User_ID = A.User_ID WHERE P.User_ID = ".($userid)." ORDER BY Time_Stamp DESC LIMIT 1";
$table = mysql_query($sql, $conn) or die($sql . " : " . mysql_error());

$return_array = Array();

while($rec = mysql_fetch_assoc($table)) {
    $temp = $rec['Firstname'];
    $rec['Firstname'] = $temp."(You)";
   	array_push($return_array, $rec);
}


mysql_close($conn);

echo json_encode($return_array);
?>