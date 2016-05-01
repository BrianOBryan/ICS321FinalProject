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
$lat = $_GET['lat'];
$lon = $_GET['lon'];
    
$sql = "SELECT C.Firstname, C.Username, B.User_ID, B.Post_ID, B.Post_Desc, B.Location, B.Time_Stamp, D.Is_Participant FROM 
        (SELECT distinct f.friend_id as User_ID FROM Friends as f WHERE f.User_ID = ".$userID." 
            UNION 
        SELECT distinct User_ID FROM Account WHERE User_ID = ".$userID." ) as A 
        INNER JOIN
        (SELECT * FROM Posts) as B ON A.User_ID = B.User_ID 
        INNER JOIN
        (SELECT * FROM Account) as C ON B.User_ID = C.User_ID
        LEFT JOIN
        (SELECT participant.Post_ID, 
            if (participant.Participant_ID = ".$userID.", 'Y', 'N') as Is_Participant 
            FROM Posts as post 
            INNER JOIN Participants as participant 
            ON post.Post_ID = participant.Post_ID) as D ON B.Post_ID = D.Post_ID
      ORDER BY SUBSTRING_INDEX(SUBSTRING_INDEX(B.Time_Stamp, ' ', 1), ' ', -1) DESC, 
      ABS(SUBSTRING_INDEX(SUBSTRING_INDEX(B.location, ' ', 1), ' ', -1)-1)
    + ABS(SUBSTRING_INDEX(SUBSTRING_INDEX(B.location, ' ', 2), ' ', -1)-1),
    SUBSTRING_INDEX(SUBSTRING_INDEX(B.Time_Stamp, ' ', 2), ' ', -1) DESC;";

$table = mysql_query($sql, $conn) or die($sql . " : " . mysql_error());

$return_array = Array();

while($rec = mysql_fetch_assoc($table)) {
    if ($rec['User_ID'] == $userID) {
        $rec['isOwner'] = 'true';
        $temp = $rec['Firstname'];
        $rec['Firstname'] = $temp."(You)";
    }
    else {
        $rec['isOwner'] = 'false';
    }
   	array_push($return_array, $rec);
}

echo json_encode($return_array);

?>