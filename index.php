<?php 
//enable this when finished
//error_reporting(0);
session_start();
if (isset($_SESSION['login_user'])) {
	header("location: profile.php");
	exit;
}
?>

<!DOCTYPE html>
<html >
  <head>
    <meta charset="UTF-8">
    <script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>
    <script src="js/index.js" defer></script>
    <script src="js/submitRegistration.js"></script>
    <script src="js/submitLogin.js"></script>
    <title>Social Hangout Login</title>
    <link rel="stylesheet" href="css/style.css">   
  </head>
	<body>
		<div class="login-page">
		  <div class="form">
		    <form class="login-form" action="" method="post">
		      <input type="text" name="username" id="username" placeholder="username"/>
		      <input type="password" name="password" id="password" placeholder="password"/>
		      <input type="button" name="login" id="login" value="Login">
			<span id="login_msg"></span>
		      <p class="message">Not registered? <a href="#">Create an account</a></p>
		    </form>
		    <form class="register-form" action="" method="post">
		      <input type="text" name="new_username" id="new_username" placeholder="username"/>
	              <input type="text" name="new_firstname" id="new_firstname" placeholder="first name"/>
	              <input type="text" name="new_lastname" id="new_lastname" placeholder="last name"/>
		      <input type="password" name="new_password" id="new_password" placeholder="password"/>
            	  	<input type="password" name="new_cpassword" id="new_cpassword" placeholder="confirm password"/>
		      <input type="text" name="new_email" id="new_email" placeholder="email address"/>
		      <input type="button" name="register" id="register" value="Create">
		      	<span id="register_msg"></span>
		      <p class="message">Already registered? <a href="#">Sign In</a></p>
		    </form>
		  </div>
		</div>
	</body>
</html>