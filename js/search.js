// ====================================================================================
// === LÓGICA DE BÚSQUEDA Y PROCESAMIENTO DE DATOS ===
// ====================================================================================

let searchMode = 'place';

function resetSystem() {
    document.body.style.opacity = '0';
    setTimeout(() => { window.location.reload(); }, 500);
}

function setMode(mode) {
    searchMode = mode;
    const btnPlace = document.getElementById('btnPlace');
    const btnCompany = document.getElementById('btnCompany');
    const input = document.getElementById('searchInput');
    
    if (mode === 'place') {
        btnPlace.classList.add('bg-white', 'text-corporate-900', 'ring-2');
        btnPlace.classList.remove('border', 'border-white/30', 'text-white', 'hover:bg-white/10');
        btnCompany.classList.remove('bg-white', 'text-corporate-900', 'ring-2');
        btnCompany.classList.add('border', 'border-white/30', 'text-white', 'hover:bg-white/10');
        input.placeholder = "Ingrese un país (Ej: México, Japón)...";
    } else {
        btnCompany.classList.add('bg-white', 'text-corporate-900', 'ring-2');
        btnCompany.classList.remove('border', 'border-white/30', 'text-white', 'hover:bg-white/10');
        btnPlace.classList.remove('bg-white', 'text-corporate-900', 'ring-2');
        btnPlace.classList.add('border', 'border-white/30', 'text-white', 'hover:bg-white/10');
        input.placeholder = "Ingrese empresa (Ej: Zara, Apple)...";
    }
}

async function initiateSearch() {
    const input = document.getElementById('searchInput');
    const query = input.value.toLowerCase().trim();
    if(!query) return;
    document.getElementById('mainLoader').style.display = 'block';

    try {
        // ... lógica de búsqueda ...
        if (searchMode === 'company') {
            let foundCode = null;
            for (const [key, code] of Object.entries(companyKeywords)) {
                if (query.includes(key)) { foundCode = code; break; }
            }
            if (foundCode && countryLeaders[foundCode]) {
                const data = countryLeaders[foundCode];
                updateMap(data.hqCoords[0], data.hqCoords[1], data.name);
                processAllData(data.hq, foundCode, data.hqCoords[0], data.hqCoords[1]);
            } else {
                // Búsqueda genérica nominatim
                const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`;
                const res = await fetch(url);
                const data = await res.json();
                if(data.length === 0) throw new Error("No encontrado");
                updateMap(data[0].lat, data[0].lon, query);
                // Intentar sacar país
                const revRes = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${data[0].lat}&lon=${data[0].lon}`);
                const revData = await revRes.json();
                const code = revData.address.country_code ? revData.address.country_code.toUpperCase() : "XX";
                processAllData(query, code, data[0].lat, data[0].lon);
            }
        } else {
            const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1&limit=1`;
            const res = await fetch(url);
            const data = await res.json();
            if(data.length === 0) throw new Error("Ubicación desconocida");
            const loc = data[0];
            const code = loc.address.country_code ? loc.address.country_code.toUpperCase() : "XX";
            updateMap(loc.lat, loc.lon, loc.display_name.split(',')[0]);
            processAllData(loc.display_name.split(',')[0], code, loc.lat, loc.lon);
        }
    } catch (e) { 
        alert("No se encontraron resultados."); 
    }
    finally { 
        document.getElementById('mainLoader').style.display = 'none'; 
    }
}

function processAllData(name, countryCode, lat, lon) {
    // Clima (CON ICONOS ACTUALIZADOS)
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
        .then(r=>r.json()).then(d=>{
            const t = d.current_weather.temperature;
            const code = d.current_weather.weathercode;
            let icon = '<i class="fa-solid fa-sun text-yellow-500 text-5xl drop-shadow-md animate-spin-slow"></i>';
            let status = "Despejado";
            
            if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) {
                icon = '<i class="fa-solid fa-cloud-showers-heavy text-blue-600 text-5xl drop-shadow-md animate-bounce"></i>';
                status = "Lluvioso";
            } else if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86) || t <= 0) {
                icon = '<i class="fa-regular fa-snowflake text-cyan-300 text-5xl drop-shadow-md animate-pulse"></i>';
                status = "Nieve / Gélido";
            } else if (code > 0 && code <= 48) {
                icon = '<i class="fa-solid fa-cloud text-gray-400 text-5xl drop-shadow-md"></i>';
                status = "Nublado";
            }

            document.getElementById('weatherData').innerHTML = `
                <div class="flex flex-col items-center justify-center py-2">
                    <div class="mb-3">${icon}</div>
                    <div class="text-4xl font-bold text-slate-700 mb-1">${t}°C</div>
                    <div class="text-xs font-bold text-corporate-600 uppercase tracking-widest mb-1">${status}</div>
                    <div class="text-xs text-slate-400 font-medium">Viento: ${d.current_weather.windspeed} km/h</div>
                </div>`;
        });

    // Imagen
    const q = searchMode === 'company' ? 'modern corporate headquarters architecture' : name + ' city landmark';
    document.getElementById('cityImage').src = `https://image.pollinations.ai/prompt/${encodeURIComponent(q)}?width=600&height=400&nologo=true`;
    document.getElementById('imgLocationName').innerText = name;

    // Datos País
    if(countryCode !== "XX") {
        fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`)
            .then(r=>r.json()).then(d=>{
                const c = d[0];
                document.getElementById('countryName').innerText = c.translations.spa?.common || c.name.common;
                document.getElementById('flagImg').src = c.flags.png;
                document.getElementById('population').innerText = c.population.toLocaleString();
                document.getElementById('currency').innerText = Object.values(c.currencies)[0].name;
                document.getElementById('language').innerText = Object.values(c.languages)[0];
            }).catch(()=>{ 
                document.getElementById('countryName').innerText = "Datos Limitados"; 
            });
        
        // MOSTRAR SECCIONES CON FALLBACK
        const leader = countryLeaders[countryCode];
        const data = leader || genericData; // Fallback a datos genéricos si no hay líder específico
        
        document.getElementById('liderSection').classList.remove('hidden');
        document.getElementById('cultureTipBox').classList.remove('hidden');
        document.getElementById('customSection').classList.remove('hidden');

        document.getElementById('leaderCountryCode').innerText = countryCode;
        document.getElementById('leaderName').innerText = data.name;
        document.getElementById('leaderIndustry').innerText = data.industry;
        document.getElementById('leaderDesc').innerText = data.desc;
        document.getElementById('leaderRevenue').innerText = data.revenue;
        document.getElementById('leaderHq').innerText = data.hq;
        document.getElementById('cultureTipText').innerText = data.culturalTip;
        document.getElementById('customTitle').innerText = data.customTitle;
        document.getElementById('customDesc').innerText = data.customDesc;
    }

    // Aeropuertos
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=airport near ${name}&limit=4`)
        .then(r=>r.json()).then(d=>{
            const l = document.getElementById('airportsList');
            l.innerHTML = '';
            if(d.length) d.forEach(a => l.innerHTML += `<div class="text-xs p-2 border-b border-gray-100 text-gray-600 flex gap-2 items-center"><i class="fa-solid fa-plane text-blue-400"></i> ${a.display_name.split(',')[0]}</div>`);
            else l.innerHTML = '<p class="text-center text-xs text-gray-400 py-2">Sin datos logísticos.</p>';
        });
    
    // Actualizar gráfico
    if (typeof qualityChart !== 'undefined') {
        qualityChart.data.datasets[0].data = Array.from({length: 5}, ()=>Math.floor(Math.random()*5)+5);
        qualityChart.update();
    }
}

