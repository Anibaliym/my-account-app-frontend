// Crear un evento personalizado para manejar el mensaje de sesión expirada
const showSessionExpiredMessage = () => {
    const event = new CustomEvent('sessionExpired', { detail: 'Su sesión ha expirado. Será redirigido al inicio de sesión en breve.' });
    window.dispatchEvent(event);
}

export const apiFetch = async (endpoint, options = {}) => {
    const API_URL = import.meta.env.VITE_API_URL;
    const userData = JSON.parse(localStorage.getItem('user'));
    const currentTime = new Date().getTime();

    // Verificar si la sesión ha expirado
    if (userData && userData.expirationTime && currentTime > userData.expirationTime) {
        localStorage.removeItem('user');  // Eliminar usuario del localStorage
        showSessionExpiredMessage();  // Mostrar mensaje al usuario

        // // Esperar 4 segundos antes de redirigir
        // setTimeout(() => {
        //     window.location.href = '/login';
        // }, 4000);

        // Esperar 4 segundos antes de redirigir
        setTimeout(() => {
            window.location.href = '/login';
        }, 10000);


        throw new Error('La sesión ha expirado. Por favor, inicia sesión nuevamente.');
    }

    // Construir la URL completa
    const url = `${API_URL}${endpoint}`;

    // Añadir headers por defecto si no se proporcionan
    const defaultHeaders = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    const config = {
        ...options,
        headers: { ...defaultHeaders, ...options.headers }
    };

    try {
        const response = await fetch(url, config);

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error en la petición:', error.message);
        return { isError: true, message: error.message };
    }
}
