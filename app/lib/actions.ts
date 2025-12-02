"use server";

import { z } from "zod";
import { db } from "./mongodb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(["pending", "paid"]),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
  console.log({ formData });
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get("customerId") ?? "",
    amount: formData.get("amount") ?? 0,
    status: formData.get("status") ?? "",
  });
  const date = new Date().toISOString().split("T")[0];

  const { ObjectId } = await import("mongodb");
  if (!ObjectId.isValid(customerId)) {
    throw new Error("Invalid customerId");
  }
  const customerIdObj = new ObjectId(customerId);

  const database = await db();
  const customer = await database
    .collection("customers")
    .findOne({"_id":customerIdObj});

  console.log({ customerId, customer, amount, status, date, createdAt: new Date() });

  const resp = await database.collection("invoices").insertOne({
    customerIdObj,
    customer,
    amount,
    status,
    date,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  console.log({ resp });

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}
