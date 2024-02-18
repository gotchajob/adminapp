import { getConfig } from "@/package/cookies/cookie"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function Page() {
    const config = getConfig(cookies())
    if (config.adminToken === "" ) {
        redirect("/login")
    } else {
        redirect("/dashboard")
    }

}