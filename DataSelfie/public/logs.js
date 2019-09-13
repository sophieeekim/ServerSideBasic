async function getData() {
    console.log("get data");
    const response = await fetch('/api');
    const data = await response.json();
    console.log(data);

    const currentData = document.getElementById('dataSet');
    currentData.innerHTML = "";

    data.forEach(item => {
        const root = document.createElement('div');
        const description = document.createElement('div');
        const image = document.createElement('img');
        const mood = document.createElement('p');
        const geo = document.createElement('p');
        const date = document.createElement('p');

        mood.textContent = `${item.mood}`;
        if(item.lat && item.lng){
        geo.textContent = `lat : ${item.lat.toFixed(2)}˚, lng : ${item.lng.toFixed(2)}`;
        }
        const dateString = new Date(item.timestamp).toLocaleString();
        date.textContent = dateString;
        image.src = item.url;

        description.classList.add('description');
        date.classList.add('date');
        mood.classList.add('mood');

        description.append(mood,geo,date);
        root.append(image, description);
        root.classList.add('data');
        document.getElementById('dataSet').append(root);
    });
}

function init(){
    getData();
}

init();