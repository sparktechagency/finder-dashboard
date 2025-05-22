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

const invoices = [
  {
    key: "1",
    no: "#24721",
    name: "Admin Asadujjaman",
    plan: "Monthly",
    duration: "Month",
    price: "23",

    startDate: "05/07/2025",
    endDate: "08/07/2025",
  },
  {
    key: "2",
    no: "#26552",
    name: "Admin Asadujjaman",
    plan: "Monthly",
    duration: "Month",
    price: "23",

    startDate: "05/07/2025",
    endDate: "08/07/2025",
  },
  {
    key: "3",
    no: "#24563",
    name: "Admin Asadujjaman",
    plan: "Monthly",
    duration: "Month",
    price: "23",

    startDate: "05/07/2025",
    endDate: "08/07/2025",
  },
  {
    key: "4",
    no: "#2424",
    name: "Dr. Anna KOWALSKA",
    plan: "Monthly",
    duration: "Month",
    price: "23",

    startDate: "05/07/2025",
    endDate: "08/07/2025",
  },
  {
    key: "5",
    no: "#247865",
    name: "Dr. Michael O'CONNOR",
    plan: "Monthly",
    duration: "Month",
    price: "23",

    startDate: "05/07/2025",
    endDate: "08/07/2025",
  },
];

export default function SellerChart() {
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
  return (
    <>
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow className="bg-[#F6F6F6] h-12">
            <TableHead className="w-[100px] rounded-tl-lg">Serial ID</TableHead>
            <TableHead>User Name</TableHead>
            <TableHead>Plan Type </TableHead>
            <TableHead className="">Duration</TableHead>
            <TableHead className="">Price</TableHead>

            <TableHead className="">Start Date</TableHead>
            <TableHead className="">Expire Date</TableHead>
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

              <TableCell className="">{invoice.startDate} </TableCell>
              <TableCell className="">{invoice.endDate} </TableCell>
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
