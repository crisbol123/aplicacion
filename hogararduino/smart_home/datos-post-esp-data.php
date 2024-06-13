<?php

$servername = "localhost";
$dbname = "smart_home";
$username = "root";
$password = "root";
$api_key_value = "tPmAT5Ab3j7F9";

// Verificar si se ha proporcionado la clave API
if (isset($_REQUEST["api_key"])) {
    $api_key = test_input($_REQUEST["api_key"]);

    // Si la clave API es válida
    if ($api_key == $api_key_value) {
        
        // Crear conexión a la base de datos
        $conn = new mysqli($servername, $username, $password, $dbname);

        // Verificar conexión
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
            
        if (isset($_POST["tiempo1"]) && isset($_POST["tiempo2"]) && isset($_POST["tiempo3"]) && isset($_POST["tiempoalarma"]) && isset($_POST["tiempov"]) && isset($_POST["valormedido"])) {
            $tiempo1 = intval($_POST["tiempo1"]);
            $tiempo2 = intval($_POST["tiempo2"]);
            $tiempo3 = intval($_POST["tiempo3"]);
            $tiempoalarma = intval($_POST["tiempoalarma"]); 
            $tiempov = intval($_POST["tiempov"]);  
            $valormedido = intval($_POST["valormedido"]); 

            // Actualizar registros en la tabla luces por id
            $sql_update1 = "UPDATE luces SET tiempoactivado = $tiempo1 WHERE id = 1";
            $sql_update2 = "UPDATE luces SET tiempoactivado = $tiempo2 WHERE id = 2";
            $sql_update3 = "UPDATE luces SET tiempoactivado = $tiempo3 WHERE id = 3";

            $sql_update_alarma = "UPDATE alarma SET tiempoactivado = $tiempoalarma"; 

            // Combinar las actualizaciones de la tabla temperatura en una sola sentencia
            $sql_update_temp = "UPDATE temperatura SET tiempo = $tiempov, valormedido = $valormedido";
            
            if ($conn->query($sql_update1) === TRUE && $conn->query($sql_update2) === TRUE && $conn->query($sql_update3) === TRUE && $conn->query($sql_update_alarma) === TRUE && $conn->query($sql_update_temp) === TRUE) {
                echo "Tiempos y tiempo de alarma actualizados correctamente";
            } else {
                echo "Error al actualizar los tiempos o el tiempo de alarma: " . $conn->error;
            }
        } else {
            echo "Error: Valores de tiempos o tiempo de alarma no especificados en la solicitud POST";
            exit;
        }

        $conn->close(); 
         
    } else {
        echo "Clave API incorrecta.";
    }
} else {
    echo "No se proporcionó la clave API.";
}

function test_input($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

?>
