// ====================================================================================
// === INICIALIZACIÓN PRINCIPAL ===
// ====================================================================================

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar mapa
    initializeMap();
    
    // Inicializar gráfico
    initializeChart();
    
    // Configurar manejador de clics en el mapa
    setupMapClickHandler();
    
    // Verificar estado de login al cargar
    checkLoginStatus();
});

// Configurar evento de búsqueda con Enter
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                initiateSearch();
            }
        });
    }
});

