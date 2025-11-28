// ====================================================================================
// === CONEXIÓN A BASE DE DATOS (SUPABASE) ===
// ====================================================================================

/**
 * Llama a la función RPC 'increment_visits' en Supabase para obtener el contador,
 * incrementándolo atómicamente.
 */
async function incrementAndGetVisitCounter() {
    const counterElement = document.getElementById('visit-counter');
    if (!counterElement) return;
    
    try {
        // Llama al endpoint RPC: /rpc/nombre_de_la_funcion
        const res = await fetch(
            `${SUPABASE_URL}/rest/v1/rpc/increment_visits`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': SUPABASE_ANON_KEY,
                },
                body: JSON.stringify({}) // Cuerpo necesario para peticiones POST a RPC
            }
        );

        if (res.ok) {
            const count = await res.json(); 
            const finalCount = count + DISPLAY_OFFSET; 
            counterElement.innerText = finalCount.toLocaleString();
        } else {
            console.error('Error RPC al incrementar:', await res.text());
            counterElement.innerText = 'Error (DB)';
        }

    } catch (error) {
        console.error('Error de red/conexión:', error);
        counterElement.innerText = 'Error de red';
    }
}

