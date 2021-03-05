// requires the zip library from the Elegoo ultrasonic tutorial
#include "SR04.h"

#define TRIG_PIN 12
#define ECHO_PIN 11 

SR04 sr04 = SR04(ECHO_PIN, TRIG_PIN);

void setup() {
   Serial.begin(9600);
   delay(1000);
}

void loop() {
   Serial.println(sr04.Distance());
   delay(17);
}
