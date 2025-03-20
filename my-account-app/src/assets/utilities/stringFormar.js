export const capitalizeWords = (str) => {
    return str
        .toLocaleLowerCase('es') // Convierte todo a minúsculas respetando caracteres en español
        .split(' ') // Divide en palabras
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitaliza la primera letra de cada palabra
        .join(' '); // Une las palabras nuevamente
};