import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import useBookings from "./useBookings";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";

function BookingTable() {
  const { isLoading, bookings, cabins, guests, totalBookings } = useBookings();

  if (isLoading) return <Spinner />;
  if (!totalBookings || !bookings || !bookings?.length)
    return <Empty resource="bookings" />;

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={[bookings, guests, cabins]}
          resource={"bookings"}
          render={(dataArr) => (
            <BookingRow
              key={dataArr.at(0)._id}
              booking={dataArr.at(0)}
              guest={dataArr.at(1)}
              cabin={dataArr.at(2)}
            />
          )}
        />
        <Table.Footer>
          <Pagination length={totalBookings} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
