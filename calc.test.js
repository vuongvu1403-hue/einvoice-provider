const test = require("node:test");
const assert = require("node:assert");
const { calcLine, calcInvoice } = require("./calc");

test("billing 9000000001 co tong 11.467.500", () => {
  const r = calcInvoice([
    { name: "Xi mang PCB40", quantity: 100, unitPrice: 95000, taxRate: 10 },
    { name: "Thep phi 10", quantity: 50, unitPrice: 18500, taxRate: 10 },
  ]);
  assert.strictEqual(r.subtotal, 10425000);
  assert.strictEqual(r.taxTotal, 1042500);
  assert.strictEqual(r.grandTotal, 11467500);
});

test("thue le duoc lam tron len: 12.345 x 8% = 987,6 -> 988", () => {
  const r = calcLine({ quantity: 1, unitPrice: 12345, taxRate: 8 });
  assert.strictEqual(r.amount, 12345);
  assert.strictEqual(r.taxAmount, 988);
});

test("so luong thap phan: 2,5 x 10.000 = 25.000", () => {
  assert.strictEqual(
    calcLine({ quantity: 2.5, unitPrice: 10000, taxRate: 0 }).amount,
    25000
  );
});