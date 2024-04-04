import { getUserdata } from "@/libs/auth";
import { redirect } from "next/navigation";

export default async function Layout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const userdata = await getUserdata();

	if (!userdata) {
		redirect("/auth/sign-in");
	}

	return <>{children}</>;
}