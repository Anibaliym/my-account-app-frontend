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

export const formateDateProfilePage = (dateISO) => {
  const date = new Date(dateISO);

  const months = [
    "ENE", "FEB", "MAR", "ABR", "MAY", "JUN",
    "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};

//Retorna un arreglo con las fechas desglosadas en grupos de "hoy, ayer, esta semana, anterior"
export const formatDateUserAccessLog = (dateString) => {
  const date = new Date(dateString);

  const dayName = date.toLocaleDateString("es-ES", { weekday: "long" });
  const day = date.toLocaleDateString("es-ES", { day: "2-digit" });
  const month = date.toLocaleDateString("es-ES", { month: "long" });
  const year = date.getFullYear();

  const time = date.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });

  // Capitalizar el día (lunes → Lunes)
  const capitalizedDay =
    dayName.charAt(0).toUpperCase() + dayName.slice(1);

  return `${capitalizedDay} ${day} de ${month} de ${year} a las ${time} hrs`;
};

export function groupAccessByDate(accessLogs) {
  const now = new Date();

  // Inicio de hoy
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );

  // Inicio de ayer
  const startOfYesterday = new Date(startOfToday);
  startOfYesterday.setDate(startOfToday.getDate() - 1);

  // Inicio de la semana (lunes)
  const startOfWeek = new Date(startOfToday);
  const day = startOfWeek.getDay(); // 0 domingo, 1 lunes...
  const diff = (day === 0 ? -6 : 1) - day;
  startOfWeek.setDate(startOfWeek.getDate() + diff);

  const result = {
    today: [],
    yesterday: [],
    thisWeek: [],
    older: []
  };

  // Ordenar por más reciente
  const sortedLogs = [...accessLogs].sort(
    (a, b) => new Date(b.occurredAt) - new Date(a.occurredAt)
  );

  for (const log of sortedLogs) {
    const occurredDate = new Date(log.occurredAt);

    if (occurredDate >= startOfToday) {
      result.today.push(log);
    } 
    else if (occurredDate >= startOfYesterday && occurredDate < startOfToday) {
      result.yesterday.push(log);
    } 
    else if (occurredDate >= startOfWeek) {
      result.thisWeek.push(log);
    } 
    else {
      result.older.push(log);
    }
  }

  return result;
}

export const formatTodayHour = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  
  // Verificar si es hoy (fecha local)
  const isToday =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate();
  
  if (!isToday) {
    return null; // o puedes retornar "" o lanzar un error
  }
  
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  return `${hours}:${minutes} hrs`;
} 

export const formatDateWithSeparatedHour = (dateString) => {
  const date = new Date(dateString);

  const days = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado'
  ];

  const months = [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre'
  ];

  const dayName = days[date.getDay()];
  const dayNumber = String(date.getDate()).padStart(2, '0');
  const monthName = months[date.getMonth()];

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return {
    day: `${dayName} ${dayNumber} de ${monthName}`, 
    time: `${hours}:${minutes} hrs`
  }
}