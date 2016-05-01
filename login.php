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


if(empty($_POST['username']) || empty($_POST['password'])) {
	$error = "Required Field is empty";
}
else {

$username = $_POST['username'];
$password= $_POST['password'];

// Used to prevent mysql injection
$username = stripslashes($username);
$password = stripslashes($password);
$username = mysql_real_escape_string($username);
$password = mysql_real_escape_string($password);

$password = sha1($_POST['password']);

$sql="SELECT * FROM Account WHERE Username= '$username' AND Password = '$password'";
$execute = mysql_query($sql, $conn) or die($sql . " : " . mysql_error());
$rows = mysql_num_rows($execute);

if ($rows == 1) {
	$sql="SELECT User_ID FROM Account WHERE Username= '$username'";
	$row = mysql_query($sql, $conn) or die($sql . " : " . mysql_error());
	$rec = mysql_fetch_assoc($row );
	
	$_SESSION['login_user'] = $rec['User_ID'];
}
else {
	$error = "Invalid Username or Password";
}

mysql_close($conn);
echo $error;
}

?>