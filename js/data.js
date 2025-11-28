// ====================================================================================
// === BASE DE DATOS MAESTRA ===
// ====================================================================================

const genericData = {
    name: "Análisis en Proceso",
    industry: "Diversificada",
    revenue: "Variable",
    hq: "Capital Nacional",
    desc: "Para esta región específica, no contamos con una ficha detallada de una única 'Empresa Tractora' en nuestra base de datos académica actual. Sin embargo, se recomienda investigar los sectores de exportación predominantes.",
    culturalTip: "Al negociar en territorios desconocidos, la 'Escucha Activa' es su mejor herramienta. La humildad y el interés genuino por la cultura local abren más puertas que la agresividad comercial.",
    customTitle: "Respeto Universal", 
    customDesc: "La puntualidad y el saludo cortés (usando apellidos) son valorados internacionalmente."
};

const countryLeaders = {
    "MX": {
        name: "América Móvil (Telcel/Claro)",
        industry: "Telecomunicaciones",
        revenue: "$80 Billones USD",
        hq: "Ciudad de México", 
        hqCoords: [19.4326, -99.1332],
        desc: "Fundada por Carlos Slim, domina el mercado de telecomunicaciones en Latam. Su estrategia combina infraestructura masiva con dominio del mercado prepago.",
        culturalTip: "En México, la confianza personal lo es todo. Dedica los primeros 15-30 minutos a hablar de familia o intereses. Los almuerzos son largos y decisivos.",
        customTitle: "La Sobremesa", 
        customDesc: "Quedarse a platicar después de comer es vital para afianzar la relación personal."
    },
    "BR": {
        name: "Petrobras", 
        industry: "Energía", 
        revenue: "$90 Billones USD", 
        hq: "Río de Janeiro", 
        hqCoords: [-22.9068, -43.1729],
        desc: "Motor económico de Brasil y líder en tecnología offshore. Empresa mixta con fuerte influencia estatal.",
        culturalTip: "Los brasileños son expresivos y táctiles. Las reuniones pueden ser interrumpidas; la flexibilidad horaria es clave.",
        customTitle: "El Jeitinho", 
        customDesc: "La habilidad de encontrar soluciones creativas a la burocracia mediante relaciones."
    },
    "US": {
        name: "Apple Inc.", 
        industry: "Tecnología", 
        revenue: "$383 Billones USD", 
        hq: "California", 
        hqCoords: [37.3229, -122.0322],
        desc: "La empresa más valiosa del mundo. Cultura de secretismo, diseño y ecosistema cerrado.",
        culturalTip: "'Time is Money'. Sé puntual, directo y usa datos. El contrato legal es lo primero.",
        customTitle: "Desayuno de Trabajo", 
        customDesc: "Reuniones productivas a las 7-8 AM son muy comunes."
    },
    "ES": {
        name: "Inditex (Zara)", 
        industry: "Retail", 
        revenue: "$35 Billones USD", 
        hq: "Galicia", 
        hqCoords: [43.3053, -8.5114],
        desc: "Pionera del Fast Fashion. Logística ultrarrápida y respuesta inmediata al cliente.",
        culturalTip: "Reuniones dinámicas y a veces caóticas. Cenas tardías (10 PM) son normales.",
        customTitle: "Cercanía", 
        customDesc: "El espacio personal es menor; tocar el brazo es señal de confianza."
    },
    "DE": {
        name: "Volkswagen Group", 
        industry: "Automotriz", 
        revenue: "$295 Billones USD", 
        hq: "Wolfsburg", 
        hqCoords: [52.4227, 10.7865],
        desc: "Ingeniería alemana de precisión. Planificación a largo plazo y estructura rígida.",
        culturalTip: "Puntualidad obsesiva. Presentaciones técnicas y sin emociones. Títulos son importantes.",
        customTitle: "Direkt", 
        customDesc: "La crítica directa no es personal, es objetiva. No te ofendas."
    },
    "JP": {
        name: "Toyota", 
        industry: "Automotriz", 
        revenue: "$275 Billones USD", 
        hq: "Aichi", 
        hqCoords: [35.0824, 137.1562],
        desc: "Filosofía Kaizen (mejora continua). Calidad y respeto por encima de la velocidad.",
        culturalTip: "El silencio es reflexión. Nunca digas 'no' directamente. Jerarquía absoluta.",
        customTitle: "Meishi (Tarjetas)", 
        customDesc: "Entrega tarjetas con ambas manos e inclínate. Trátalas con reverencia."
    },
    "CN": {
        name: "Tencent", 
        industry: "Tech", 
        revenue: "$80 Billones USD", 
        hq: "Shenzhen", 
        hqCoords: [22.5431, 114.0579],
        desc: "Dueños de WeChat. Ecosistema digital total. Velocidad de ejecución masiva.",
        culturalTip: "El Guanxi (conexiones) lo es todo. Nunca hagas perder prestigio (Mianzi) a otros en público.",
        customTitle: "Ganbei (Brindis)", 
        customDesc: "Beber alcohol en cenas es casi obligatorio para sellar confianza."
    }
};

const companyKeywords = {
    "toyota": "JP", 
    "sony": "JP", 
    "apple": "US", 
    "google": "US", 
    "volkswagen": "DE", 
    "bmw": "DE",
    "samsung": "KR", 
    "zara": "ES", 
    "inditex": "ES", 
    "pemex": "MX", 
    "america movil": "MX",
    "petrobras": "BR", 
    "tencent": "CN", 
    "alibaba": "CN"
};

