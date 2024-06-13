#include <ArduinoJson.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <WiFiClientSecure.h>
#include <Wire.h>
#include <ESP32Servo.h> 
#include <Adafruit_NeoPixel.h> 

const char* ssid = "Lady";
const char* password = "1234567890";
const char* serverUrl = "https://192.168.141.134/smart_home/post-esp-data.php"; 
const char* serverUrl1 = "https://192.168.141.134/smart_home/datos-post-esp-data.php";
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
const int Trigger = 12;   //Pin digital 2 para el Trigger del sensor
const int Echo = 14;   //Pin digital 3 para el echo del sensor
long t; //timepo que demora en llegar el eco
long referencia = 5;
long distancia; //distancia en centimetros
#define PIN_LED 13 // Pin al que está conectada la cinta de LED RGB
#define NUM_LEDS 72 // Número de LED en la cinta
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
unsigned long tiempoinicioprograma; 
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
int valormedido=0;
const int Motor=33; //Pin digital 5 para el motor del ventilador 
bool ledState = false;      // Estado actual de los LEDs
unsigned long previousMillis = 0; 
unsigned long previousMillis1 = 0;  // Guarda el último tiempo en que se tomó una lectura
const long interval = 2;  // Intervalo de tiempo en milisegundos (2 ms)
int readingCount = 0;
float sumaTemp = 0;
float Temp = 0; 

int tiempop1=0; 
int tiempop2=0; 
int tiempop3=0; 
int tiempop1a=0; 
int tiempop2a=0; 
int tiempop3a=0; 
int tiempop=0; 
int tiempoluces=0;   
int tiempototalprograma=0; 

int tpuertas = 0; 
int tluces = 0; 
int tventilador = 0; 
int talarma= 0; 
int tesp = 0;  
int sumatoriainicial = 0;   
int n=0; 
int m=0; 
int r=0; 
int tpuertas1 = 0; 
int tluces1 = 0; 
int tventilador1 = 0; 
int talarma1= 0; 
int tesp1 = 0;  
int banfiesta = 0; 
int banalarma = 0; 


//modo fiesta 
unsigned long previousMillis15 = 0; // Almacena el último tiempo de cambio
const long interval1 = 1000; // Intervalo de 1 segundo (1000 milisegundos)
int colorIndex = 0;
 
uint32_t colors[8] = {
  strip.Color(128, 0, 0),    // Rojo tenue
  strip.Color(0, 128, 0),    // Verde tenue
  strip.Color(0, 0, 128),    // Azul tenue
  strip.Color(128, 128, 0),  // Amarillo tenue
  strip.Color(0, 128, 128),  // Cian tenue
  strip.Color(128, 0, 128),  // Magenta tenue
  strip.Color(128, 128, 128),// Blanco tenue
  strip.Color(0, 0, 0)       // Apagado
}; 


void setup() { 

  ////////////////////////////configuracion servo
  servo1.attach(pinServo, 500, 2500); 
  servo2.attach(pinServo1, 500, 2500); 
  servo3.attach(pinServo2, 500, 2500); 
  pinMode(Motor, OUTPUT); //pin como salida
  Serial.begin(115200); 

   ////////////////////////////configuracion luces 
  //pinMode(PIN_ALARMA_OFF, INPUT);
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
  tiempoinicioprograma = millis();
}

void loop() {
  if(WiFi.status() == WL_CONNECTED) {
    unsigned long tiempoActual = millis();  
    unsigned long tiempoActual1 = millis(); 
    unsigned long tiempoActual2 = millis(); 
    unsigned long tiempoActual3 = millis();  
    unsigned long currentMillis1 = millis(); //modo fiesta

    unsigned long tiempoTranscurrido = tiempoActual - tiempoInicio; 
    unsigned long tiempoTranscurrido1 = tiempoActual1 - tiempoInicio1; 
    unsigned long tiempoTranscurrido2 = tiempoActual2 - tiempoInicio2; 
    unsigned long tiempoTranscurrido3 = tiempoActual3 - tiempoinicioprograma; 
    tiempoinicioprograma = tiempoActual;  

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
          Serial.println(payload);
        }
      } else {
        Serial.println("Error en la solicitud HTTP");
      }   
      tiempoInicio1 = millis(); 
      https.end();  
      if(sumatoriainicial < 1){
        tluces1 = tluces; 
        tpuertas1 = tpuertas; 
        tventilador1 = tventilador; 
        talarma1 = talarma1; 
        tesp1 = tesp;
      } 
      sumatoriainicial++;
    }      

    if (estadohogar == 2 || estadohogar == 3){
      a++;
    }else{
      a=0;
    } 

    if(a<2){ // funcionamiento normal del sistema
      
      if (banfiesta == 1){
        banfiesta = 0; 
        colorWipe(strip.Color(0, 0, 0));
      } 

      if (banalarma == 1){
          banalarma = 0; 
          colorWipe(strip.Color(0, 0, 0));
        }
      // temperatura
      if (enablee == 1){
        leerTemperatura();   
        Serial.println(valormedido); 

        if(valormedido>referencia1){
          analogWrite(Motor, 255); 
          tiempomedidov = millis(); 
          Serial.println("//////////////////////////////////////");
        }else {
          analogWrite(Motor, 0); 
          if (tiempomedidov != 0){
            tiempoacumuladov = tiempoTOTAL(tiempomedidov, tiempoacumuladov);
            tiempov = (int)tiempoacumuladov*0.001;
            tiempomedidov = 0; 
          } 
        }
      }else{
        analogWrite(Motor, 0); 
          if (tiempomedidov != 0){
            tiempoacumuladov = tiempoTOTAL(tiempomedidov, tiempoacumuladov);
            tiempov = (int)tiempoacumuladov*0.001;
            tiempomedidov = 0; 
          } 
      } 

      ///////////////////////////////LUCES//////////////////////////////////     
      if(lastReceivedluces != estadoluces){
        if(estadoluces==1){
          colorWipe1(strip.Color(50, 50, 50), 9, 13); 
          if (tiempomedido1 == 0){
            tiempomedido1 = millis();
          }   
        }else{
          colorWipe1(strip.Color(0, 0, 0), 9, 13);  
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
          colorWipe1(strip.Color(50, 50, 50), 28, 32);   
          if (tiempomedido2 == 0){
            tiempomedido2 = millis();
          }
        }else{
          colorWipe1(strip.Color(0, 0, 0), 28, 32);  
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
          colorWipe1(strip.Color(50, 50, 50), 64, 68);  
          if (tiempomedido3 == 0){
            tiempomedido3 = millis();
          }
        }else{
          colorWipe1(strip.Color(0, 0, 0), 64, 68);   
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
        tiempop1=2;  
        tiempop1a=tiempop1a+tiempop1;
      } 
      if (lastReceivedPositionservo1 != pos1) {
        movimientopuertas(pos1, servo2);  
        lastReceivedPositionservo1 = pos1;  
        tiempop2=2;  
        tiempop2a=tiempop2a+tiempop2;
      } 
      if (lastReceivedPositionservo2 != pos2) {
        movimientopuertas(pos2, servo3);  
        lastReceivedPositionservo2 = pos2;  
        tiempop3=2;  
        tiempop3a=tiempop3a+tiempop3;
      }  


    } 
    ///////////SENSORULTRASONICO////////////////////////
    if ( enable == 1 && estadohogar==2 && tiempoTranscurrido2 >= 50){ //realizar lectura del sensor cada 50 milisegundos en estadohogar seguro       
        
        banalarma = 1; 
        if (banfiesta == 1){
          banfiesta = 0; 
          colorWipe(strip.Color(0, 0, 0));
        }
        
        digitalWrite(Trigger, HIGH);
        delayMicroseconds(10);          //Enviamos un pulso de 10us
        digitalWrite(Trigger, LOW);
        t = pulseIn(Echo, HIGH); //obtenemos el ancho del pulso
        distancia = t/59; 

        if(distancia<0){
          distancia=0;
        }     
        Serial.println(distancia);
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
        tiempoInicio2 = millis();
          
    }else if(enable == 0){ 
        alarma = 0;
        colorWipe(strip.Color(0, 0, 0)); 
        if (tiempomedidoa != 0){
          tiempoacumuladoa = tiempoTOTAL(tiempomedidoa, tiempoacumuladoa);
          tiempoalarma = (int)tiempoacumuladoa*0.001;
          tiempomedidoa = 0;    
          lastReceivedalarma=0;
        }
    }  

    if(estadohogar == 3){
      
      banfiesta = 1; 
      if (banalarma == 1){
          banalarma= 0; 
          colorWipe(strip.Color(0, 0, 0));
        }
      if (currentMillis1 - previousMillis15 >= interval1) {
        previousMillis15 = currentMillis1;

        setColor(colors[colorIndex]);
        
        colorIndex = (colorIndex + 1) % 8; // Cambia al siguiente color, y reinicia si es necesario
      }
    }

    if (tiempoTranscurrido1 <= bajada ){
      n=6; 
    }   

    if (tiempoTranscurrido >= subida){   
      tiempoluces = tiempo1+tiempo2+tiempo3+tluces1;    
      tiempop = tiempop3a+tiempop2a+tiempop1a+tpuertas1-n;  
      tiempototalprograma = (int)tiempoinicioprograma*0.001+tesp1;    
      tiempov = tiempov+tventilador1; 
      tiempoalarma = tiempoalarma+talarma1; 
      envioDeDatos(tiempoluces, tiempop, tiempototalprograma, tiempoalarma, tiempov, valormedido);   
      tiempoInicio = millis(); 
    }    
  } else {
    Serial.println("WiFi Disconnected");
  }
}   

void envioDeDatos(int tiempoluces, int tiempop, int tiempototalprograma, int tiempoalarma, int tiempov, int valormedido) {
  WiFiClientSecure client;
  client.setInsecure(); // No utilizar certificado SSL
  HTTPClient https;
  https.begin(client, serverUrl1);
  https.addHeader("Content-Type", "application/x-www-form-urlencoded");
  
  String httpRequestData = "api_key=" + apiKey + "&tiempoluces=" + String(tiempoluces) + "&tiempop=" + String(tiempop) + "&tiempototalprograma=" + String(tiempototalprograma) + "&tiempoalarma=" + String(tiempoalarma) + "&tiempov=" + String(tiempov) + "&valormedido=" + String(valormedido);
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
    int _tpuertas = jsonBuffer["tpuertas"];  
    tpuertas = _tpuertas;  
    int _tluces = jsonBuffer["tluces"];  
    tluces = _tluces;  
    int _talarma = jsonBuffer["talarma"];  
    talarma = _talarma;  
    int _tventilador = jsonBuffer["tventilador"];  
    tventilador = _tventilador;  
    int _tesp = jsonBuffer["tesp"];  
    tesp = _tesp;     
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
  for (int i = 6; i < 16; i++) { 
    strip.setPixelColor(i, color);
  }  
  strip.show();
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
    SENSOR = analogRead(32);    // lectura de entrada analogica A0  
    TEMPERATURA = ((SENSOR * 5000.0) / 1023) / 10;  // fórmula para convertir valor leido a grados centigrados
    TEMPERATURAREAL = (TEMPERATURA * 19) / 89;      // conversión a temperatura real
    sumaTemp += TEMPERATURAREAL;                    // suma de cada lectura de temperatura
    delay(1);                                     // demora de medio segundo entre lecturas
  }
  Temp= sumaTemp /20.0; 
  valormedido = (int)Temp+12;
  //return sumaTemp / 5.0;  // retorna el promedio de las 5 lecturas de temperatura
} 
void setColor(uint32_t color) {
  for(int i=6; i<16; i++) {
    strip.setPixelColor(i, color); // Establece el color de cada LED en la tira
  }
  strip.show(); // Actualiza la tira para mostrar el nuevo color
}
