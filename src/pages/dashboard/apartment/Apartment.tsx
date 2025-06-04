import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import UserModal from "@/modal/ApartmentModal";
import { useState } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {
  useDeleteApartmentMutation,
  useGetApartmentsQuery,
} from "@/redux/apiSlice/apartments/apartments";
import Loading from "@/components/layout/shared/Loading";
import ErrorPage from "@/error/ErrorPage";
import { imageUrl } from "@/redux/api/baseApi";

interface ApartmentData {
  _id: string;
  paymentPlanImage: string;
  apartmentName: string;
  commission: string;
  price: number;
  code: string;
  location: string;
  contact: {
    location: string;
  };
}

export default function Apartment() {
  const { data, isFetching, isError, isLoading, refetch } =
    useGetApartmentsQuery(undefined);
  const [deleteApartment] = useDeleteApartmentMutation();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState<ApartmentData | null>(null);

  console.log(data?.data);
  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to be delete this apartment",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteApartment(id);
        refetch();
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  if (isLoading || isFetching) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorPage />;
  }
  return (
    <>
      <div className="flex justify-end mb-3">
        <button
          className="bg-[#fcebd9] rounded-[10px] px-5 py-2 flex items-center text-sm font-medium text-[#1f1f1f] cursor-pointer"
          onClick={() => navigate("/apartmentForm")}
        >
          <span className="text-lg font-bold mr-2">+</span> Add Apartment
        </button>
      </div>

      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow className="bg-[#F6F6F6] h-12">
            <TableHead className="w-[100px] rounded-tl-lg">Serial ID</TableHead>
            <TableHead>Apartment Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead className="">Apartment Code</TableHead>
            <TableHead className="">Commission</TableHead>
            <TableHead className="">Price</TableHead>
            <TableHead className="rounded-tr-lg">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.map((invoice: ApartmentData) => (
            <TableRow key={invoice._id} className="">
              <TableCell className="font-medium p-3">
                {invoice?._id.slice(0, 4)}
              </TableCell>
              <TableCell className="flex items-center gap-2">
                <img
                  className="w-5 h-5"
                  src={
                    invoice?.paymentPlanImage?.startsWith("http")
                      ? invoice.paymentPlanImage
                      : `${imageUrl}${invoice.paymentPlanImage}`
                  }
                  alt="pic"
                />

                {invoice.apartmentName}
              </TableCell>
              <TableCell>{invoice.location}</TableCell>
              <TableCell className="pl-8">{invoice.code || "3434"}</TableCell>
              <TableCell className="pl-8">{invoice.commission}%</TableCell>
              <TableCell className="">€{invoice.price}</TableCell>
              <TableCell className=" cursor-pointer ">
                <button
                  className="mr-3 cursor-pointer"
                  onClick={() => setUserDetails(invoice)}
                >
                  <MdOutlineRemoveRedEye size={22} className="text-[#6CA0DC]" />
                </button>
                <button onClick={() => handleDelete(invoice?._id)}>
                  <RiDeleteBin6Line className=" text-[22px] cursor-pointer text-red-400" />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* user details show */}
      {userDetails && (
        <UserModal
          isOpen={!!userDetails}
          data={userDetails}
          onClose={() => setUserDetails(null)}
        />
      )}
    </>
  );
}
