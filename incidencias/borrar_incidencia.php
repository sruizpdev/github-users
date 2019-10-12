<?php

include("db.php"); // Conectamos a la bbdd

if(isset($_GET['id'])) {
  $id = $_GET['id'];
  $query = "DELETE FROM task WHERE id = $id";
  $result = mysqli_query($conn, $query);
  if(!$result) {
    die("Consulta fallida.");
  }

  $_SESSION['message'] = 'Ticket eliminado correctamente';
  $_SESSION['message_type'] = 'danger'; // Usamos la clase danger de bootstrap
  header('Location: index.php');
}

?>
