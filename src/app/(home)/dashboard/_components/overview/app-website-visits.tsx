"use client";
import Chart from "@/components/chart/chart";
import useChart from "@/components/chart/use-chart";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

// ----------------------------------------------------------------------

export interface AppWebsiteVisitsProps {
  title: string;
  subheader?: string;
  description: string;
  chart: any;
}
export default function AppWebsiteVisits({
  title,
  subheader,
  chart,
  description,
  ...other
}: AppWebsiteVisitsProps) {
  const { labels, colors, series, options } = chart;

  const chartOptions = useChart({
    colors,
    plotOptions: {
      bar: {
        columnWidth: "16%",
      },
    },
    fill: {
      type: series.map((i: any) => i.fill),
    },
    labels,
    xaxis: {
      type: "datetime",
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (value: any) => {
          if (typeof value !== "undefined") {
            return `${value.toFixed(0)} ${description}`;
          }
          return value;
        },
      },
    },
    ...options,
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ p: 3, pb: 1 }}>
        <Chart
          dir="ltr"
          type="line"
          series={series}
          options={chartOptions}
          width="100%"
          height={364}
        />
      </Box>
    </Card>
  );
}
