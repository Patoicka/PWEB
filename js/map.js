// ====================================================================================
// === LÓGICA DEL MAPA (LEAFLET) ===
// ====================================================================================

let map;
let currentMarker = null;

function initializeMap() {
    // Inicialización del mapa debe ser global para ser accesible después del login
    map = L.map('map', { 
        // Opciones de mapa por defecto para que no falle al iniciarse oculto
        center: [20, 0], 
        zoom: 2 
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { 
        attribution: '© OpenStreetMap' 
    }).addTo(map);
}

function updateMap(lat, lon, title) {
    if(currentMarker) map.removeLayer(currentMarker);
    currentMarker = L.marker([lat, lon]).addTo(map).bindPopup(`<b>${title}</b>`).openPopup();
    map.flyTo([lat, lon], 10, { duration: 2 });
}

function setupMapClickHandler() {
    map.on('click', async function(e) {
        setMode('place');
        updateMap(e.latlng.lat, e.latlng.lng, "Ubicación");
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${e.latlng.lat}&lon=${e.latlng.lng}&zoom=10`);
        const data = await res.json();
        if(data.address) {
            const code = data.address.country_code ? data.address.country_code.toUpperCase() : "XX";
            const city = data.address.city || data.address.state || "Ubicación";
            document.getElementById('searchInput').value = city;
            processAllData(city, code, e.latlng.lat, e.latlng.lng);
        }
    });
}

