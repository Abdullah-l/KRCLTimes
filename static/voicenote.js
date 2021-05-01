const startButton = document.getElementById('record');
const stopButton = document.getElementById('stop');
const pauseButton = document.getElementById('pause');
const resumeButton = document.getElementById('resume');
const recordings = document.getElementById('recordings');
const main = document.getElementById('mic');
// var canvas = document.querySelector('.visualizer');
var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

var submitButton = document.getElementById('submit');
var form = new FormData();
var balob =new Object();



let isRecording = false;
let recorder = null;
let blobs = [];
let mediaStream = null;
let isPaused = false;
let Mp3MediaRecorder = null;
const supportsWasm = WebAssembly && typeof WebAssembly.instantiate === 'function';
const supportsUserMediaAPI = navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function';
const isBrowserSupported = supportsWasm && supportsUserMediaAPI;

// var audioCtx = new (window.AudioContext || webkitAudioContext)();
// var canvasCtx = canvas.getContext("2d");

if (isBrowserSupported) {
    window.mp3MediaRecorder
        .getMp3MediaRecorder({ wasmURL: 'https://unpkg.com/vmsg@0.3.5/vmsg.wasm' })
        .then(recorderClass => {
            Mp3MediaRecorder = recorderClass;
            startButton.disabled = false;
            if (iOS){
                pauseButton.style.display = 'none';
                resumeButton.style.display = 'none';
            }
        });

    startButton.addEventListener('click', () => {
        navigator.mediaDevices.getUserMedia({ audio: true }).then(
            stream => {
                mic.style.display = 'none';
                mediaStream = stream;
                recorder = new Mp3MediaRecorder(stream);
                recorder.start();
                recorder.onstart = e => {
                    console.log('onstart', e);
                    blobs = [];
                    // visualize(mediaStream);
                    // canvas.style.display = 'block';
                    timer2.trigger('start');
                    startButton.disabled = true;
                    stopButton.disabled = false;
                    pauseButton.disabled = false;
                };

                recorder.ondataavailable = e => {
                    console.log('ondataavailable', e);
                    blobs.push(e.data);
                };

                recorder.onstop = e => {
                    console.log('onstop', e);
                    timer2.trigger('complete');
                    mediaStream.getTracks().forEach(track => track.stop());

                    pauseButton.disabled = true;
                    stopButton.disabled = true;

                    const mp3Blob = new Blob(blobs, { type: 'audio/mpeg' });
                    const mp3BlobUrl = URL.createObjectURL(mp3Blob);
                    const audio = new Audio();
                    audio.controls = true;
                    audio.src = mp3BlobUrl;
                    recordings.appendChild(audio);

                    balob = mp3Blob;
                    var fd = document.querySelector("form");
                    form = new FormData(fd);
                    form.append('audio', mp3Blob);
                };

                recorder.onpause = e => {
                    console.log('onpause', e);
                    timer2.trigger('pause');
                    resumeButton.disabled = false;
                    pauseButton.disabled = true;
                    stopButton.disabled = true;

                };

                recorder.onresume = e => {
                    console.log('onresume', e);
                    timer2.trigger('resume');
                    resumeButton.disabled = true;
                    pauseButton.disabled = false;
                    stopButton.disabled = false;

                };

                recorder.onerror = e => {
                    console.error('onerror', e);
                };
            },
            reason => {
                console.warn('Could not get microphone access.\nError:', reason.message);
                startButton.disabled = true;
            }
        );
    });

    stopButton.addEventListener('click', () => {
        // canvas.style.display = 'none';
        recorder.stop();
    });

    pauseButton.addEventListener('click', () => {
        // canvas.style.display = 'none';
        recorder.pause();
    });

    resumeButton.addEventListener('click', () => {
        // canvas.style.display = 'block';
        recorder.resume();
    });
} else {
    const renderError = reason => {
        const clonedMain = main.cloneNode(false);
        clonedMain.innerHTML = `
            <h1 class="nes-text is-error">MP3 MediaRecorder is not supported</h1>
            <p class="nes-text">
                ${reason}
            </p>
        `;
        main.parentNode.replaceChild(clonedMain, main);
    };

    if (!supportsUserMediaAPI) {
        renderError(
            'This recorder requires the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Media_Streams_API" class="nes-text is-error">getUserMedia API</a> but it is not supported in your browser.'
        );
    } else if (!supportsWasm) {
        renderError(
            'This recorder requires <a href="https://developer.mozilla.org/en-US/docs/WebAssembly" class="nes-text is-error">WebAssembly</a> but it is not supported in your browser.'
        );
    }
}

// function visualize(stream) {
//     var source = audioCtx.createMediaStreamSource(stream);

//     var analyser = audioCtx.createAnalyser();
//     analyser.fftSize = 2048;
//     var bufferLength = analyser.frequencyBinCount;
//     var dataArray = new Uint8Array(bufferLength);

//     source.connect(analyser);
//     //analyser.connect(audioCtx.destination);

//     draw()

//     function draw() {
//         WIDTH = canvas.width
//         HEIGHT = canvas.height;

//         requestAnimationFrame(draw);

//         analyser.getByteTimeDomainData(dataArray);

//         canvasCtx.fillStyle = '#74A541';
//         canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

//         canvasCtx.lineWidth = 2;
//         canvasCtx.strokeStyle = '#F5FBEF';

//         canvasCtx.beginPath();

//         var sliceWidth = WIDTH * 1.0 / bufferLength;
//         var x = 0;


//         for (var i = 0; i < bufferLength; i++) {

//             var v = dataArray[i] / 128.0;
//             var y = v * HEIGHT / 2;

//             if (i === 0) {
//                 canvasCtx.moveTo(x, y);
//             } else {
//                 canvasCtx.lineTo(x, y);
//             }

//             x += sliceWidth;
//         }

//         canvasCtx.lineTo(canvas.width, canvas.height / 2);
//         canvasCtx.stroke();

//     }
// }
