
#include <ArduinoWebsockets.h>
#include <ESP8266WiFi.h>
#include <Servo.h>

Servo myservo; 

const char* ssid     = "p_divino";
const char* password = "pdivino10121969";
const char* server_host = "ws://192.168.1.182:5000";
const char* pin1 = "D1";

using namespace websockets;

WebsocketsClient client;

void setup() {
   Serial.begin(9600);
   pinMode(D1, OUTPUT);
   pinMode(D2, OUTPUT);
   pinMode(D3, OUTPUT);
   pinMode(D4, OUTPUT);
   myservo.attach(D5);
   
   // Connect to wifi
   WiFi.begin(ssid, password);
   
   // Wait some time to connect to wifi
   for(int i = 0; i < 10 && WiFi.status() != WL_CONNECTED; i++) {
      Serial.print(".");
      delay(1000);
   }
   
   // Setup Callbacks
   client.onMessage(onMessageCallback);
   client.onEvent(onEventsCallback);
   
   // Connect to server
   client.connect(server_host);
   
   // Send a message
   client.send("NODEMCU ESP8266 Client!");
   // Send a ping
   client.ping();
}

void loop() {
  client.poll(); 
}

void onMessageCallback(WebsocketsMessage message) {
    Serial.println(message.data());

    //Check message from server
    if(message.data() == "FORWARD" || message.data() == "START"){
      digitalWrite(D1, LOW);
      digitalWrite(D2, HIGH);
      digitalWrite(D3, LOW);
      digitalWrite(D4, HIGH);
    }
  
    if(message.data() == "REVERSE"){
      digitalWrite(D1, HIGH);
      digitalWrite(D2, LOW);
      digitalWrite(D3, HIGH);
      digitalWrite(D4, LOW);
    }

    if(message.data() == "LEFT"){
      digitalWrite(D1, LOW);
      digitalWrite(D2, HIGH);
      digitalWrite(D3, HIGH);
      digitalWrite(D4, LOW);
    }

     if(message.data() == "RIGHT"){
      digitalWrite(D1, HIGH);
      digitalWrite(D2, LOW);
      digitalWrite(D3, LOW);
      digitalWrite(D4, HIGH);
    }

    if(message.data() == "STOP"){
      digitalWrite(D1, LOW);
      digitalWrite(D2, LOW);
      digitalWrite(D3, LOW);
      digitalWrite(D4, LOW);
    }

    myservo.write(message.data().toInt());

}

void onEventsCallback(WebsocketsEvent event, String data) {
    if(event == WebsocketsEvent::ConnectionOpened) {
        Serial.println("Connnection Opened");
        
    } else if(event == WebsocketsEvent::ConnectionClosed) {
        Serial.println("Connnection Closed");
        
    } else if(event == WebsocketsEvent::GotPing) {
        Serial.println("Got a Ping!");
        
    } else if(event == WebsocketsEvent::GotPong) {
        Serial.println("Got a Pong!");
        
    }
}
