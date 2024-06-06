import type { Metadata } from "next";
import SignIn from "./auth/signin/page";

export const metadata: Metadata = {
  title: "AcademicRisk | Sign In",
};

export default function Home() {
  return <SignIn />;
}
