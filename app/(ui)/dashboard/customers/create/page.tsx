import Form from "@/app/(ui)/dashboard/customers/create-form";
import { Metadata } from "next";
import Breadcrumbs from "../breadcrumbs";

export const metadata: Metadata = {
  title: "Create Customer",
};

export default async function Page() {

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Customers", href: "/dashboard/customers" },
          {
            label: "Create Customer",
            href: "/dashboard/customers/create",
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
