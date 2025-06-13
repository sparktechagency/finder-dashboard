import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Loading from "@/components/layout/shared/Loading";
import ErrorPage from "@/error/ErrorPage";
import { useGetPhaseDetailsQuery } from "@/redux/apiSlice/phase/phase";

interface ApartmentData {
  _id: string;
  phase: string;
  date: string;
  apartmentId: string;
}

export default function AddPhase() {
  const { data, isFetching, isError, isLoading } =
    useGetPhaseDetailsQuery(undefined);
  //   const searchParams = new URLSearchParams(window.location.search);
  //   const apartmentId = searchParams.get("id");

  if (isLoading || isFetching) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorPage />;
  }
  return (
    <>
      <h1 className="mb-2 text-2xl">Phase</h1>
      <Table>
        <TableHeader>
          <TableRow className="bg-[#F6F6F6] h-12">
            <TableHead className=" rounded-tl-lg">Serial ID</TableHead>
            <TableHead className="">Phase</TableHead>

            {/* <TableHead className="">Bad Size</TableHead> */}

            <TableHead className="">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.map((invoice: ApartmentData, index: number) => (
            <TableRow key={invoice._id} className="">
              <TableCell className="font-medium p-3">{index + 1}</TableCell>
              <TableCell className="flex items-center gap-2 pl-5">
                {invoice.phase}
              </TableCell>

              <TableCell className="">{invoice.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
