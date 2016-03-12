

<?php
$year = intval($_GET['year']);
$gender = $_GET['gender'];
$con = mysqli_connect('localhost','root','','test');
if (!$con) {
    die('Could not connect: ' . mysqli_error($con));
}

mysqli_select_db($con,"test");


if($gender=='male'){
$sql="SELECT Name, Ranking FROM babynames WHERE Year = '".$year."' AND Gender='m' ORDER BY Ranking";
$result = mysqli_query($con,$sql);

}
elseif ($gender=='female') {
  $sql="SELECT Name, Ranking FROM babynames WHERE Year = '".$year."' AND Gender='f' ORDER BY Ranking";

  $result = mysqli_query($con,$sql);
}
$count = 0;
while (($row = mysqli_fetch_array($result)) && $count++<5)
{
   echo "Rank ".$row['Ranking'] . " - ". $row['Name'] . "<br>";
}
mysqli_close($con);
?>
