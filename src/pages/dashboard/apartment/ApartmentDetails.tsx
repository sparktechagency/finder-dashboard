import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";

import { useGetApartmentsDetailsQuery } from "@/redux/apiSlice/apartments/apartments";
import Loading from "@/components/layout/shared/Loading";
import ErrorPage from "@/error/ErrorPage";
import ApartmentDetailsModal from "@/modal/ApartmentDetailsModal";

interface ApartmentData {
  _id: string;
  apartmentImage: string;
  floorPlan: string;
  badSize: string;
  seeView: boolean;
  price: number;
}

export default function ApartmentDetails() {
  const { data, isFetching, isError, isLoading } =
    useGetApartmentsDetailsQuery(undefined);

  const [userDetails, setUserDetails] = useState<ApartmentData | null>(null);

  const details = data?.data?.apartments[0]?.floorPlans;

  if (isLoading || isFetching) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorPage />;
  }
  return (
    <>
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow className="bg-[#F6F6F6] h-12">
            <TableHead className=" rounded-tl-lg">Serial ID</TableHead>
            <TableHead className="">Projects Name</TableHead>

            {/* <TableHead className="">Bad Size</TableHead> */}
            <TableHead className="">Sea View</TableHead>
            <TableHead className="">Price</TableHead>
            <TableHead className="">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {details?.map((invoice: ApartmentData) => (
            <TableRow key={invoice._id} className="">
              <TableCell className="font-medium p-3">
                #{invoice?._id.slice(0, 4)}
              </TableCell>
              <TableCell className="flex items-center gap-2 pl-12">
                {invoice.floorPlan}
              </TableCell>

              {/* <TableCell className="pl-8">{invoice.badSize}</TableCell> */}
              <TableCell className="pl-8">
                {invoice.seeView === false ? "No" : "YES"}
              </TableCell>
              <TableCell className="">€{invoice.price}</TableCell>
              <TableCell className="cursor-pointer ">
                <button
                  className="pl-3 cursor-pointer "
                  onClick={() => setUserDetails(invoice)}
                >
                  <MdOutlineRemoveRedEye size={22} className="text-[#6CA0DC]" />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* user details show */}
      {userDetails && (
        <ApartmentDetailsModal
          isOpen={!!userDetails}
          data={userDetails}
          onClose={() => setUserDetails(null)}
        />
      )}
    </>
  );
}
