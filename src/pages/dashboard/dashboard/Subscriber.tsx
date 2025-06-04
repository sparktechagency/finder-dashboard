import Loading from "@/components/layout/shared/Loading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { invoices } from "@/demoData/demoData";
import UserModal from "@/modal/ApartmentModal";
import { useGetSubscriberQuery } from "@/redux/apiSlice/subscriber/subscriber";
import { useState } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";

type Invoice = {
  key: string;
  no: string;
  name: string;
  plan: string;
  duration: string;
  price: string;
  commision: string;
};

export default function Subscriber() {
  const { data: subscriber, isLoading } = useGetSubscriberQuery(undefined);
  console.log(subscriber?.data);
  const [userDetails, setUserDetails] = useState<Invoice | false>(false);

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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Table>
        <TableHeader className="">
          <TableRow className="bg-[#F6F6F6] h-12 font-bold">
            <TableHead className="">Serial ID</TableHead>
            <TableHead>User Name</TableHead>
            <TableHead>Plan Type </TableHead>
            <TableHead className="">Duration</TableHead>
            <TableHead className="">Price</TableHead>
            <TableHead className="">Commission</TableHead>
            <TableHead className="rounded-tr-lg">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.key} className="">
              <TableCell className="font-medium p-3">{invoice.no}</TableCell>
              <TableCell>{invoice.name}</TableCell>
              <TableCell>{invoice.plan}</TableCell>
              <TableCell className="">{invoice.duration}</TableCell>
              <TableCell className="">€{invoice.price}</TableCell>
              <TableCell className="">{invoice.commision}%</TableCell>
              <TableCell
                className=" cursor-pointer "
                onClick={() => setUserDetails(invoice)}
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
      {userDetails && (
        <UserModal
          isOpen={!!userDetails}
          data={userDetails}
          onClose={() => setUserDetails(false)}
        />
      )}
    </>
  );
}
