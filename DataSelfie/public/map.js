// Initialize and add the map
function initMap() {
    
    const uluru = {lat: 37.344, lng: -131.036};
    // The map, centered at Uluru
    const map = new google.maps.Map(
        document.getElementById('map'), {zoom: 4, center: uluru});
    // The marker, positioned at Uluru
    const image = 'images/image1.png';
    const iconImg = {
        url: image,
        scaledSize: new google.maps.Size(50, 40)
    };
    const marker = new google.maps.Marker({
        position: uluru, 
        map: map,
        icon: iconImg,
        shape: new google.maps.Circle()
    });
}

