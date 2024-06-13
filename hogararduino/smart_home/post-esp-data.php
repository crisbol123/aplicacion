<?php

$servername = "localhost";
$dbname = "smart_home";
$username = "root";
$password = "root";
$api_key_value = "tPmAT5Ab3j7F9";

// Verificar si se ha proporcionado la clave API
if (isset($_REQUEST["api_key"])) {
    $api_key = test_input($_REQUEST["api_key"]);

    // Si la clave API es valida
    if ($api_key == $api_key_value) {
        
        // Crear conexion a la base de datos
        $conn = new mysqli($servername, $username, $password, $dbname);

        // Verificar conexion
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        
        // Si la solicitud es de tipo GET
        if ($_SERVER["REQUEST_METHOD"] == "GET") {
            // Consulta SQL para obtener el estado más reciente del hogar
            $sql_hogar = "SELECT estadohogar FROM modos ORDER BY id DESC LIMIT 1"; 
            $result_hogar = $conn->query($sql_hogar);  

            $sql_alarma = "SELECT estado_alarma FROM alarma ORDER BY id DESC LIMIT 1"; 
            $result_alarma = $conn->query($sql_alarma); 

            $sql_tiempos = "SELECT subida, bajada FROM tiempos ORDER BY id DESC LIMIT 1"; 
            $result_tiempos = $conn->query($sql_tiempos);   

            $sql_temperatura = "SELECT referencia, enable1 FROM temperatura ORDER BY id DESC LIMIT 1"; 
            $result_temperatura = $conn->query($sql_temperatura);  
           
            $sql_enable = "SELECT enablee FROM alarma ORDER BY id DESC LIMIT 1"; 
            $result_enable = $conn->query($sql_enable);  
            
            $sql_puertas = "SELECT estado FROM puertas ORDER BY id DESC LIMIT 3"; 
            $result_puertas = $conn->query($sql_puertas); 
            
            $sql_luces = "SELECT estadoluces FROM luces ORDER BY id DESC LIMIT 3"; 
            $result_luces = $conn->query($sql_luces);

            if ($result_hogar->num_rows > 0 && $result_alarma->num_rows > 0 && $result_tiempos->num_rows > 0 && $result_temperatura->num_rows > 0 && $result_enable->num_rows > 0 && $result_puertas->num_rows > 0 && $result_luces->num_rows > 0) {
                $row_hogar = $result_hogar->fetch_assoc();
                $estadohogar = intval($row_hogar['estadohogar']);
                
                $row_alarma = $result_alarma->fetch_assoc();
                $alarma = intval($row_alarma['estado_alarma']); 

                $row_tiempos = $result_tiempos->fetch_assoc();
                $subida = intval($row_tiempos['subida']);
                $bajada = intval($row_tiempos['bajada']);  

                $row_temperatura = $result_temperatura->fetch_assoc();
                $referencia = intval($row_temperatura['referencia']);
                $enable1 = intval($row_temperatura['enable1']); 

                $row_enable = $result_enable->fetch_assoc();
                $enable = intval($row_enable['enablee']);

                $puertas_data = array(); 
                $luces_data = array();

                // Iterar a través de los resultados de las puertas
                while ($row_puertas = $result_puertas->fetch_assoc()) {
                    $estado_puerta = intval($row_puertas['estado']);
                    $puertas_data[] = $estado_puerta;
                } 

                // Iterar a través de los resultados de las luces
                while ($row_luces = $result_luces->fetch_assoc()) {
                    $estado_luz = intval($row_luces['estadoluces']);
                    $luces_data[] = $estado_luz;
                }

                // Crear un array asociativo con los datos
                $data = array(
                    'estadohogar' => $estadohogar,
                    'estado_alarma' => $alarma, 
                    'subida' => $subida, 
                    'bajada' => $bajada,   
                    'referencia' => $referencia, 
                    'enable1' => $enable1,
                    'enable' => $enable,
                    'estado_puertas' => $puertas_data, 
                    'estado_luces' => $luces_data
                );

                echo json_encode($data); // Devolver los datos en formato JSON
            } else {
                echo "0 resultados";  
            } 
    
            $conn->close();
        }
        // Si la solicitud es de tipo POST
        elseif ($_SERVER["REQUEST_METHOD"] == "POST") {
            
            //$alarma = test_input($_POST["alarma"]); 
            
            if (isset($_POST["alarma"])) {
                $alarma = intval($_POST["alarma"]); // Convertir a entero
            } else {
                echo "Error: Valor de alarma no especificado en la solicitud POST";
                exit;
            }

            $sql_check = "SELECT * FROM alarma LIMIT 1";
            $result_check = $conn->query($sql_check);

            if ($result_check->num_rows > 0) {
                // Si ya existe una fila, actualizar el estado de la alarma en esa fila
                $sql_update = "UPDATE alarma SET estado_alarma = $alarma";
                if ($conn->query($sql_update) === TRUE) {
                    echo "Estado de alarma actualizado correctamente";
                } else {
                    echo "Error al actualizar el estado de alarma: " . $conn->error;
                }
            } else {
                echo "No se encontró ninguna fila en la tabla 'hogar'";
            } 
            
            $conn->close(); 
        }  
    } else {
        echo "Clave API incorrecta.";
    }
} else {
    echo "No se proporciono la clave API.";
}

function test_input($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

?>


