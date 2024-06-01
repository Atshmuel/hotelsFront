/* eslint-disable no-unused-vars */
import { useCabins } from "./useCabins";
import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
const Title = styled.div`
  text-align: center;
`;

function CabinTable() {
  const { isLoading, cabins, error } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (!cabins.length) return <Empty resource="cabins" />;
  const filterVal = searchParams.get("discount") || "all";

  let filteredCabins;
  if (filterVal === "all") filteredCabins = cabins;
  if (filterVal === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (filterVal === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  const sortBy = searchParams.get("sortBy") || "startData-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <Title>Cabin</Title>
          <Title>Capacity</Title>
          <Title>Price</Title>
          <Title>Discount</Title>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          resource={"cabins"}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin._id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
