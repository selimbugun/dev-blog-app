export default function formatDateForInput(dateString) {
  const date = new Date(dateString);
  const timezoneOffset = date.getTimezoneOffset(); // Dakika cinsinden
  date.setMinutes(date.getMinutes() - timezoneOffset); // UTC'den local'e çevir
  return date.toISOString().slice(0, 10); // "YYYY-MM-DD"
}
