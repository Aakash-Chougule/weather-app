let currentData = {};

function getWeather() {
    let city = document.getElementById("city").value;

    if (!city) {
        alert("Please enter a city");
        return;
    }

    fetch(`https://api.weatherapi.com/v1/current.json?key=63fbb7e9f144475795874056261504&q=${city}`)
    .then(res => res.json())
    .then(data => {

        if (data.error) {
            document.getElementById("weatherResult").innerHTML =
                "❌ City not found";
            return;
        }

        currentData = {
            city: data.location.name,
            temp: data.current.temp_c,
            weather: data.current.condition.text
        };

        document.getElementById("weatherResult").innerHTML =
            `City: ${currentData.city} <br>
             Temp: ${currentData.temp} °C <br>
             Weather: ${currentData.weather}`;
    })
    .catch(err => {
        console.log(err);
        document.getElementById("weatherResult").innerHTML =
            "⚠️ Error fetching weather";
    });
}

function saveWeather() {

    // ❌ Prevent saving empty data
    if (!currentData.city) {
        alert("Search weather first!");
        return;
    }

    fetch("save.php", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(currentData)
    })
    .then(res => res.text())
    .then(msg => {
        alert(msg);
        loadSaved();
    })
    .catch(err => console.log(err));
}

function loadSaved() {
    fetch("fetch.php")
    .then(res => res.json())
    .then(data => {

        if (data.length === 0) {
            document.getElementById("savedData").innerHTML = "No saved data";
            return;
        }

        let html = `
            <table class="weather-table">
                <tr>
                    <th>City</th>
                    <th>Temperature</th>
                    <th>Weather</th>
                    <th>Actions</th>
                </tr>
        `;

        data.forEach(row => {
            html += `
                <tr>
                    <td>${row.city}</td>
                    <td>${row.temperature} °C</td>
                    <td>${row.weather}</td>
                    <td>
                        <button onclick="viewCity('${row.city}')">View</button>
                        <button onclick="deleteData(${row.id})">Delete</button>
                    </td>
                </tr>
            `;
        });

        html += `</table>`;

        document.getElementById("savedData").innerHTML = html;
    })
    .catch(err => console.log(err));
}

function viewCity(city) {
    fetch(`fetch.php?city=${city}`)
    .then(res => res.json())
    .then(data => {
        let html = `<h3>${city} Records</h3>`;

        if (data.length === 0) {
            html += "No records found";
        }

        data.forEach(row => {
            html += `
                <div>
                    Temp: ${row.temperature}°C - ${row.weather}
                </div>
            `;
        });

        document.getElementById("weatherResult").innerHTML = html;
    })
    .catch(err => console.log(err));
}

function deleteData(id) {
    if (!confirm("Delete this record?")) return;

    fetch(`delete.php?id=${id}`)
    .then(() => loadSaved())
    .catch(err => console.log(err));
}

window.onload = loadSaved;