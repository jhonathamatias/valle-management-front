export function maskMoney(value: string) {
  const onlyDigits = value
    .split("")
    .filter(s => /\d/.test(s))
    .join("")
    .padStart(3, "0")
  const digitsFloat = onlyDigits.slice(0, -2) + "." + onlyDigits.slice(-2);
  return maskCurrency(digitsFloat);
}

function maskCurrency(valor: any, locale = 'pt-BR', currency = 'BRL') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency
  }).format(valor);
}

export function format(value: number) {
  return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}