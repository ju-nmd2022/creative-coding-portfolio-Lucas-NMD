let analyser;
let isPlaying = false;
let notes = ["C4", "E4", "G4", "C5", "E5", "G4", "C5", "E5", "C4", "E4", "G4", "C5", "E5", "G4", "C5", "E5","C4", "D4", "A4", "D5", "F5", "A4", "D5", "F5", "C4", "D4", "A4", "D5", "F5", "A4", "D5", "F5", "B3", "D4", "G4", "D5", "F5", "G4", "D5", "F5", "B3", "D4", "G4", "D5", "F5", "G4", "D5", "F5", "C4", "E4", "G4", "C5", "E5", "G4", "C5", "E5", "C4", "E4", "G4", "C5", "E5", "G4", "C5", "E5", "C4", "E4", "A4", "E5", "A5","A4", "E5", "A5", "C4", "E4", "A4", "E5", "A5","A4", "E5", "A5", "C4", "D4", "F#4", "A4", "D5", "F#4", "A4", "D5", "C4", "D4", "F#4", "A4", "D5", "F#4", "A4", "D5", "B3", "D4", "G4", "D5", "G5", "G4", "D5", "G5", "B3", "D4", "G4", "D5", "G5", "G4", "D5", "G5", "B3", "C4", "E4", "G4", "C5", "E4", "G4", "C5", "B3", "C4", "E4", "G4", "C5", "E4", "G4", "C5", "A3", "C4", "E4", "G4", "C5", "E4", ];
let durations = ["8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n", "8n"];
let pedalNotes = ["C2","C2","D2","D2", "G1", "G1", "C2", "C2", "A1", "A1", "D2", "D2", "G1", "G1", "C2", "C2", "A1", "A1"];
let pedalDurations = ["1n", "1n", "1n", "1n", "1n", "1n", "1n", "1n", "1n", "1n", "1n", "1n", "1n", "1n", "1n", "1n", "1n", "1n"];
let currentNote = 0;
let pedalInterval;

window.addEventListener("load", () => {
  setupAudio();
});

let piano;
let synth = new Tone.Synth().toDestination();

function preload() {
  piano = new Tone.Sampler({
    urls: {
      "A0": "A0.mp3",
      "C1": "C1.mp3",
      "D#1": "Ds1.mp3",
      "F#1": "Fs1.mp3",
      "A1": "A1.mp3",
      "C2": "C2.mp3",
      "D#2": "Ds2.mp3",
      "F#2": "Fs2.mp3",
      "A2": "A2.mp3",
      "C3": "C3.mp3",
      "D#3": "Ds3.mp3",
      "F#3": "Fs3.mp3",
      "A3": "A3.mp3",
      "C4": "C4.mp3",
      "D#4": "Ds4.mp3",
      "F#4": "Fs4.mp3",
      "A4": "A4.mp3",
      "C5": "C5.mp3",
      "D#5": "Ds5.mp3",
      "F#5": "Fs5.mp3",
      "A5": "A5.mp3",
      "C6": "C6.mp3",
      "D#6": "Ds6.mp3",
      "F#6": "Fs6.mp3",
      "A6": "A6.mp3",
      "C7": "C7.mp3",
      "D#7": "Ds7.mp3",
      "F#7": "Fs7.mp3",
      "A7": "A7.mp3",
      "C8": "C8.mp3"
    },
    release: 1,
    baseUrl: "https://tonejs.github.io/audio/salamander/"
  }).toDestination();
}


function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  noStroke();
}

async function setupAudio() {
  analyser = new Tone.Analyser("fft", 4096);

  piano.connect(analyser);

  await Tone.start();
  console.log("Tone.js started!");
}

window.addEventListener("click", async () => {
  if (!isPlaying) {
    isPlaying = true;
    playNextNote();
    playPedalNotes();
  } else {
    isPlaying = false;
    currentNote = 0;
    clearInterval(pedalInterval);
  }
});

function playPedalNotes() {
  let index = 0;

  function playNextPedalNote() {
    if (isPlaying && index < pedalNotes.length) {
      let note = pedalNotes[index];
      let duration = pedalDurations[index];
      synth.triggerAttackRelease(note, duration);
      index++;
      setTimeout(playNextPedalNote, Tone.Time(duration).toMilliseconds());
    } else if (index >= pedalNotes.length) {
      index = 0;
      isPlaying = false;
      clearInterval(pedalInterval);
    }
  }

  playNextPedalNote();
}


function playNextNote() {
  if (isPlaying && currentNote < notes.length) {
    let note = notes[currentNote];
    let duration = durations[currentNote];

    piano.triggerAttackRelease(note, duration);

    currentNote++;

    setTimeout(playNextNote, Tone.Time(duration).toMilliseconds());
  } else if (currentNote >= notes.length) {
    currentNote = 0;
    isPlaying = false;
    clearInterval(pedalInterval);
  }
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
