<?php

include('db.php');

if (isset($_POST['guardar_incidencia'])) {
  $titulo = $_POST['titulo'];
  $descripcion = $_POST['descripcion'];
  $query = "INSERT INTO task(titulo, descripcion) VALUES ('$titulo', '$descripcion')";
  $result = mysqli_query($conn, $query);
  if(!$result) {
    die("Query Failed.");
  }

  $_SESSION['message'] = 'Ticket creado correctamente';
  $_SESSION['message_type'] = 'success';
  header('Location: index.php');

}

?>
