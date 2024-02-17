import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

import useChart from "@/components/chart/use-chart";
import Chart from "@/components/chart/chart";
import { fNumber } from "@/package/util";

// ----------------------------------------------------------------------
export interface AppConversionRatesProps {
  title: string;
  subheader: string;
  chart: any;
}
export default function AppConversionRates({
  title,
  subheader,
  chart,
  ...other
}: AppConversionRatesProps) {
  const { colors, series, options } = chart;

  const chartSeries = series.map((i: any) => i.value);

  const chartOptions = useChart({
    colors,
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (value: any) => fNumber(value),
        title: {
          formatter: () => "",
        },
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "28%",
        borderRadius: 2,
      },
    },
    xaxis: {
      categories: series.map((i: any) => i.label),
    },
    ...options,
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ mx: 3 }}>
        <Chart
          dir="ltr"
          type="bar"
          series={[{ data: chartSeries }]}
          options={chartOptions}
          width="100%"
          height={364}
        />
      </Box>
    </Card>
  );
}
