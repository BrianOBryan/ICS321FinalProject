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

$friend_id= $_POST['friend_id'];
$user_id= $_SESSION['login_user'];

$friend_id = stripslashes($friend_id);
$friend_id = mysql_real_escape_string($friend_id);
$user_id = stripslashes($user_id);
$user_id = mysql_real_escape_string($user_id);

$sql = "DELETE FROM Friends WHERE User_ID = ".$user_id." and Friend_ID = ".$friend_id;
$execute = mysql_query($sql, $conn) or die($sql . " : " . mysql_error());

$sql = "DELETE FROM Friends WHERE User_ID = ".$friend_id." and Friend_ID = ".$user_id;
$execute = mysql_query($sql, $conn) or die($sql . " : " . mysql_error());

mysql_close($conn);
?>