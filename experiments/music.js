let cols, rows;
let grid;
let nextGrid;
let cellSize = 10;
let isPlaying = false;
let notes = ["C4", "E4", "G4", "C5", "E5", "G4", "C5", "E5", "C4", "E4", "G4", "C5", "E5", "G4", "C5", "E5","C4", "D4", "A4", "D5", "F5", "A4", "D5", "F5", "C4", "D4", "A4", "D5", "F5", "A4", "D5", "F5", "B3", "D4", "G4", "D5", "F5", "G4", "D5", "F5", "B3", "D4", "G4", "D5", "F5", "G4", "D5", "F5", "C4", "E4", "G4", "C5", "E5", "G4", "C5", "E5", "C4", "E4", "G4", "C5", "E5", "G4", "C5", "E5", "C4", "E4", "A4", "E5", "A5","A4", "E5", "A5", "C4", "E4", "A4", "E5", "A5","A4", "E5", "A5", "C4", "D4", "F#4", "A4", "D5", "F#4", "A4", "D5", "C4", "D4", "F#4", "A4", "D5", "F#4", "A4", "D5", "B3", "D4", "G4", "D5", "G5", "G4", "D5", "G5", "B3", "D4", "G4", "D5", "G5", "G4", "D5", "G5", "B3", "C4", "E4", "G4", "C5", "E4", "G4", "C5", "B3", "C4", "E4", "G4", "C5", "E4", "G4", "C5", "A3", "C4", "E4", "G4", "C5", "E4", "G4", "C5", "A3", "C4", "E4", "G4", "C5", "E4", "G4", "C5"];
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
  cols = floor(width / cellSize);
  rows = floor(height / cellSize);
  grid = makeGrid(cols, rows);
  nextGrid = makeGrid(cols, rows);
  randomizeGrid();
}

async function setupAudio() {
  
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
    clearGrid();
  }
});

function makeGrid(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < cols; i++) {
    arr[i] = new Array(rows).fill(0);
  }
  return arr;
}

function randomizeGrid() {
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      grid[x][y] = random() > 0.85 ? 1 : 0;
    }
  }
}

function clearGrid() {
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      grid[x][y] = 0;
    }
  }
}

function playPedalNotes() {
  let index = 0;

  function playNextPedalNote() {
    if (isPlaying && index < pedalNotes.length) {
      let note = pedalNotes[index];
      let duration = pedalDurations[index];
      synth.triggerAttackRelease(note, duration);
      index++;
      let x = floor(random(cols));
      let y = floor(random(rows));
      grid[x][y] = 1;
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
    let x = floor(random(cols));
    let y = floor(random(rows));
    grid[x][y] = 1;

    setTimeout(playNextNote, Tone.Time(duration).toMilliseconds());
  } else if (currentNote >= notes.length) {
    currentNote = 0;
    isPlaying = false;
    clearInterval(pedalInterval);
  }
}

function computeNextGen() {
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      let state = grid[x][y];
      let neighbors = countNeighbors(grid, x, y);
      if (state == 0 && neighbors == 3) nextGrid[x][y] = 1;
      else if (state == 1 && (neighbors < 2 || neighbors > 3)) nextGrid[x][y] = 0;
      else nextGrid[x][y] = state;
    }
  }
  [grid, nextGrid] = [nextGrid, grid];
}

function countNeighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      sum += grid[col][row];
    }
  }
  sum -= grid[x][y];
  return sum;
}


function draw() {
  background(0);
  computeNextGen();
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      if (grid[x][y] == 1) {
        fill(255, 100, 150);
        noStroke();
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }
  }
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
}
