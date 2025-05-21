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

const invoices = [
  {
    key: "1",
    no: "#24721",
    name: "Admin Asadujjaman",
    location: "Jakarta, Indonesia",
    code: "A54",
    price: "23",
    commision: "5",
  },
  {
    key: "2",
    no: "#26552",
    name: "Admin Asadujjaman",
    location: "Jakarta, Indonesia",
    code: "A54",
    price: "23",
    commision: "5",
  },
  {
    key: "3",
    no: "#24563",
    name: "Admin Asadujjaman",
    location: "Jakarta, Indonesia",
    code: "A54",
    price: "23",
    commision: "5",
  },
  {
    key: "4",
    no: "#2424",
    name: "Dr. Anna KOWALSKA",
    location: "Jakarta, Indonesia",
    code: "A54",
    price: "23",
    commision: "5",
  },
  {
    key: "5",
    no: "#247865",
    name: "Dr. Michael O'CONNOR",
    location: "Jakarta, Indonesia",
    code: "A54",
    price: "23",
    commision: "5",
  },
  {
    key: "6",
    no: "#24456",
    name: "Dr. Yasmin AL-FARSI",
    location: "Jakarta, Indonesia",
    code: "A54",
    price: "23",
    commision: "5",
  },
  {
    key: "7",
    no: "#24727",
    name: "Dr. Leila BEN AMAR",
    location: "Jakarta, Indonesia",
    code: "A54",
    price: "23",
    commision: "5",
  },
  {
    key: "8",
    no: "#24578",
    name: "Dr. Elena PETROVA",
    location: "Jakarta, Indonesia",
    code: "A54",
    price: "23",
    commision: "5",
  },
  {
    key: "9",
    no: "#2499",
    name: "Dr. Sergei IVANOV",
    location: "Jakarta, Indonesia",
    code: "A54",
    price: "23",
    commision: "5",
  },
  {
    key: "10",
    no: "#242310",
    name: "Dr. Sofia OLIVEIRA",
    location: "Jakarta, Indonesia",
    code: "A54",
    price: "23",
    commision: "5",
  },
  {
    key: "11",
    no: "#249811",
    name: "Dr. Ahmed KHAN",
    location: "Jakarta, Indonesia",
    code: "A54",
    price: "23",
    commision: "5",
  },
];

export default function Apartment() {
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
  return (
    <>
      <div className="flex justify-end mb-3">
        <button
          className="bg-[#fcebd9] rounded-[10px] px-5 py-2 flex items-center text-sm font-medium text-[#1f1f1f]"
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
          {invoices.map((invoice) => (
            <TableRow key={invoice.key} className="">
              <TableCell className="font-medium p-3">{invoice.no}</TableCell>
              <TableCell className="flex items-center gap-2">
                <img
                  className="w-5 h-5"
                  src="https://i.ibb.co/p1LwRJj/7732550.png"
                  alt=""
                />
                {invoice.name}
              </TableCell>
              <TableCell>{invoice.location}</TableCell>
              <TableCell className="pl-8">{invoice.code}</TableCell>
              <TableCell className="pl-8">{invoice.commision}%</TableCell>
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
