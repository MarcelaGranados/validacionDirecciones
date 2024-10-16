const axios = require('axios');

// Función para validar el formato de la dirección
const validarFormatoDireccion = (direccion) => {
    // Permitir caracteres alfanuméricos, espacios, comas, puntos, guiones y #
    const formatoRegex = /^[a-zA-Z0-9\s,.#-]+$/;
    return formatoRegex.test(direccion);
};

// Función para validar la dirección usando Nominatim
const validarDireccion = async (direccion) => {
    // 1. Validar formato
    if (!validarFormatoDireccion(direccion)) {
        console.error('El formato de la dirección es incorrecto. Por favor, usa solo caracteres alfanuméricos y algunos signos de puntuación.');
        return false;
    }

    try {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(direccion)}`;
        const response = await axios.get(url);
        const data = response.data;

        // 3. Verificar que la dirección corresponda a una ubicación entregable
        if (data.length > 0) {
            const { lat, lon } = data[0];
            console.log(`Dirección válida. Coordenadas: Latitud - ${lat}, Longitud - ${lon}`);
            return true;
        } else {
            // 4. Mensaje de error claro
            console.error('Dirección no válida o no entregable. Por favor verifica la dirección ingresada.');
            return false;
        }
    } catch (error) {
        console.error('Error al validar la dirección:', error);
        return false;
    }
};

// Probar múltiples direcciones de Bucaramanga
const direccionesPrueba = [
    'Calle 45 #15, Bucaramanga',
    'Carrera 27 #34, Bucaramanga',
    'Avenida La Playa #25, Bucaramanga',
    'Calle 36 #23, Bucaramanga',
    'Calle 67 #30, Bucaramanga',
    'Calle 14 #32, Bucaramanga',
];

// Ejecutar la validación para cada dirección
direccionesPrueba.forEach(direccion => {
    console.log(`Probando dirección: ${direccion}`);
    validarDireccion(direccion);
});
