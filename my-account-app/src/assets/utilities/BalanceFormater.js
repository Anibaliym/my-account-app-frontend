//Limpia el valor de los separadores de miles y signo peso
export const formatNumber = ( number ) => {
    return number.replace(/[$.]/g, '') 
};


//Toma un valor númerico entero sin formato y formatea con separador de miles
export const formatNumberWithThousandsSeparator = (value) => {
    if (value === undefined || value === null) return "0"; // Evitar valores nulos

    let stringValue = String(value); // Convertir siempre a string

    if (stringValue === "" || stringValue === "-") return stringValue; // Mantener "-" si el usuario recién lo ingresó

    // Verificar si es un número negativo
    let isNegative = stringValue.startsWith('-');
    stringValue = stringValue.replace(/[^0-9]/g, ''); // Eliminar cualquier carácter que no sea numérico

    if (stringValue === "") return isNegative ? "-" : "0"; // Si solo hay "-", mantenerlo

    // Convertir a número entero sin perder el signo negativo
    let integerValue = parseInt(stringValue, 10);
    if (isNaN(integerValue)) return isNegative ? "-" : "0"; // Manejo seguro de NaN

    // Aplicar formato con separadores de miles
    let formattedValue = new Intl.NumberFormat('de-DE').format(integerValue);

    return isNegative ? `-${formattedValue}` : formattedValue;
};