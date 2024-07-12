"use client";

// import type { Metadata } from "next";
import "@/css/satoshi.css";
import "@/css/style.css";
import Providers from "@/components/Providers";
import { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";

// export const metadata: Metadata = {
//   title: "AcademicRisk",
//   description:
//     "Web Application focused on reduce the rate of students at academic risk.",
//   icons: {
//     icon: "/favicon.ico",
//   },
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="dark:bg-boxdark-2 dark:text-bodydark">
            {isLoading ? <Loader /> : children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
