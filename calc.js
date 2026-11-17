// Tinh tien cho hoa don VND. Lam tron: moi dong lam tron ve so nguyen dong,
// (0.5 tro len thi len), tong hoa don = tong cac dong.
function calcLine({ quantity, unitPrice, taxRate }) {
  const qtyMilli = Math.round(quantity * 1000);   // so luong 3 chu so thap phan
  const priceCents = Math.round(unitPrice * 100); // don gia 2 chu so thap phan
  const amount = Math.round((qtyMilli * priceCents) / 100000);
  const taxRateBp = Math.round(taxRate * 100);    // 10% -> 1000
  const taxAmount = Math.round((amount * taxRateBp) / 10000);
  return { amount, taxAmount, total: amount + taxAmount };
}

function calcInvoice(items) {
  const lines = items.map((it) => ({ ...it, ...calcLine(it) }));
  const subtotal = lines.reduce((s, l) => s + l.amount, 0);
  const taxTotal = lines.reduce((s, l) => s + l.taxAmount, 0);
  return { lines, subtotal, taxTotal, grandTotal: subtotal + taxTotal };
}

module.exports = { calcLine, calcInvoice };