//Limpia el valor de los separadores de miles y signo peso
export const formatNumber = ( number ) => {
    return number.replace(/[$.]/g, '') 
};


//Toma un valor númerico entero sin formato y formatea con separador de miles
export const formatNumberWithThousandsSeparator = (value) => {
    // Convertir el valor a string para procesarlo
    let stringValue = value.toString();

    // Remover ceros iniciales
    stringValue = stringValue.replace(/^0+/, '');

    // Si después de remover ceros iniciales no queda nada, se considera como "0"
    if (stringValue === '') {
        return '0';
    }

    // Convertir el valor a entero para formatear correctamente
    const integerValue = parseInt(stringValue, 10);

    // Usar Intl.NumberFormat con el locale 'de-DE' para separador de miles como punto
    return new Intl.NumberFormat('de-DE').format(integerValue);
}

