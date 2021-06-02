export function toKilo(amount) {
  return amount > 1000 ? amount / 1000 + "k" : amount;
}
