// ====================================================================================
// === LÓGICA DE GRÁFICOS (CHART.JS) ===
// ====================================================================================

let qualityChart;

function initializeChart() {
    const ctx = document.getElementById('qualityChart').getContext('2d');
    qualityChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Estabilidad', 'Infraestructura', 'Innovación', 'Mercado', 'Talento'],
            datasets: [{ 
                label: 'Score', 
                data: [8, 7, 6, 8, 7], 
                backgroundColor: 'rgba(22, 163, 74, 0.2)', 
                borderColor: '#16a34a', 
                pointBackgroundColor: '#fff' 
            }]
        },
        options: { 
            scales: { 
                r: { 
                    beginAtZero: true, 
                    max: 10, 
                    ticks: { display: false } 
                } 
            }, 
            plugins: { 
                legend: { display: false } 
            } 
        }
    });
}

