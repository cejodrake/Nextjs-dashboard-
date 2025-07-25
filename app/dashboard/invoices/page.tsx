import Pagination from "@/app/ui/invoices/pagination"
import Search from "@/app/ui/search"
import Table from "@/app/ui/invoices/table"
import { lusitana } from "@/app/ui/fonts"
import { CreateInvoice } from "@/app/ui/invoices/buttons"
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { fetchInvoicesPages } from '@/app/lib/data';
 
import { Suspense } from "react"

export default async function Page(props:{
    searchParams?:Promise<{
        query?:string;
        page?:string,

    }>
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await  fetchInvoicesPages(query);
    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-beteween">
                <h1 className="{`${lusitana.className} text-2x1g`}">Inovices</h1>
            </div>
            <div className="mt-4 flex items-center justify-betweem gap-2 md:mt-8">
                <Search placeholder="Search  invoices..." />
                <CreateInvoice />
            </div>
            {<Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
                <Table query={query} currentPage={currentPage} />
            </Suspense>}
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>

    )
}