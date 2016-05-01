<?php
//enable this when finished
//error_reporting(0);
session_start();
if(!isset($_SESSION['login_user'])) {
	header("location: index.php");	
	exit;
}		
?>
<!DOCTYPE html>
<html>
<head>
    <script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>
    <script src="js/logout.js"></script>
	<script src="js/render.js"></script>
	<script src="js/posting.js"></script>
    <script src="http://maps.googleapis.com/maps/api/js?key=AIzaSyA_VTS6otdV5SUrMIEtkCk189jKBkq4QW8" async defer></script>
    <style type="text/css">
  html, body { height: 100%; margin: 0; padding: 0; }
  #map { height: 100%; }
</style>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
	<link rel="stylesheet" href="css/navbar.css">
	<link rel="stylesheet" href="css/posting.css">
</head>
	<body>
        <header>
            <div class="nav-bar">
                <ul>			  
                  <li style="float:left"><a class="active" href="profile.php">Home</a></li>
                  <li style="float:right"><a href="#" id="logout">Logout</a></li>
                  <li style="float:right"><a href="preferences.php">Preferences</a></li>
                </ul>
            </div>
        </header>
        
        <div class="container" id="container">
            <div class="friend_content">
                <div class="friend_list"><h3>Friends</h3></div>
                <button class="add_friend">+</button>
            </div>
            <div class="new_posting">
                <form>
                    <textarea name="posting_textbox" id="posting_textarea" maxlength="200" cols="25" rows="5"></textarea></br>
                    <td><span class="word_cnt">200</span></td>
                    <input type="button" id="submit_post" value="Post">
                </form>
            </div>
            
            <div class="bgCover">&nbsp;</div>
            <!-- overlay box -->
            <div class="OverlayBox">
                <div class="overlayContent">
                    <!--normal content-->
                        <div style="height:100%; width:100%;">
                            <div id="overlay_div"></div>
                             <button class="close_map" id="close_map_btn" style="float: right">Close</button>
                        </div>
                </div>
            </div>
                
                
            <div class="posts" id="posts">
                <!-- Posts are generated here -->
            </div>
        </div>
	</body>

</html>