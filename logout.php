<?php
//enable this when finished
//error_reporting(0);
session_start();
if (session_destroy()) {
	echo "done";
	exit;
}
?>