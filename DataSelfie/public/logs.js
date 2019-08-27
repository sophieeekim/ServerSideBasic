async function getData() {
    console.log("get data");
    const response = await fetch('/api');
    const data = await response.json();
    console.log(data);

    const currentData = document.getElementById('dataSet');
    currentData.innerHTML = "";

    data.forEach(item => {
        const root = document.createElement('div');
        const image = document.createElement('img');
        const mood = document.createElement('div');
        const geo = document.createElement('div');
        const date = document.createElement('div');

        mood.textContent = `${item.mood}`;
        geo.textContent = `lat : ${item.lat}˚, lng : ${item.lng}`;
        const dateString = new Date(item.timestamp).toLocaleString();
        date.textContent = dateString;
        image.src = item.image64;

        root.append(image, mood, geo, date);
        root.classList.add('data');
        document.getElementById('dataSet').append(root);
    });
}

function init(){
    getData();
}

init();