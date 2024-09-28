let synth, analyser;
let isPlaying = false;
let notes = ["C4", "E4", "G4", "C5", "E5","G4", "C5", "E5","C4", "E4", "G4", "C5", "E5","G4", "C5", "E5"];
let durations = ["8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n","8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n"];
let currentNote = 0;
window.addEventListener("load", () => {
  setupAudio();
});

async function setupAudio() {
  synth = new Tone.PolySynth().toDestination();
  analyser = new Tone.Analyser("fft", 4096);

  synth.connect(analyser);

  await Tone.start();
  console.log("Tone.js started!");
}

window.addEventListener("click", async () => {
  if (!isPlaying) {
    isPlaying = true;
    playNextNote();
  } else {
    isPlaying = false;
    currentNote = 0;
  }
});

function playNextNote() {
  if (isPlaying && currentNote < notes.length) {
    let note = notes[currentNote];
    let duration = durations[currentNote];

    synth.triggerAttackRelease(note, duration);

    currentNote++; 

    setTimeout(playNextNote, Tone.Time(duration).toMilliseconds()); 
  } else if (currentNote >= notes.length) {
    currentNote = 0; 
    isPlaying = false;
  }
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  noStroke();
}

function draw() {
  background(255);

  let value = analyser.getValue();

  for (let i = 0; i < value.length; i++) {
    let amplitude = map(value[i], -100, 0, height, 0);
    fill(map(i, 0, value.length, 0, 255), 100, 150);
    rect(i * (width / value.length), height - amplitude, (width / value.length), amplitude);
  }
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
}