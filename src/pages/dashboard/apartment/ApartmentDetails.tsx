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
  console.log(details);

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
            <TableHead className="w-[100px] rounded-tl-lg">Serial ID</TableHead>
            <TableHead>Apartment Name</TableHead>

            <TableHead className="">Bad Size</TableHead>
            <TableHead className="">Toggle Type</TableHead>
            <TableHead className="">Price</TableHead>
            <TableHead className="rounded-tr-lg">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {details?.map((invoice: ApartmentData) => (
            <TableRow key={invoice._id} className="">
              <TableCell className="font-medium p-3">
                #{invoice?._id.slice(0, 4)}
              </TableCell>
              <TableCell className="flex items-center gap-2">
                {/* <img
                  className="w-5 h-5"
                  src={
                    invoice.apartmentImage
                      ? invoice?.apartmentImage[0]?.startsWith("http")
                        ? invoice?.apartmentImage[0]
                        : `${imageUrl}${invoice?.apartmentImage[0]}`
                      : ""
                  }
                  alt="pic"
                /> */}

                {invoice.floorPlan}
              </TableCell>

              <TableCell className="pl-8">{invoice.badSize}</TableCell>
              <TableCell className="pl-8">
                {invoice.seeView === false ? "No" : "YES"}
              </TableCell>
              <TableCell className="">€{invoice.price}</TableCell>
              <TableCell className=" cursor-pointer ">
                <button
                  className="mr-3 cursor-pointer"
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
