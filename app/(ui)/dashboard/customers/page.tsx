import styles from "@/app/(ui)/home.module.css";

import { Metadata } from "next";
import { lusitana } from "../../fonts";
import { Suspense } from "react";
import Table from "./table";
import { CustomersTableSkeleton } from "../../skeletons";
import Search from "../../search";
import { fetchTotalCustomers } from "@/app/lib/data";
import Pagination from "./pagination";
import { CreateCustomer } from "../customers/buttons";

export const metadata: Metadata = {
  title: "Customers",
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    page_size?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const page = Number(searchParams?.page) || 1;
  const pageSize = Number(searchParams?.page_size) || 10;
  const totalCustomers = await fetchTotalCustomers(query) ?? 0;
  const totalPages = totalCustomers >= pageSize ? Math.ceil(totalCustomers/pageSize) : 1

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Customers</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search customers..." />
        <CreateCustomer />
      </div>
      <Suspense key={query + page} fallback={<CustomersTableSkeleton />}>
        <Table query={query} page={page} pageSize={pageSize} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} currentPage={page} />
      </div>
    </div>
  );
}
