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

$userID = $_SESSION['login_user'];

$sql="SELECT C.Firstname, C.User_ID FROM ((SELECT distinct f.friend_id as User_ID FROM Friends as f WHERE f.User_ID = ".$userID.") as A 
INNER JOIN 
(SELECT * FROM Account) as C 
ON A.User_ID = C.User_ID)";

$table = mysql_query($sql, $conn) or die($sql . " : " . mysql_error());

$return_array = Array();

while($rec = mysql_fetch_assoc($table)) {
   	array_push($return_array, $rec);
}

echo json_encode($return_array);

?>