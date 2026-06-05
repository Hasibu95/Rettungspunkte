let rettungspunkte = [];

fetch('rettungspunkte.json')
    .then(response => response.json())
    .then(data => {
        rettungspunkte = data;
    });

function rettungspunktSuchen() {

    const eingabe = document
        .getElementById('suche')
        .value
        .trim()
        .toUpperCase();

    const ergebnisDiv = document.getElementById('ergebnis');

    const punkt = rettungspunkte.find(p =>
        p.nummer.toUpperCase() === eingabe
    );

    if (!punkt) {
        ergebnisDiv.innerHTML = `
            ❌ Rettungspunkt nicht gefunden.
        `;
        return;
    }

    ergebnisDiv.innerHTML = `
        <strong>Rettungspunkt:</strong><br>
        ${punkt.nummer}<br><br>

        <strong>Beschreibung:</strong><br>
        ${punkt.name}<br><br>

        <strong>Koordinaten:</strong><br>
        ${punkt.lat}, ${punkt.lon}<br><br>

        <button class="karten-button"
            onclick="googleMaps(${punkt.lat}, ${punkt.lon})">
            🌍 Google Maps öffnen
        </button>
    `;
}
function googleMaps(lat, lon) {
    window.open(
        `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`,
        '_blank'
    );
}