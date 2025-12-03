"use server";

import { z } from "zod";
import { db } from "./mongodb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ObjectId } from "mongodb";
import { Customer } from "./definitions";

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(["pending", "paid"]),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
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
    .findOne({ _id: customerIdObj });

  let customerData = {} as Customer
  if (customer != null) {
    customerData = {
      id: customer.id,
      name: customer.name,
      email: customer.name,
      imageUrl: customer.imageUrl
    };
  }

  console.log({
    customerId,
    customerData,
    amount,
    status,
    date,
    createdAt: new Date(),
  });

  const resp = await database.collection("invoices").insertOne({
    customerId: customerIdObj,
    customer: customerData,
    amount,
    status,
    date,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  console.log({ resp });

  if (!resp.insertedId) {
    throw new Error("Failed to Create Invoice");
  }

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}


export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpateInvoice.parse({
    customerId: formData.get("customerId") ?? "",
    amount: formData.get("amount") ?? 0,
    status: formData.get("status") ?? "",
  });

  const { ObjectId } = await import("mongodb");
  if (!ObjectId.isValid(customerId)) {
    throw new Error("Invalid customerId");
  }
  const customerIdObj = new ObjectId(customerId);

  const database = await db();
  const customer = await database
    .collection("customers")
    .findOne({ _id: customerIdObj });

  let customerData = {} as Customer
  if (customer != null) {
    customerData = {
      id: customer.id,
      name: customer.name,
      email: customer.name,
      imageUrl: customer.imageUrl
    };
  }

  const res = await database
    .collection("invoices")
    .updateOne({ _id: new ObjectId(id) }, { $set: { customerId: customerIdObj, customer: customerData, amount, status } });

  if (res.matchedCount == 0) {
    throw new Error("Could not found the Invoice");
  }

  if (res.modifiedCount == 0) {
    throw new Error("Failed to update Invoice");
  }

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

export async function deleteInvoice(id: string) {
  const database = await db();
  const res = await database.collection("invoices").deleteOne({
    _id: new ObjectId(id)
  });

  if (res.deletedCount == 0) {
    throw new Error("Failed to delete Invoice");
  }

  revalidatePath("/dashboard/invoices");
}
