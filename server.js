const express = require("express");
const { z } = require("zod");
const crypto = require("node:crypto");

const app = express();
app.use(express.json());

const TaxCode = z.string().regex(/^\d{10}(-\d{3})?$/);

const InvoiceSchema = z.object({
  billingRef: z.string().min(1),
  sellerTaxCode: TaxCode,
  buyerName: z.string().min(1),
  buyerTaxCode: TaxCode.optional(),
  currency: z.literal("VND"),
  items: z
    .array(
      z.object({
        name: z.string().min(1),
        quantity: z.number().positive(),
        unitPrice: z.number().nonnegative(),
        taxRate: z.number().min(0).max(10),
      })
    )
    .min(1),
});

const invoices = new Map(); // key: billingRef

app.get("/health", (req, res) => res.json({ ok: true }));

app.post("/api/invoices", (req, res) => {
  const parsed = InvoiceSchema.safeParse(req.body);
  if (!parsed.success) {
    return res
      .status(400)
      .json({ status: "REJECTED", errors: parsed.error.issues });
  }
  const data = parsed.data;

  const existing = invoices.get(data.billingRef);
  if (existing) {
    return res.json(existing);
  }

  const record = {
    billingRef: data.billingRef,
    invoiceNo: String(invoices.size + 1).padStart(7, "0"),
    lookupCode: crypto.randomBytes(6).toString("hex").toUpperCase(),
    taxAuthCode: crypto.randomBytes(17).toString("hex").toUpperCase(),
    status: "ISSUED",
    issuedAt: new Date().toISOString(),
  };
  invoices.set(data.billingRef, record);
  res.status(201).json(record);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Provider running on port ${port}`));