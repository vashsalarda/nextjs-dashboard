import Pagination from "@/app/(ui)/dashboard/invoices/pagination";
import Search from "@/app/(ui)/search";
import Table from "@/app/(ui)/dashboard/invoices/table";
// import { CreateInvoice } from "@/app/(ui)/invoices/buttons";
import { lusitana } from "@/app/(ui)/fonts";
import { InvoicesTableSkeleton } from "@/app/(ui)/skeletons";
import { Suspense } from "react";
import { fetchTotalInvoices } from '@/app/lib/data';

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
  const totalInvoices = await fetchTotalInvoices(query);
  const totalPages = totalInvoices >= pageSize ? Math.ceil(totalInvoices/pageSize) : 1
  console.log({totalInvoices, pageSize, totalPages});
  
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        {/* <CreateInvoice /> */}
      </div>
      <Suspense key={query + page} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} page={page} pageSize={pageSize} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} currentPage={page}/>
      </div>
    </div>
  );
}
