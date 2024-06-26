import { Inter, Poppins } from "next/font/google";

import Navbar from "@/components/home/header/Navbar";
import AuthProvider from "@/contextApi/providers/AuthProvider";
import { dbConnect } from "@/services/dbconnect";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
export const metadata = {
  title: "Khana Khazana",
  description:
    "Khana Khazana || Savor culinary excellence at our restaurant. Reserve now for an unforgettable dining experience !!",
};

export default async function RootLayout({ children }) {
  await dbConnect();
  return (
    <html lang='en'>
      <body className={`${poppins.variable} ${inter.variable}`}>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
