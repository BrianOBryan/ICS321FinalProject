<?php
session_start();
if(!isset($_SESSION['login_user'])) {
	header("location: index.php");	
	exit;
}		
?>
<!DOCTYPE html>
<html>
	<body>
	<h1> This is where we put our news feed </h1>
	</body>
</html>