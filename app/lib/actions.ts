"use server";

import { z } from "zod";
import { db } from "./mongodb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ObjectId } from "mongodb";
import { Customer } from "./definitions";

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpateInvoice = FormSchema.omit({ id: true, date: true });

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};
 
export async function createInvoice(prevState: State, formData: FormData) {
  console.log({prevState});
  
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get("customerId") ?? "",
    amount: formData.get("amount") ?? 0,
    status: formData.get("status") ?? "",
  });
  const date = new Date().toISOString().split("T")[0];

  if (!validatedFields.success) {    
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }
 
  const { customerId, amount, status } = validatedFields.data;
 
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
      _id: new ObjectId(customer._id),
      name: customer.name,
      email: customer.email,
      imageUrl: customer.imageUrl
    };
  }

  const resp = await database.collection("invoices").insertOne({
    customerId: customerIdObj,
    customer: customerData,
    amount,
    status,
    date,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

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
      _id: customer._id,
      name: customer.name,
      email: customer.email,
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
