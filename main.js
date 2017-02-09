/*
 * Demonstrates some basic use of I/O devices (an LCD, a temperature sensor
 * and an external LED) via the MRAA and/or UPM libraries. These I/O devices
 * are part of the [Grover Starter Kit Plus]
 * (https://www.seeedstudio.com/Grove-Starter-Kit-Plus-IoT-Edison-p-2634.html)
 * (or equivalent) I/O kit.
 *
 * Supported Intel IoT development boards are identified in the code.
 *
 * See LICENSE.md for license terms and conditions.
 *
 * https://software.intel.com/en-us/xdk/docs/using-templates-nodejs-iot
 */

/* spec jslint and jshint lines for desired JavaScript linting */
/* see http://www.jslint.com/help.html and http://jshint.com/docs */
/* jslint node:true */
/* jshint unused:true */

"use strict" ;


// change this to false to use the hand rolled version
var useUpmVersion = true;

// we want mraa to be at least version 0.6.1
var mraa = require('mraa');
var version = mraa.getVersion();
var t;
if (version >= 'v0.6.1') {
    console.log('mraa version (' + version + ') is good');
}
else {
    console.log('mraa version (' + version + ') is old - this code may not work');
}

if (useUpmVersion) {
    clearTimeout(t) ;
    setInterval(useUpm, 5000) ;
}
else {
    useLcd();
}
/**
 * Use the upm library to drive the two line display
 *
 * Note that this does not use the "lcd.js" code at all
 */
function useUpm() {
    var lcd = require('jsupm_i2clcd');
    var display = new lcd.Jhd1313m1(0, 0x3E, 0x62);

    var groveSensor = require('jsupm_grove');

    var led = new groveSensor.GroveLed(2);

    var light = new groveSensor.GroveLight(0);
    console.log(""+light.value());

    var lux = light.value();// If the light sensor value reaches the threshold on/off LED

       if(lux >= 10){
        led.on();
       } else{
           led.off();
       }


   var strings = ["" ,"Full moon overhead at tropical latitudes", "Twilight in the city", "Family living room", "Office building light in hallway","Very dark, overcast day", "Not sure" ];// Array of strings
/**
 * For scrolling long strings i.e.(length > 16)
 * Values in the array are taken from *seed grove wiki page
 * Note that this does not use the "lcd.js" code at all
 */
   function loop(bool,count){
       console.log(count) ;
       if(count){
        t=setTimeout(function(){
            display.scroll (bool);
            count--;
            loop(bool,count) ;
        }, 300);
       }
    }

    function scroll(text){
        console.log(text);
         var x= text.length - 16 ;
        loop(true,x) ;
    }
    display.setCursor(0, 0);
    /**
 * Comparing all the lux values to display appropriate message on LCD
 */
    if(lux < 1){
        display.write("1---");
    } else if(lux == 1){
        display.write("Full moon overhead at tropical latitudes");
        scroll("Full moon overhead at tropical latitudes") ;
    } else if(lux > 1 && lux <= 3){
        display.write("Twilight in the city");
    } else if(lux > 3 && lux <= 6){
        display.write("4---");
    } else if(lux > 6 && lux <= 10){
        display.write("5---");
    } else if(lux > 10 && lux <= 15){
        display.write("6---");
    } else if(lux > 15 && lux <= 35){
        display.write("Family living room");
        scroll("Family living room") ;
    } else if(lux > 35 && lux <= 80){
        display.write("Office building light in hallway");
        scroll("Office building light in hallway");
    } else if(lux > 80 && lux <= 100){
        display.write("Very dark, overcast day");
        scroll("Very dark, overcast day");
    } else {
        display.write("Not sure");
        scroll("Not sure");
    }

}
