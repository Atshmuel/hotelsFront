import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import { useDarkMode } from '../../contexts/DarkModeContext'
import Heading from '../../ui/Heading'
import Empty from '../../ui/Empty'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'


const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;


export function SalseChart({ bookingsSales, numOfDays }) {
  const { isDarkMode } = useDarkMode()
  const map = new Map()
  const uniqueDates = [];
  const colors = isDarkMode
    ? {
      totalPrice: { stroke: "#4f46e5", fill: "#4f46e5" },
      extrasPrice: { stroke: "#22c55e", fill: "#22c55e" },
      text: "#e5e7eb",
      background: "#18212f",
    }
    : {
      totalPrice: { stroke: "#4f46e5", fill: "#c7d2fe" },
      extrasPrice: { stroke: "#16a34a", fill: "#dcfce7" },
      text: "#374151",
      background: "#fff",
    };
  if (!bookingsSales) return
  const newData = bookingsSales?.map((date) => {
    return {
      date: String(new Date(date.createdAt.slice(0, 10))).slice(4, 10),
      totalSales: bookingsSales?.filter(el => el.createdAt === date.createdAt).reduce((acc, curr) => acc + curr.totalPrice, 0),
      totalExtras: bookingsSales?.filter(el => el.createdAt === date.createdAt).reduce((acc, curr) => acc + curr.extrasPrice, 0)
    }
  })


  newData.forEach((booking) => {
    if (!map.has(booking.date)) {
      map.set(booking.date, true),
        uniqueDates.push(booking)
    }
  })
  return <StyledSalesChart>
    <Heading as='h2'>
      Sales at the last {`${numOfDays}`} days
    </Heading>
    {!newData.length || !uniqueDates.length ?
      <Empty resource={"bookings"} />
      :
      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={uniqueDates} >
          <XAxis dataKey='date' />
          <YAxis unit='$' />
          <CartesianGrid strokeDasharray='4' />
          <Area dataKey='totalSales' type='monotone' stroke={colors.totalPrice.stroke} fill={colors.totalPrice.fill} />
          <Area dataKey='totalExtras' type='monotone' stroke={colors.extrasPrice.stroke} fill={colors.extrasPrice.fill} />
          <Tooltip contentStyle={{ color: colors.text, background: colors.background }} />
        </AreaChart>
      </ResponsiveContainer>
    }
  </StyledSalesChart>
}

export default SalseChart