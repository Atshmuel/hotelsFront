import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";
import { useCabins } from "../cabins/useCabins";
import {
  HiOutlineCurrencyDollar,
  HiOutlineBriefcase,
  HiOutlineChartBar,
  HiOutlineCalendarDays,
  HiMiniGlobeAlt,
} from "react-icons/hi2";

function Stats({ bookings = {}, confirmedStays = {}, numOfDays }) {
  const { cabins, isLoading } = useCabins();
  if (!bookings || !confirmedStays || isLoading)
    return (
      <>
        <Stat title="Loading..." icon={<HiMiniGlobeAlt />} />
        <Stat title="Loading..." icon={<HiMiniGlobeAlt />} />
        <Stat title="Loading..." icon={<HiMiniGlobeAlt />} />
        <Stat title="Loading..." icon={<HiMiniGlobeAlt />} />
      </>
    );
  if (!bookings?.length || !confirmedStays)
    return (
      <>
        <Stat title="Could not find any data" icon={<HiMiniGlobeAlt />} />
        <Stat title="Could not find any data" icon={<HiMiniGlobeAlt />} />
        <Stat title="Could not find any data" icon={<HiMiniGlobeAlt />} />
        <Stat title="Could not find any data" icon={<HiMiniGlobeAlt />} />
      </>
    );
  const totalBookings = bookings?.length;
  const totalSells = bookings?.reduce(
    (acc, curr) => acc + curr.totalPrice + curr.extrasPrice,
    0
  );
  const checkIns = confirmedStays?.filter((el) => el.status !== "unconfirmed");
  const occupancy =
    confirmedStays?.reduce((acc, curr) => acc + curr?.numNights, 0) /
      (numOfDays * cabins?.length) || 0;
  return (
    <>
      <Stat
        title="Bookings"
        icon={<HiOutlineBriefcase />}
        color="blue"
        value={totalBookings}
      />
      <Stat
        title="Total Sells"
        icon={<HiOutlineCurrencyDollar />}
        color="green"
        value={formatCurrency(totalSells)}
      />
      <Stat
        title="Check-in's"
        icon={<HiOutlineCalendarDays />}
        color="indigo"
        value={checkIns?.length}
      />
      <Stat
        title="Occupancy rate"
        icon={<HiOutlineChartBar />}
        color="yellow"
        value={`${Math.floor(occupancy * 100)}%`}
      />
    </>
  );
}

export default Stats;
