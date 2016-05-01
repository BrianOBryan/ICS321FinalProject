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

// [insert code here to check if owner of post is = userid of session]
$post_id= $_POST['post_id'];

$post_id = stripslashes($post_id);
$post_id = mysql_real_escape_string($post_id);


$sql = "DELETE FROM Posts WHERE Post_ID = ".$post_id;
$execute = mysql_query($sql, $conn) or die($sql . " : " . mysql_error());

mysql_close($conn);
?>