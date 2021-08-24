const SEGMENT_COLORS ={
  Creational: '#eae56f',
  Structural: '#89f26e',
  Behaviour: '#7de6ef',
};

const creational = ['Factory', 'Abstract factory', 'Builder', 'Singleton', 'Prototype'];
const structural = ['Adapter', 'Bridge', 'Composite', 'Decorator', 'Facade', 'Flyweight', 'Proxy'];
const behaviour = ['Chain of responsibility', 'Command', 'Iterator', 'Mediator', 'Memento', 'Observer', 'State', 'Strategy', 'Template Method', 'Visitor'];

const buildSegments = (segmentsGroup, color) =>
  segmentsGroup.map(el => ({
    fillStyle: color,
    text: el,
  }));


const allSegments = buildSegments(creational, SEGMENT_COLORS.Creational)
  .concat(buildSegments(structural, SEGMENT_COLORS.Structural))
  .concat(buildSegments(behaviour, SEGMENT_COLORS.Behaviour));

const audio = new Audio('tick.mp3');

const playSound = () => {
  audio.pause();
  audio.currentTime = 0;
  audio.play();
};

const wheelOptions = {
  'canvasId': 'canvas',
  'numSegments': 22,
  'fillStyle': '#e7706f',
  'lineWidth': 3,
  'textAlignment': 'outer',
  'textOrientation': 'horizontal',
  //'rotationAngle'   : -60,        // Rotate wheel slightly anti-clockwise.
  'segments': allSegments,
  'animation':
    {
      'type': 'spinToStop',
      'duration': 4,
      'spins': 7,
      'callbackFinished': 'alertPrize()',
      'callbackAfter': 'drawPointer()',
      'callbackSound': playSound,
      'soundTrigger': 'pin'
    },
  'pins':
    {
      'number': 22,
      'outerRadius': 5,
      'margin': 0,
      'fillStyle': '#ffffff',
      'strokeStyle': '#7734c3'
    },
};


const wheel = new Winwheel(wheelOptions);


const drawPointer = () => {
  let ctx = wheel.ctx;

  ctx.strokeStyle = 'navy';
  ctx.fillStyle = 'white';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(350, 5);
  ctx.lineTo(400, 5);
  ctx.lineTo(375, 40);
  ctx.lineTo(350, 5);
  ctx.stroke();
  ctx.fill();
};

drawPointer();

const alertPrize = () => {
  let winningSegment = wheel.getIndicatedSegment();

  alert("You have won " + winningSegment.text + "!");
};

const addSegment = () => {
  const date = new Date();

  wheel.addSegment({
    'text': date.getMinutes() + ':' + date.getSeconds(),
    'fillStyle': 'aqua'
  }, 1);

  wheel.draw();
};

const deleteSegment = () => {
  wheel.deleteSegment();
  wheel.draw();
};

