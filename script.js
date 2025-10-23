// Initialize the map
const map = L.map('map').setView([53.3498, -6.2603], 11); // Centered on Dublin

// Add a base map (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Load your GeoJSON file
fetch('DublinPostCodes_4326.geojson') // Replace with your file path or URL
    .then(response => response.json())
    .then(data => {
        // Add the GeoJSON layer to the map
        L.geoJSON(data, {
            style: function(feature) {
                return {
                    color: '#3388ff',
                    weight: 2,
                    fillOpacity: 0.2,
                    fillColor: '#3388ff'
                };
            },
            onEachFeature: function(feature, layer) {
                // Add a popup with the postal code
                layer.bindPopup(`Postal Code: ${feature.properties.postal_code}`);
            }
        }).addTo(map);
    })
    .catch(error => {
        console.error('Error loading the GeoJSON file:', error);
    });
