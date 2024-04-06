var numberEqualTemperament = 41;
var margin = 10; 

var inputElement = document.getElementById("numberOfTones");
inputElement.max = numberEqualTemperament;

var tones = [];
var reverseTones = []; 
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function generateScale() {
    const numberOfTones = parseInt(document.getElementById("numberOfTones").value);
    tones = generateRandomTones(numberOfTones);
    tones.sort((a, b) => a - b);
    displayChosenTones(tones);
    // Now deep copy of array tones (in javascript):
    reverseTones = JSON.parse(JSON.stringify(tones)).reverse();
}

function generateRandomTones(numberOfTones) {
    const pitches = [];
    pitches.push(0); 
    pitches.push(numberEqualTemperament);
    while (pitches.length < numberOfTones+1) {
        const pitch = 1+Math.floor(Math.random() * (numberEqualTemperament-1));
        if (!pitches.includes(pitch)) {
            pitches.push(pitch);
        }
    }
    return pitches;
}

function displayChosenTones(tones) {
    const canvas = document.getElementById("visualizationCanvas");

    var ctx = canvas.getContext("2d");
    
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    ctx.beginPath();
    for(i = 0; i < 12+1; i++) {
        ctx.moveTo(margin, margin + mapFrequencyToY12(i));
        ctx.lineTo(canvasWidth-margin, margin + mapFrequencyToY12(i));
        ctx.font = "10px Arial";
        ctx.fillStyle = "red";
        tones12names = ["C", "B", "A#", "A", "G#", "G", "F#", "F", "E", "D#", "D", "C#", "C"];
        ctx.fillText(tones12names[i], 0, margin + mapFrequencyToY12(i));
    }
    ctx.strokeStyle = "red";
    ctx.lineWidth = .3;
    ctx.stroke();

    const xStep = (canvasWidth- 2*margin) / (tones.length-1);

    ctx.beginPath();
    tones.forEach((tone, index) => {
        const x = margin+ index * xStep;
        const y = canvasHeight - 2 * margin - mapFrequencyToY(tone);
        
        ctx.lineTo(x, y+margin);
    });

    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;
    ctx.stroke();

    tones.forEach((tone, index)=>{
        // now draw the circles
        const x = margin+ index * xStep;
        const y = canvasHeight - 2 * margin - mapFrequencyToY(tone);
        ctx.beginPath();
        ctx.arc(x, y+margin, 5, 0, 2 * Math.PI);
        ctx.fillStyle = "olive";
        ctx.fill();
        //now annotate the texts on each position
        ctx.font = "20px Arial";
        ctx.fillStyle = "black";
        if (tone < 39){
            ctx.fillText(tone, x-5, y+margin-10);
        }
        else{
            ctx.fillText(tone, x-10, y+margin+20);
        }
    });
}

function mapFrequencyToY(frequency) {
    return (400-2*margin)* (frequency) / numberEqualTemperament; // Scale to canvas height
}

function mapFrequencyToY12(frequency) {
    return (400-2*margin)* (frequency) / 12; // Scale to canvas height
}

function playScale() {
    // const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    tones.forEach((pitch, index) => {
    
        const frequency = pitchToFrequency(pitch);
        
        // Play the tone
        playTone(audioContext, frequency, index * 0.5);
    });
}

function playScaleReverse() {
    const chosenTones = reverseTones;
    // const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    chosenTones.forEach((pitch, index) => {
        const frequency = pitchToFrequency(pitch);
        
        // Play the tone
        playTone(audioContext, frequency, index * 0.5);
    });
}

function pitchToFrequency(pitch) {
    return 261.6256 * Math.pow(2, (pitch) / numberEqualTemperament);
}

function playTone(audioContext, frequency, startTime) {
    // const real = new Float32Array(
    //     [1, 1, 0.8, 0.75, 0.8, 0.75, 
    //         0.8, 0.55, 0.75, 0.5, 0.3]); // Real component
    // const imag = new Float32Array(real.length).fill(0); // Imaginary component

    // const customWaveform = audioContext.createPeriodicWave(real, imag);

    const oscillator = audioContext.createOscillator();
    // oscillator.setPeriodicWave(customWaveform);
    oscillator.type = "triangle";


    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime + startTime);

    const gainNode = audioContext.createGain();
    gainNode.gain.setValueAtTime(0.5, audioContext.currentTime + startTime);
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + startTime + .5);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start(audioContext.currentTime + startTime);
    oscillator.stop(audioContext.currentTime + startTime + 0.5);
}

function playTones(frequencies){
    frequencies.forEach((freq, _) => {
        playTone(audioContext, freq, 0);
    })
    
}
function playfreq(freq){
    playTones([freq]);
}
function playfreqs(freqs){
    playTones(freqs);
}