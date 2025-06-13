import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetApartmentsDetailsQuery } from "@/redux/apiSlice/apartments/apartments";
import Loading from "@/components/layout/shared/Loading";
import ErrorPage from "@/error/ErrorPage";

interface ApartmentData {
  _id: string;
  apartmentImage: string;
  floorPlan: string;
  badSize: string;
  price: number;
  apartmentId: string;
}

export default function AddFloor() {
  const { data, isFetching, isError, isLoading } =
    useGetApartmentsDetailsQuery(undefined);
  const searchParams = new URLSearchParams(window.location.search);
  const apartmentId = searchParams.get("id");
  //   const [userDetails, setUserDetails] = useState<ApartmentData | null>(null);

  //   const details = data?.data?.apartments[0]?.floorPlans;
  console.log(data?.data?.apartments[0]?.floorPlans);
  const details = data?.data?.apartments[0]?.floorPlans.filter(
    (item: ApartmentData) => item.apartmentId === apartmentId
  );

  if (isLoading || isFetching) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorPage />;
  }
  return (
    <>
      <h1 className="mb-2 text-2xl">Floor Plan</h1>
      <Table>
        <TableHeader>
          <TableRow className="bg-[#F6F6F6] h-12">
            <TableHead className=" rounded-tl-lg">Serial ID</TableHead>
            <TableHead className="">Projects Name</TableHead>
            <TableHead className="">Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {details?.map((invoice: ApartmentData, index: number) => (
            <TableRow key={invoice._id} className="">
              <TableCell className="font-medium p-3">{index + 1}</TableCell>
              <TableCell className="flex items-center gap-2 pl-12">
                {invoice.floorPlan}
              </TableCell>

              <TableCell className="">€{invoice.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
