<?php
session_start();

$conn = mysqli_connect(
  'localhost',
  'sergio',
  'fidelio',
  'incidencias'
) or die(mysqli_erro($mysqli));

?>
