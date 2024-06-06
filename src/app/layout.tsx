import type { Metadata } from "next";
import "@/css/satoshi.css";
import "@/css/style.css";

export const metadata: Metadata = {
  title: "AcademicRisk",
  description:
    "Web Application focused on reduce the rate of students at academic risk.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">{children}</div>
      </body>
    </html>
  );
}
