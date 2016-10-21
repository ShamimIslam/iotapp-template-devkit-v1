Demonstration of IoT devkit v1
==============================

See [LICENSE.md](LICENSE.md) for license terms and conditions.

This sample application is distributed as part of the
[Intel® XDK](http://xdk.intel.com). It can also be downloaded
or cloned directly from its git repo on the
[public Intel XDK GitHub\* site](https://github.com/gomobile).

For help getting started developing applications with the
Intel XDK, please start with
[the Intel XDK documentation](https://software.intel.com/en-us/xdk/docs).

App Overview
------------
This example drives a JHD1313m1 LCD as found in the *Grove
Starter Kit. This connects to an i2c buss.Light sensor from
the kit connects to A0 socket and LED connects to D2 socket.

The code for Display(LCD) be used in either of two ways. By
default, it will use the upm module. This is much the simpler
way to drive a upm supported device.

The purpose of this is to demonstrate that multiple sensors
in this case LCD, LED and Light sensor can work together.
UseUpm is the main function which contains all the intilatization
of different module and variables. It compares the
lux value as it reaches to threshold value it switches on/off
between LED.For scrolling long strings i.e.(length > 16)
there are two functions scroll and loop which are resposible.
The Values in the array are taken from *seed grove wiki page.

Now at the end Comparing all the lux values to display appropriate
message on LCD.

Important Sample App Files
--------------------------
* main.js
* package.json

Important Sample Project Files
------------------------------
* README.md
* LICENSE.md
* project-name.xdk
* project-name.xdke
