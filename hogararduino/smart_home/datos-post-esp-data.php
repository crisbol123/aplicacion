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
            
        if (isset($_POST["tiempoluces"]) && isset($_POST["tiempop"]) && isset($_POST["tiempototalprograma"]) && isset($_POST["tiempoalarma"]) && isset($_POST["tiempov"]) && isset($_POST["valormedido"])) {
            $tiempoluces = intval($_POST["tiempoluces"]);
            $tiempop = intval($_POST["tiempop"]);
            $tiempototalprograma = intval($_POST["tiempototalprograma"]);
            $tiempoalarma = intval($_POST["tiempoalarma"]); 
            $tiempov = intval($_POST["tiempov"]);  
            $valormedido = intval($_POST["valormedido"]);  

            // Obtener el mes actual
            $mes_actual = date("n");

            // Combinar las actualizaciones de la tabla temperatura en una sola sentencia
            $sql_update_total = "UPDATE consumos SET tluces =  $tiempoluces, tpuertas = $tiempop, tesp = $tiempototalprograma, talarma =  $tiempoalarma, tventilador =  $tiempov WHERE id = $mes_actual";
            $sql_update_temp = "UPDATE temperatura SET valormedido =  $valormedido WHERE id = 1";

            if ($conn->query($sql_update_total) === TRUE && $conn->query($sql_update_temp) === TRUE) {
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
