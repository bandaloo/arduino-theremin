"use strict";

// web socket stuff

const socket = new WebSocket("ws://localhost:10080");

socket.addEventListener("open", () => {
  socket.send("browser connected!");
});

socket.addEventListener("message", (event) => {
  const freq = +event.data;
  oscillator.frequency.value = Math.min(freq, 200);
});

// sound stuff

const audioContext = new AudioContext();

const oscillator = audioContext.createOscillator();
const gainNode = audioContext.createGain();

gainNode.gain.value = 0.15;

oscillator.connect(gainNode);
gainNode.connect(audioContext.destination);

oscillator.detune.value = 100;

let started = false;

document.addEventListener("click", () => {
  if (started) return;
  started = true;

  oscillator.start(0);
});

const c = /** @type {HTMLCanvasElement} */ (document.getElementById("canvas"));
const x = c.getContext("2d");

const S = Math.sin;
const H = (h = 0, s = 50, l = 50, a = 1) => `hsla(${h},${s}%,${l}%,${a})`;

const draw = (t) => {
  const amplitude = oscillator.frequency.value * 2;
  const segmentWidth = 5 + amplitude / 20;
  const segmentHeight = amplitude / 10;
  const numWaves = 3;

  x.fillStyle = "black";
  x.fillRect(0, 0, c.width, c.height);
  for (let i = 0; i < c.width; i += segmentWidth) {
    x.fillStyle = H(((1 + S(i)) / 2) * amplitude);
    for (let j = 0; j < numWaves; j++)
      x.fillRect(
        i + j,
        c.height / 2 - segmentHeight / 2 + S(i + j + t) * amplitude,
        segmentWidth,
        segmentHeight
      );
  }
};

const update = (time) => {
  draw(time / 1000);
  requestAnimationFrame(update);
};

requestAnimationFrame(update);
