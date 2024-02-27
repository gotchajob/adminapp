"use client";
import AppWidgetSummary from "../../app-widget-summary";
import AppWebsiteVisits from "../../app-website-visits";
import Grid from "@mui/material/Grid";
import { GetDashboardTransactionResponse } from "@/package/api/dash-board/transaction";
import AppCurrentVisits from "../../app-current-visits";
import {
  cvColor,
  listColor,
  mockInterviewColor,
  orderColor,
  partnerTrainingColor,
  smartTumColor,
} from "@/components/config";
import Stack from "@mui/material/Stack";
import { ImageCard } from "@/components/common/image-card";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export const AppViewTransaction = ({
  data,
  labels,
}: {
  data: GetDashboardTransactionResponse;
  labels: string[];
}) => {
  const [service, setService] = useState(data.data.listTransaction[0].service);
  const handleChange = (event: SelectChangeEvent) => {
    setService(event.target.value as string);
  };
  const SelectTransactionDetal = () => {
    return (
      <>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <Select value={service} onChange={handleChange}>
              {data.data.listTransaction.map((value) => (
                <MenuItem value={value.service} key={value.service}>
                  {value.service}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={12}>
          {data.data.listTransaction.map((e, index) => {
            if (e.service === service) {
              return (
                <AppWebsiteVisits
                  title={service}
                  key={service}
                  description="Transactions"
                  // subheader="(+43%) than last year"
                  chart={{
                    labels,
                    colors: [listColor[index]],
                    series: [
                      {
                        name: "Team C",
                        type: "line",
                        fill: "solid",
                        data: e.transactionPerDay,
                      },
                    ],
                  }}
                />
              );
            }
          })}
        </Grid>
      </>
    );
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={8}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <AppWidgetSummary
              title="Total Transactions"
              total={data.data.totalTransaction.total}
              color="warning"
              icon={<ImageCard src="/assets/icons/glass/ic_glass_buy.png" />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <AppWidgetSummary
              title="Total Revenue"
              total={data.data.totalTransaction.revenue}
              color="error"
              icon={
                <ImageCard src="/assets/icons/glass/ic_glass_message.png" />
              }
            />
          </Grid>
          <Grid item xs={12} md={6} lg={12}>
            <AppWebsiteVisits
              title="Transaction"
              description="Transactions"
              // subheader="(+43%) than last year"
              chart={{
                labels,
                colors: [orderColor],
                series: [
                  {
                    name: "Team C",
                    type: "line",
                    fill: "solid",
                    data: data.data.totalTransaction.transactionPerDay,
                  },
                ],
              }}
            />
          </Grid>
          <SelectTransactionDetal />
        </Grid>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Stack spacing={3}>
          <AppCurrentVisits
            title="Total Transactions"
            chart={{
              colors: listColor,
              series: data.data.listTransaction.map((transaction) => {
                return {
                  label: transaction.service,
                  value: transaction.total,
                };
              }),
            }}
          />
          <AppCurrentVisits
            title="Total Revenue"
            chart={{
              colors: listColor,
              series: data.data.listTransaction.map((transaction) => {
                return {
                  label: transaction.service,
                  value: transaction.revenue,
                };
              }),
            }}
          />
        </Stack>
      </Grid>
    </Grid>
  );
};
