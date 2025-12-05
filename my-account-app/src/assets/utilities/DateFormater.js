
export const formatDate = (dateString) => 
{
    const date = new Date(dateString);
    
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
        // ,
        // second: '2-digit'
    });
}

// return "Month Day"
export const shortFormatDate = (dateString) => {
    const date = new Date(dateString);

    const options = { month: 'long', day: 'numeric' };
    const parts = date.toLocaleDateString('es-ES', options).split(' ');

    const day = parts[0];
    const month = parts[2] || parts[1];

    const monthCapitalized = month.charAt(0).toUpperCase() + month.slice(1);

    return `${monthCapitalized} ${day}`;
};

export const formateDateProfilePage = (fechaISO) => {
    const fecha = new Date(fechaISO);

    const meses = [
        "ENE", "FEB", "MAR", "ABR", "MAY", "JUN",
        "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"
    ];

    const dia = fecha.getDate();
    const mes = meses[fecha.getMonth()];
    const año = fecha.getFullYear();

    return `${dia} ${mes} ${año}`;
};