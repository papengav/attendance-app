// ----------------------------------------------------------------------------------------------
// Name: Johnathan Trachte
// Project: Attendance App - This is a full stack attendance tracking and management software.
// Purpose: Firmware run on the microcontroller to signal presence of an NFC tag
// 
// Tested in Scanner Python project
// ----------------------------------------------------------------------------------------------

#include <Arduino.h>

#define BRICK_DELAY   1000 // Bricked another microcontroller by not including a delay, provides separation between messages
#define BAUD_RATE     9600 // Baud rate for connection
#define PRESENCE_PIN  6    // Pin to which presence indicator is connected (wire, photoresistor, TBD)

void setup() {
  pinMode(PRESENCE_PIN, INPUT);

  Serial.begin(BAUD_RATE);
}

void loop() {
  delay(BRICK_DELAY);

  Serial.println(digitalRead(PRESENCE_PIN));
}
