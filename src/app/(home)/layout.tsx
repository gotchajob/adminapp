import { ReactNode } from "react";
import DashboardLayout from "./_components/dashboard";

export default function Layout({children}: {children: ReactNode}) {
    return (
        <DashboardLayout>
            {children}
        </DashboardLayout>
    )
}