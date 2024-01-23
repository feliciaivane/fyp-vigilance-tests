// script.js

let visualFalseStarts = 0, auditoryFalseStarts = 0, combinedFalseStarts = 0;
let visualResponses = 0, auditoryResponses = 0, combinedResponses = 0;
let visualStartTime, visualEndTime, visualInterval;
let visualIntervalTotal = 0;
let visualTestRunning = false;
let auditoryStartTime, auditoryEndTime, auditoryInterval;
let auditoryIntervalTotal = 0;
let auditoryTestRunning = false;
let audioPlaying = false;
let combinedStartTime, combinedEndTime, combinedInterval;
let combinedIntervalTotal = 0;
let combinedTestRunning = false;
let combinedAudioPlaying = false;

// Visual Test Functions
function showVisualStimulus() {
    document.getElementById('visual-box').style.backgroundColor = 'red';
    visualStartTime = new Date().getTime();
}

function hideVisualStimulus() {
    document.getElementById('visual-box').style.backgroundColor = '#ccc';
    setTimeout(() => {
        if (visualTestRunning) {
            showVisualStimulus();
        }
    }, Math.random() * 6000 + 1000); // Random time between 1-7 seconds
}

function recordVisualResponse() {
    if (document.getElementById('visual-box').style.backgroundColor === 'red') {
        // Valid response
        visualResponses++;
        visualEndTime = new Date().getTime();
        visualInterval = visualEndTime - visualStartTime;
        visualIntervalTotal += visualInterval;
        hideVisualStimulus(); // Hide the visual stimulus only when the user clicks the button
    } else {
        // False start
        visualFalseStarts++;
    }
}

function startVisualTest() {
    // Reset counters and flags
    visualFalseStarts = 0;
    visualResponses = 0;
    visualIntervalTotal = 0;
    visualTestRunning = true;

    // After 2 minutes, display the results
    setTimeout(() => {
        visualTestRunning = false; // Stop the visual test
        alert(`Visual Test Results:
        Average Response Time: ${visualResponses > 0 ? visualIntervalTotal / visualResponses : 0}
        Number of False Starts: ${visualFalseStarts}`);
    }, 120000);

    // Start the tests
    setTimeout(() => showVisualStimulus(), Math.random() * 2000 + 1000); // Random time between 1-3 seconds

    // Hide the start button after it's clicked
    document.getElementById('start-visual-button').style.display = 'none';
}

// Auditory Test Functions
function playAuditoryStimulus() {
    let audio = document.getElementById('auditory-audio');
    audioPlaying = true;
    audio.play();
    auditoryStartTime = new Date().getTime();
}

function hideAuditoryStimulus() {
    audioPlaying = false;
    let audio = document.getElementById('auditory-audio');
    audio.pause();
    audio.currentTime = 0; // Reset audio to the beginning
    setTimeout(() => {
        if (auditoryTestRunning) {
            playAuditoryStimulus();
        }
    }, Math.random() * 6000 + 1000); // Random time between 1-7 seconds
}

function recordAuditoryResponse() {
    if (audioPlaying) {
        // Valid response
        auditoryResponses++;
        auditoryEndTime = new Date().getTime();
        auditoryInterval = auditoryEndTime - auditoryStartTime;
        auditoryIntervalTotal += auditoryInterval;
        hideAuditoryStimulus(); // Hide the auditory stimulus only when the user clicks the button
    } else {
        // False start
        auditoryFalseStarts++;
    }
}

function startAuditoryTest() {
    // Reset counters and flags
    auditoryFalseStarts = 0;
    auditoryResponses = 0;
    auditoryIntervalTotal = 0;
    auditoryTestRunning = true;

    // After 2 minutes, display the results
    setTimeout(() => {
        auditoryTestRunning = false; // Stop the auditory test
        alert(`Auditory Test Results:
        Average Response Time: ${auditoryResponses > 0 ? auditoryIntervalTotal / auditoryResponses : 0}
        Number of False Starts: ${auditoryFalseStarts}`);
    }, 120000);

    // Start the tests
    setTimeout(() => playAuditoryStimulus(), Math.random() * 2000 + 1000); // Random time between 1-3 seconds

    // Hide the start button after it's clicked
    document.getElementById('start-auditory-button').style.display = 'none';
}

// Combined Test Functions
function showCombinedStimulus() {
    document.getElementById('combined-box').style.backgroundColor = 'red';
    combinedStartTime = new Date().getTime();
}

function playCombinedStimulus() {
    let audio = document.getElementById('combined-audio');
    combinedAudioPlaying = true;
    audio.play();
    combinedStartTime = new Date().getTime();
}

function hideCombinedStimulus() {
    combinedAudioPlaying = false;
    document.getElementById('combined-box').style.backgroundColor = '#ccc';
    let audio = document.getElementById('combined-audio');
    audio.pause();
    audio.currentTime = 0; // Reset audio to the beginning
    setTimeout(() => {
        if (combinedTestRunning) {
            if (Math.random() < 0.5) {
                showCombinedStimulus();
            } else {
                playCombinedStimulus();
            }
        }
    }, Math.random() * 6000 + 1000); // Random time between 1-7 seconds
}

function recordCombinedResponse() {
    if (document.getElementById('combined-box').style.backgroundColor === 'red' || combinedAudioPlaying) {
        // Valid response
        combinedResponses++;
        combinedEndTime = new Date().getTime();
        combinedInterval = combinedEndTime - combinedStartTime;
        combinedIntervalTotal += combinedInterval;
        hideCombinedStimulus(); // Hide the combined stimulus only when the user clicks the button
    } else {
        // False start
        combinedFalseStarts++;
    }
}

function startCombinedTest() {
    // Reset counters and flags
    combinedFalseStarts = 0;
    combinedResponses = 0;
    combinedIntervalTotal = 0;
    combinedTestRunning = true;

    // After 2 minutes, display the results
    setTimeout(() => {
        combinedTestRunning = false; // Stop the combined test
        alert(`Combined Test Results:
        Average Response Time: ${combinedResponses > 0 ? combinedIntervalTotal / combinedResponses : 0}
        Number of False Starts: ${combinedFalseStarts}`);
    }, 120000);

    // Start the tests
    setTimeout(() => {
        if (Math.random() < 0.5) {
            showCombinedStimulus();
        } else {
            playCombinedStimulus();
        }
    }, Math.random() * 2000 + 1000); // Random time between 1-3 seconds

    // Hide the start button after it's clicked
    document.getElementById('start-combined-button').style.display = 'none';
}

// Function to toggle between visual, auditory, and combined sections
function toggleTestMode() {
    const modeSelect = document.getElementById('test-mode');
    const visualSection = document.getElementById('visual-section');
    const auditorySection = document.getElementById('auditory-section');
    const combinedSection = document.getElementById('combined-section');

    if (modeSelect.value === 'visual') {
        visualSection.style.display = 'block';
        auditorySection.style.display = 'none';
        combinedSection.style.display = 'none';
    } else if (modeSelect.value === 'auditory') {
        visualSection.style.display = 'none';
        auditorySection.style.display = 'block';
        combinedSection.style.display = 'none';
    } else if (modeSelect.value === 'combined') {
        visualSection.style.display = 'none';
        auditorySection.style.display = 'none';
        combinedSection.style.display = 'block';
    }
}

// Event listener for mode selection changes
document.getElementById('test-mode').addEventListener('change', toggleTestMode);

// Initialize the toggleTestMode function to set the initial state
toggleTestMode();
