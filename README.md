# Arduino Theremin with Graphics

This was created for a design sprint for the class IMGD 5100 at WPI. To get
this running, you'll need npm. Then do `npm install` to get the dependencies.

Flash the `.ino` file in the `ultrasonic` directory afterr connecting up the
sensor like shown in the Elegoo tutorial. You'll also need the zip library
included in the Elegoo tutorial as well (which I'm not sure I can distribute
so I didn't.)

Run `node server.js` to start the server that sends serial port data to the
browser. You'll also need a server to serve the static web page, so start one
in the root directory of this repo. If you're not sure how to do that, you
can use `python3 -m http.server 12000` if you have Python 3 installed. Then,
direct your browser to `http://localhost:12000/`. In order to hear the sound,
you'll have to have clicked on the page at least once.
