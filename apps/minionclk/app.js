const locale = require("locale");

let hour;
let minute;
let date;

let timer;

function getBackground() {
  return {
    width: 120,
    height: 96,
    bpp: 8,
    buffer: require("heatshrink").decompress(atob("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"))
  };
};

function draw() {
  const d = new Date();

  const newHour = ('0' + d.getHours()).substr(-2);
  const newMinute = ('0' + d.getMinutes()).substr(-2);
  const newDate = locale.date(d).trim();

  g.setFontAlign(0, 0, 0);

  if (newHour !== hour) {
    g.setFont('6x8', 5);
    g.setColor(0x0000);
    g.drawString(hour, 76, 100);
    g.setColor(0xFFFF);
    g.drawString(newHour, 76, 100);
    hour = newHour;
  }

  if (newMinute !== minute) {
    g.setFont('6x8', 5);
    g.setColor(0x0000);
    g.drawString(minute, 164, 100);
    g.setColor(0xFFFF);
    g.drawString(newMinute, 164, 100);
    minute = newMinute;
  }

  if (newDate !== date) {
    g.setFont('6x8', 2);
    g.setColor(0x0000);
    g.drawString(date, 120, 228);
    g.setColor(0xFFFF);
    g.drawString(newDate, 120, 228);
    date = newDate;
  }
}

function startDrawing() {
  hour = '';
  minute = '';
  date = '';
  g.drawImage(getBackground(), 0, 24, { scale: 2 });
  Bangle.drawWidgets();
  draw();
  timer = setInterval(draw, 1000);
}

function stopDrawing() {
  if (timer) {
    clearInterval(timer);
    timer = undefined;
  }
}

Bangle.on('lcdPower', (on) => {
  stopDrawing();
  if (on) {
    startDrawing();
  }
});

Bangle.loadWidgets();
startDrawing();

setWatch(Bangle.showLauncher, BTN2, { repeat: false, edge: 'falling' });
