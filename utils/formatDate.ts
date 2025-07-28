    export const formatTime = (totalSeconds: number) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        const formattedHours = hours < 10 ? '0' + hours : hours;
        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
        const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    };

    export function convertTimestampToMilitaryTime(timestampInSeconds: number): string {
  // 1. Validar el timestamp
  if (typeof timestampInSeconds !== 'number' || isNaN(timestampInSeconds) || timestampInSeconds < 0) {
    console.warn('Timestamp inválido. Se esperaba un número positivo de segundos.');
    return ''; // Retorna una cadena vacía para indicar un error o valor inválido
  }

  // 2. Convertir segundos a milisegundos para crear un objeto Date
  const date = new Date(timestampInSeconds * 1000);

  // 3. Obtener la hora y los minutos
  // getUTCHours() y getUTCMinutes() para evitar problemas de zona horaria si el timestamp es GMT
  // Sin embargo, si el timestamp ya está en la zona horaria local o quieres mostrarlo en la local,
  // usa getHours() y getMinutes(). Para "hora militar" usualmente se refiere a la hora local sin AM/PM.
  const hours = date.getHours();   // Obtiene la hora local (0-23)
  const minutes = date.getMinutes(); // Obtiene los minutos locales (0-59)

  // 4. Formatear la hora y los minutos para que tengan dos dígitos (ej. 01 en lugar de 1)
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');

  // 5. Retornar en el formato "HH::MM"
  return `${formattedHours}::${formattedMinutes}`;
}

export function convertTimestampToAMorPMTime(timestampInSeconds: number): string {
  // 1. Validar el timestamp
  if (typeof timestampInSeconds !== 'number' || isNaN(timestampInSeconds) || timestampInSeconds < 0) {
    console.warn('Timestamp inválido. Se esperaba un número positivo de segundos.');
    return ''; // Retorna una cadena vacía para indicar un error o valor inválido
  }

  // 2. Convertir segundos a milisegundos para crear un objeto Date
  const date = new Date(timestampInSeconds * 1000);

  // 3. Obtener la hora y los minutos
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // 4. Determinar si es AM o PM
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // Convertir horas al formato de 12 horas
  const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');

  // 5. Retornar en el formato "HH:MM AM/PM"
  return `${formattedHours}:${formattedMinutes} ${ampm}`;
}