let lat, lng, video;
const submitBtn = document.getElementById('submit');

function setup() { //p5 setup
    noCanvas();
    // const canvas = createCanvas(100,100);
    // background(255,0,100);
    video = createCapture(VIDEO);
    video.size(320, 240);
    video.style('display','block');
    
}

function getMood() {
    const input = document.getElementById('mood');
    const mood = input.value;
    if(input.value !== null){
        input.value = "";
    }
    return mood;
}

function getTime() {
    const timestamp = Date.now();
    return timestamp;
}

function getPosition() {
    if ('geolocation' in navigator) {
        console.log(lat, lng);
        navigator.geolocation.getCurrentPosition(position => {
            lat = position.coords.latitude;
            lng = position.coords.longitude;
            console.log(lat, lng);
            document.getElementById('lat').innerText = lat.toFixed(2);
            document.getElementById('lng').innerText = lng.toFixed(2);
        });
    } else {
        console.log("unavailable");
    }
}

function navigateToGallery(){
    window.location.href="/gallery.html";
}

async function postData() {
    const mood = getMood();
    const timestamp = getTime();
    video.loadPixels();
    const image64 = video.canvas.toDataURL(); //video to base64
    const data = { lat, lng, image64, mood, timestamp };
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    const response = await fetch('/api', options);
    const responseData = await response.json();
    navigateToGallery();
};

function init() {
    getPosition();
    submitBtn.addEventListener('click', postData);
}

init();           