import SnackbarProvider from "@/components/snackbar-provider";
import ThemeRegistry from "@/components/theme-registry/theme-registry";
import { getConfig } from "@/package/cookies/cookie";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export const metadata = {
  title: "Gotcha Job",
  description:
    "Nền tảng website & app cung cấp các dịch vụ cải thiện kỹ năng người dùng trong quá trình họ tham gia ứng tuyển công việc",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/x-icon"
          href="/assets/images/favicon.ico"
        />
      </head>
      <body
        style={{
          overflowX: "hidden",
        }}
      >
        <ThemeRegistry>
          <SnackbarProvider>{children}</SnackbarProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
