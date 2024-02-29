"use client";
import Grid from "@mui/material/Grid";
import AppWidgetSummary from "../../app-widget-summary";
import AppWebsiteVisits from "../../app-website-visits";
import { GetDashboardUserResponse } from "@/package/api/dash-board/user";
import Iconify from "@/components/iconify/iconify";
import { accessColor, adviseColor, userColor } from "@/components/config";

export const AppViewUser = ({
  data,
  labels,
}: {
  data: GetDashboardUserResponse;
  labels: string[];
}) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <AppWidgetSummary
          title="New Users"
          total={data.data.totalUser}
          color="info"
          icon={
            <Iconify
              icon="mingcute:user-add-fill"
              width={64}
              height={64}
              color={userColor}
            />
          }
        />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <AppWidgetSummary
          title="Total User"
          total={data.data.totalUser}
          color="error"
          icon={
            <Iconify
              icon="mingcute:user-2-fill"
              width={64}
              height={64}
              color={userColor}
            />
          }
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <AppWidgetSummary
          title="Total Acccess"
          total={data.data.totalAccess}
          color="info"
          icon={
            <Iconify
              icon="ant-design:login-outlined"
              width={64}
              height={64}
              color={accessColor}
            />
          }
        />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <AppWidgetSummary
          title="Total Advise"
          total={data.data.newAdvise}
          color="error"
          icon={
            <Iconify
              icon="clarity:talk-bubbles-solid"
              width={64}
              height={64}
              color={adviseColor}
            />
          }
        />
      </Grid>

      <Grid item xs={12} md={6} lg={12}>
        <AppWebsiteVisits
          title="User"
          description="user"
          // subheader="(+43%) than last year"
          chart={{
            labels,
            colors: [userColor],
            series: [
              {
                name: "Access",
                type: "column",
                fill: "solid",
                data: data.data.newUser,
              },
            ],
          }}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={12}>
        <AppWebsiteVisits
          title="Access"
          description="access"
          // subheader="(+43%) than last year"
          chart={{
            labels,
            colors: [accessColor],
            series: [
              {
                name: "Access",
                type: "column",
                fill: "solid",
                data: data.data.timeAccess,
              },
            ],
          }}
        />
      </Grid>
    </Grid>
  );
};
