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
    // const block = image64.split(";"); // Split the base64 string in data and contentType
    // const contentType = block[0].split(":")[1]; // Get the content type
    // const imageData = block[1].split(",")[1]; // Get the real image data
    // const blob = b64toBlob(imageData, contentType); // Convert base64 to blob

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


// function b64toBlob(b64Data, contentType, sliceSize) {
//     contentType = contentType || '';
//     sliceSize = sliceSize || 512;

//     const byteCharacters = atob(b64Data);
//     const byteArrays = [];

//     for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
//         const slice = byteCharacters.slice(offset, offset + sliceSize);

//         const byteNumbers = new Array(slice.length);
//         for (let i = 0; i < slice.length; i++) {
//             byteNumbers[i] = slice.charCodeAt(i);
//         }

//         const byteArray = new Uint8Array(byteNumbers);

//         byteArrays.push(byteArray);
//     }

//   const blob = new Blob(byteArrays, {type: contentType});
//   return blob;
// }

function init() {
    getPosition();
    submitBtn.addEventListener('click', postData);
}

init();           