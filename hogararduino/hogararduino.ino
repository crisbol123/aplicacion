#include <ArduinoJson.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <WiFiClientSecure.h>
#include <Wire.h>
#include <ESP32Servo.h> 
#include <Adafruit_NeoPixel.h> 

const char* ssid = "Lady";
const char* password = "1234567890";
const char* serverUrl = "https://192.168.212.134/smart_home/post-esp-data.php"; 
const char* serverUrl1 = "https://192.168.212.134/smart_home/datos-post-esp-data.php";
String apiKey = "tPmAT5Ab3j7F9";

//pines de servo
int pinServo = 25;    
int pinServo1 = 26; 
int pinServo2 = 27;
Servo servo1; 
Servo servo2; 
Servo servo3;
int pos = 0; 
int lastReceivedPositionservo = -1;   
int pos1 = 0; 
int lastReceivedPositionservo1 = -1;  
int pos2 = 0; 
int lastReceivedPositionservo2 = -1;  

//pines de luces y alarma 
const int Trigger = 2;   //Pin digital 2 para el Trigger del sensor
const int Echo = 4;   //Pin digital 3 para el echo del sensor
long t; //timepo que demora en llegar el eco
long referencia = 10;
long distancia; //distancia en centimetros
#define PIN_ALARMA_OFF 35
#define PIN_LED 14 // Pin al que está conectada la cinta de LED RGB
#define NUM_LEDS 60 // Número de LED en la cinta
Adafruit_NeoPixel strip = Adafruit_NeoPixel(NUM_LEDS, PIN_LED, NEO_GRB + NEO_KHZ800);  
int lastReceivedalarma = 0; 
int alarma =0;  
int a=0; 
int b=0;    
int enable=0;  
int enablee=0;  
int referencia1=0;  
//estadoluces 
int estadoluces = 0; 
int estadoluces1 = 0; 
int estadoluces2 = 0;  
int lastReceivedluces = -1;   
int lastReceivedluces1 = -1;  
int lastReceivedluces2 = -1;   
//estado del hogar (normal=0 y segura=1) 
int estadohogar=0; 
//tiempos y conexion 
unsigned long tiempoInicio;   
unsigned long tiempoInicio1; 
unsigned long tiempoInicio2;   
//tiempos enviados a base de datos
int subida = 0; 
int bajada = 0;
int tiempo1 = 0;  
int tiempo2 = 0; 
int tiempo3 = 0;  
int tiempoalarma = 0;  
int tiempov = 0;  
//tiempos medidos en esp luces 
unsigned long tiempomedido1=0; 
unsigned long tiempoacumulado1=0;
unsigned long tiempomedido2=0;   
unsigned long tiempoacumulado2=0;
unsigned long tiempomedido3=0; 
unsigned long tiempoacumulado3=0; 
//tiempo de alarma 
unsigned long tiempomedidoa=0;  
unsigned long tiempoacumuladoa=0;  
unsigned long tiempomedidov=0;  
unsigned long tiempoacumuladov=0; 
float Temp=0; 
int valormedido=0;
const int Motor=12; //Pin digital 5 para el motor del ventilador






void setup() { 

  ////////////////////////////configuracion servo
  servo1.attach(pinServo, 500, 2500); 
  servo2.attach(pinServo1, 500, 2500); 
  servo3.attach(pinServo2, 500, 2500); 
  pinMode(Motor, OUTPUT); //pin como salida
  Serial.begin(115200); 

   ////////////////////////////configuracion luces 
  pinMode(PIN_ALARMA_OFF, INPUT);
  pinMode(Trigger, OUTPUT) ; //pin como salida
  pinMode(Echo, INPUT);  //pin como entrada
  colorWipe(strip.Color(0, 0, 0)); 
  digitalWrite(Trigger, LOW);//Inicializamos el pin con 0  

 ////////////////////////////conexion 
  WiFi.begin(ssid, password);
  Serial.println("Connecting");
  while(WiFi.status() != WL_CONNECTED) {
    delay(200);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());
  
  tiempoInicio = millis(); // inicio tiempo para el get
  tiempoInicio1 = millis(); // inicio tiempo para el sensor  
  tiempoInicio2 = millis();
}

void loop() {
  if(WiFi.status() == WL_CONNECTED) {
    unsigned long tiempoActual = millis();  
    unsigned long tiempoActual1 = millis(); 
    unsigned long tiempoActual2 = millis(); 

    unsigned long tiempoTranscurrido = tiempoActual - tiempoInicio; 
    unsigned long tiempoTranscurrido1 = tiempoActual1 - tiempoInicio1; 
    unsigned long tiempoTranscurrido2 = tiempoActual2 - tiempoInicio2;
    
    if(tiempoTranscurrido1 >= bajada){ // realizar un get  

      WiFiClientSecure client;
      client.setInsecure(); // No utilizar certificado SSL
      HTTPClient https; 

      String url = String(serverUrl) + "?api_key=" + apiKey;
      https.begin(client, url);
     
      https.addHeader("Content-Type", "application/x-www-form-urlencoded");
      
      int httpResponseCode = https.GET(); 
      if (httpResponseCode > 0) {
        if (httpResponseCode == HTTP_CODE_OK) {
          String payload = https.getString(); 
          processPayload(payload); // llamar a funcion de parseo   
        }
      } else {
        Serial.println("Error en la solicitud HTTP");
      } 
      /*Serial.print("bajada:  ")  ;
      Serial.println(bajada);
      Serial.print("subida:  ");
      Serial.println(subida);*/
      tiempoInicio1 = millis(); 
      https.end();
    }      
  Serial.println("tu mai");
    ///////////SENSORULTRASONICO////////////////////////
    if (tiempoTranscurrido2 >= 50 && estadohogar==2){ //realizar lectura del sensor cada 50 milisegundos en estadohogar seguro
      //apagar luces, cerrar puertas y guardar tiempos   
      b=0;
      if (a < 1 ){
        a++;   
        colorWipe(strip.Color(0, 0, 0));
        if (tiempomedido1 != 0){
          tiempoacumulado1 = tiempoTOTAL(tiempomedido1, tiempoacumulado1);
          tiempo1 = (int)tiempoacumulado1*0.001;
          tiempomedido1 = 0;  
        }        
        if (tiempomedido2 != 0){
          tiempoacumulado2 = tiempoTOTAL(tiempomedido2, tiempoacumulado2);
          tiempo2 = (int)tiempoacumulado2*0.001;
          tiempomedido2 = 0;  
        }   
        if (tiempomedido3 != 0){
          tiempoacumulado3 = tiempoTOTAL(tiempomedido3, tiempoacumulado3);
          tiempo3 = (int)tiempoacumulado3*0.001;
          tiempomedido3 = 0;  
        }
        cerrarpuertas(pos, servo1); 
        cerrarpuertas(pos1, servo2); 
        cerrarpuertas(pos2, servo3);  
        lastReceivedPositionservo=0; 
        lastReceivedPositionservo1=0; 
        lastReceivedPositionservo2=0;
      } 

      if (enable == 1){
        digitalWrite(Trigger, HIGH);
        delayMicroseconds(10);          //Enviamos un pulso de 10us
        digitalWrite(Trigger, LOW);
        t = pulseIn(Echo, HIGH); //obtenemos el ancho del pulso
        distancia = t/59;  
        if(distancia<0){
          distancia=0;
        }   
        if(distancia<referencia){ 
          alarma =1;
          alarmaOn(); // funcion para enviar estado de la alarma 
          if (tiempomedidoa == 0){
            tiempomedidoa = millis();
          } 
        }  
        if (alarma == 0){ 
          colorWipe(strip.Color(0, 0, 0));
          if (tiempomedidoa != 0){
          tiempoacumuladoa = tiempoTOTAL(tiempomedidoa, tiempoacumuladoa);
          tiempoalarma = (int)tiempoacumuladoa*0.001;
          tiempomedidoa = 0;    
          lastReceivedalarma=0;
          } 
        }    
        //apagarAlarma(tiempomedidoa, tiempoacumuladoa);// funcion para apagar la alarma  
        tiempoInicio2 = millis();
      }else{
        colorWipe(strip.Color(0, 0, 0));
          if (tiempomedidoa != 0){
          tiempoacumuladoa = tiempoTOTAL(tiempomedidoa, tiempoacumuladoa);
          tiempoalarma = (int)tiempoacumuladoa*0.001;
          tiempomedidoa = 0;    
          lastReceivedalarma=0;}
      }    
      
      Serial.println(tiempoalarma);
      if (tiempoTranscurrido >= subida){ 
        envioDeDatos(tiempo1, tiempo2, tiempo3, tiempoalarma, tiempov, valormedido); 
        tiempoInicio = millis();
      }
    } 
    else if(estadohogar==0){ // si el hogar esta en estado normal (estadohogar=0) puede abrir y cerrar puertas, como tambien encender y apagar luces 
    a=0; 
    b=0; 

    if (enablee == 1){
      leerTemperatura();      // imprime en monitor serial el valor promedio de temperatura con un decimal
      if(Temp>referencia1){
        analogWrite(Motor, 255); 
        tiempomedidov = millis();
      }else {
      analogWrite(Motor, 0);
      }
      Serial.print("ref:  ");
      Serial.println(referencia1);
      Serial.print("T:  ");
      Serial.println(Temp);
    } 
    else{
      if (tiempomedidov != 0){
        tiempoacumuladov = tiempoTOTAL(tiempomedidov, tiempoacumuladov);
        tiempov = (int)tiempoacumuladov*0.001;
        tiempomedidov = 0; 
      } 
    } 
      ///////////////////////////////LUCES//////////////////////////////////    
      
      if(lastReceivedluces != estadoluces){
        if(estadoluces==1){
          colorWipe1(strip.Color(0, 255, 0), 0, 8); 
          if (tiempomedido1 == 0){
            tiempomedido1 = millis();
          }   
        }else{
          colorWipe1(strip.Color(0, 0, 0), 0, 8);  
          if (tiempomedido1 != 0){
            tiempoacumulado1 = tiempoTOTAL(tiempomedido1, tiempoacumulado1);
            tiempo1 = (int)tiempoacumulado1*0.001;
            tiempomedido1 = 0;  
          } 
        } 
        lastReceivedluces=estadoluces; 
      } 

      if(lastReceivedluces1 != estadoluces1){
        if(estadoluces1==1){
          colorWipe1(strip.Color(0, 255, 0), 10, 18);   
          if (tiempomedido2 == 0){
            tiempomedido2 = millis();
          }
        }else{
          colorWipe1(strip.Color(0, 0, 0), 10, 18);  
          if (tiempomedido2 != 0){
            tiempoacumulado2 = tiempoTOTAL(tiempomedido2, tiempoacumulado2);
            tiempo2 = (int)tiempoacumulado2*0.001;
            tiempomedido2 = 0;  
          } 
        }  
        lastReceivedluces1=estadoluces1; 
      } 
      
      if(lastReceivedluces2 != estadoluces2){
        if(estadoluces2==1){
          colorWipe1(strip.Color(0, 255, 0), 20, 28);  
          if (tiempomedido3 == 0){
            tiempomedido3 = millis();
          }
        }else{
          colorWipe1(strip.Color(0, 0, 0), 20, 28);   
          if (tiempomedido3 != 0){
            tiempoacumulado3 = tiempoTOTAL(tiempomedido3, tiempoacumulado3);
            tiempo3 = (int)tiempoacumulado3*0.001;
            tiempomedido3 = 0;  
          } 
        } 
        lastReceivedluces2=estadoluces2; 
      } 
      //////////////PUERTAS//////////////////////////
      if (lastReceivedPositionservo != pos) {
        movimientopuertas(pos, servo1);  
        lastReceivedPositionservo = pos; 
      } 
      if (lastReceivedPositionservo1 != pos1) {
        movimientopuertas(pos1, servo2);  
        lastReceivedPositionservo1 = pos1; 
      } 
      if (lastReceivedPositionservo2 != pos2) {
        movimientopuertas(pos2, servo3);  
        lastReceivedPositionservo2 = pos2; 
      }   
      if (tiempoTranscurrido >= subida){ 
        envioDeDatos(tiempo1, tiempo2, tiempo3, tiempoalarma, tiempov, valormedido); 
        tiempoInicio = millis();
      }

    }else if(estadohogar==1){//modo nocturno
    a=0;  

    if (b < 1 ){
      b++;  
      colorWipe(strip.Color(0, 0, 0)); 
      if (tiempomedido1 != 0){
        tiempoacumulado1 = tiempoTOTAL(tiempomedido1, tiempoacumulado1);
        tiempo1 = (int)tiempoacumulado1*0.001;
        tiempomedido1 = 0;  
      }        
      if (tiempomedido2 != 0){
        tiempoacumulado2 = tiempoTOTAL(tiempomedido2, tiempoacumulado2);
        tiempo2 = (int)tiempoacumulado2*0.001;
        tiempomedido2 = 0;  
      }   
      if (tiempomedido3 != 0){
        tiempoacumulado3 = tiempoTOTAL(tiempomedido3, tiempoacumulado3);
        tiempo3 = (int)tiempoacumulado3*0.001;
        tiempomedido3 = 0;  
      }
      cerrarpuertas(pos, servo1); 
      cerrarpuertas(pos1, servo2); 
      cerrarpuertas(pos2, servo3);  
      lastReceivedPositionservo=0; 
      lastReceivedPositionservo1=0; 
      lastReceivedPositionservo2=0;
    }   

    if (tiempoTranscurrido >= subida){ 
      envioDeDatos(tiempo1, tiempo2, tiempo3, tiempoalarma, tiempov, valormedido); 
      tiempoInicio = millis();
    } 
    }   
  } else {
    Serial.println("WiFi Disconnected");
  }
}   

void envioDeDatos(int tiempo1, int tiempo2, int tiempo3, int tiempoalarma, int tiempov, int valormedido) {
  WiFiClientSecure client;
  client.setInsecure(); // No utilizar certificado SSL
  HTTPClient https;
  https.begin(client, serverUrl1);
  https.addHeader("Content-Type", "application/x-www-form-urlencoded");
  
  String httpRequestData = "api_key=" + apiKey + "&tiempo1=" + String(tiempo1) + "&tiempo2=" + String(tiempo2) + "&tiempo3=" + String(tiempo3) + "&tiempoalarma=" + String(tiempoalarma) + "&tiempov=" + String(tiempov)+ "&valormedido=" + String(valormedido);
  int httpResponseCode = https.POST(httpRequestData); 
  if (httpResponseCode > 0) {
    // Manejar la respuesta HTTP según sea necesario
  } else {
    Serial.println("Error en la solicitud HTTP POST envio de alarma");
  }
}
//funcion que devuelve el tiempo transcurrido 
unsigned long tiempoTOTAL(unsigned long tiempomedido, unsigned long tiempoacumulado) {
  unsigned long tiempoactual = millis(); 
  unsigned long tiempototal = tiempoactual - tiempomedido;  
  unsigned long tiempoacumulado_actualizado = tiempototal + tiempoacumulado; 
  return tiempoacumulado_actualizado; 
}
//funcion para abrir y cerrar puertas 
void movimientopuertas(int pos, Servo &servo){
  if (pos == 90) {
    for (int i = 0; i <= 90; i += 1) {
      servo.write(i);
      delay(15);
    }
  } else if (pos == 0) {
    for (int i = 90; i >= 0; i -= 1) {
      servo.write(i);
      delay(15);
    }
  }
}  
void cerrarpuertas(int pos, Servo &servo){
  for (int i = 90; i >= 0; i -= 1) {
    servo.write(i);
    delay(15);
  }
} 
//funcion para parsear los datos json a enteros 
void processPayload(String payload) {
  DynamicJsonDocument jsonBuffer(2048); // Crear un buffer para el JSON
  DeserializationError error = deserializeJson(jsonBuffer, payload); // Deserializar el JSON  
  if (!error) {  
    // Obtener valores del JSON y asignarlos a las variables globales
    int estado_hogar = jsonBuffer["estadohogar"]; 
    estadohogar = estado_hogar;     
    int _alarma = jsonBuffer["estado_alarma"];  
    alarma = _alarma; 
    int _subida = jsonBuffer["subida"];  
    subida = _subida; 
    int _bajada = jsonBuffer["bajada"];  
    bajada = _bajada;    
    int _referencia = jsonBuffer["referencia"];  
    referencia1 = _referencia; 
    int _enable1 = jsonBuffer["enable1"];  
    enablee = _enable1;   
    int _enable = jsonBuffer["enable"];  
    enable = _enable; 
    JsonArray estado = jsonBuffer["estado_puertas"];    
    for (int i = 0; i < estado.size(); i++) {
      int valorEstado = estado[i];  
      if(i==0){
        pos2=valorEstado; 
      } 
      if(i==1){
        pos1=valorEstado; 
      } 
      if(i==2){
        pos=valorEstado; 
      } 
    }
    // Obtener el array 'estadoluces' (luces)
    JsonArray Eestadoluces = jsonBuffer["estado_luces"];    
    for (int i = 0; i < Eestadoluces.size(); i++) {
      int valorEstadoLuces = Eestadoluces[i]; 
      if(i==0){
        estadoluces2=valorEstadoLuces; 
      } 
      if(i==1){
        estadoluces1=valorEstadoLuces; 
      } 
      if(i==2){
        estadoluces=valorEstadoLuces; 
      }  
    } 
    jsonBuffer.clear(); 
  } else {
    // Si hay un error al parsear el JSON, imprimir el mensaje de error
    Serial.print("Error al parsear JSON: ");
    Serial.println(error.c_str());
  }  
}
///////////////////alarma activada 
void alarmaOn(){
    
    //luces rojas 
    lastReceivedalarma++; 
    colorWipe(strip.Color(255, 0, 0));    
    
    //envia estado de alarma activada a la base de datos 
    if (lastReceivedalarma <2){
      
      WiFiClientSecure client;
      client.setInsecure(); // No utilizar certificado SSL
      HTTPClient https;
      https.begin(client, serverUrl);
      https.addHeader("Content-Type", "application/x-www-form-urlencoded");
      
      String httpRequestData = "api_key=" + apiKey + "&alarma=" + String(alarma);
      int httpResponseCode = https.POST(httpRequestData); 
      if (httpResponseCode > 0) {
        // Manejar la respuesta HTTP según sea necesario
      } else {
        Serial.println("Error en la solicitud HTTP POST envio de alarma");
      }
    }
   
}  
//////////////////encendido de luces rojas 
void colorWipe(uint32_t color) {
  for (int i = 0; i < 28; i++) { // Enciende los primeros 10 bombillos    
    if(i==8 || i==18 || i ==28){
      i=i+2;
    }
    strip.setPixelColor(i, color);
  }
  strip.show(); // Actualiza el strip con los cambios
} 
//////////////encendido personalizado
void colorWipe1(uint32_t color, int n, int m) {
  for (int i = n; i < m; i++) { 
    strip.setPixelColor(i, color);
  }
  strip.show(); 
}  
// Función para leer y calcular la temperatura
void leerTemperatura() {
  int SENSOR;
  float sumaTemp = 0;
  float TEMPERATURA;  // valor de temperatura en grados centigrados
  float TEMPERATURAREAL;

  for (int i = 0; i < 20; i++) {
    SENSOR = analogRead(35);    // lectura de entrada analogica A0  
    TEMPERATURA = ((SENSOR * 5000.0) / 1023) / 10;  // fórmula para convertir valor leido a grados centigrados
    TEMPERATURAREAL = (TEMPERATURA * 19) / 71;      // conversión a temperatura real
    sumaTemp += TEMPERATURAREAL;                    // suma de cada lectura de temperatura
    delay(1);                                     // demora de medio segundo entre lecturas
  }
  Temp= sumaTemp /20.0; 
  valormedido = (int)Temp;
  //return sumaTemp / 5.0;  // retorna el promedio de las 5 lecturas de temperatura
}



