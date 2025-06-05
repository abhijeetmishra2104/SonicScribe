import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import SignUpForm from "./signupform";

export default async function SignUpPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return <SignUpForm />;
}

