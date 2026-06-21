const stayoraIcon = L.icon({
    iconUrl: "/images/stayora-marker.png",
    iconSize: [55, 55],
    iconAnchor: [27, 55],
    popupAnchor: [0, -40],
});

const map = L.map("map").setView(
    [coordinates[1], coordinates[0]],
    10
);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);
const marker = L.marker(
    [coordinates[1], coordinates[0]],
    {
        icon: stayoraIcon,
    }
).addTo(map);

marker.bindPopup(`
    <div style="min-width:220px; font-family: 'Plus Jakarta Sans', sans-serif;">
        <h6 style="margin:0; font-weight:700;">
            🏨 ${listingTitle}
        </h6>

        <p style="margin:8px 0 4px; color:#555;">
            📍 ${listingLocation}
        </p>

        <p style="margin:0; color:#fe424d; font-weight:600;">
            ₹${listingPrice} / Night
        </p>

        <hr style="margin:10px 0;">

        <p style="margin:0; font-size:13px;">
            📌 Exact location will be provided after booking.
        </p>

        <br>

        <a
            href="https://www.google.com/maps?q=${coordinates[1]},${coordinates[0]}"
            target="_blank"
            style="
                display:inline-block;
                background:#fe424d;
                color:white;
                padding:8px 14px;
                border-radius:8px;
                text-decoration:none;
                font-size:14px;
                font-weight:600;
            ">
            📍 Open in Google Maps
        </a>
    </div>
`);