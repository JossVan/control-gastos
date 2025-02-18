export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function formatDate(date: string) : string{
  return new Intl.DateTimeFormat("es-ES", {
   weekday: "long",
   year: "numeric",
   month  : "long",
   day : "numeric",
  }).format(new Date(date));
}