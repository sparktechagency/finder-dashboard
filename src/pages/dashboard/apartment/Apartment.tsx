import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import UserModal from "@/modal/UserModal";
import { useState } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useGetApartmentsQuery } from "@/redux/apiSlice/apartments/apartments";
import Loading from "@/components/layout/shared/Loading";
import ErrorPage from "@/error/ErrorPage";
import { imageUrl } from "@/redux/api/baseApi";

interface ApartmentData {
  _id: string;
  apartmentImage: string[];
  apartmentName: string;
  commission: string;
  price: number;
  code: string;
  contact: {
    location: string;
  };
}

export default function Apartment() {
  const { data, isFetching, isError, isLoading } =
    useGetApartmentsQuery(undefined);
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(false);

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
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
                    invoice?.apartmentImage[0]?.startsWith("http")
                      ? invoice.apartmentImage[0]
                      : `${imageUrl}${invoice.apartmentImage[0]}`
                  }
                  alt="pic"
                />

                {invoice.apartmentName}
              </TableCell>
              <TableCell>{invoice?.contact?.location}</TableCell>
              <TableCell className="pl-8">{invoice.code || "3434"}</TableCell>
              <TableCell className="pl-8">{invoice.commission}%</TableCell>
              <TableCell className="">€{invoice.price}</TableCell>
              <TableCell
                className=" cursor-pointer "
                onClick={() => setUserDetails(true)}
              >
                <button className="mr-3">
                  <MdOutlineRemoveRedEye size={22} className="text-[#6CA0DC]" />
                </button>
                <button onClick={handleDelete}>
                  <RiDeleteBin6Line className=" text-[22px] cursor-pointer text-red-400" />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* user details show */}
      <UserModal isOpen={userDetails} onClose={() => setUserDetails(false)} />
    </>
  );
}
