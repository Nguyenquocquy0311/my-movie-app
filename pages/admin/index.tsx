import { Inter } from "next/font/google";
import Admin from "@/components/pages/Admin";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Admin />
  );
}
