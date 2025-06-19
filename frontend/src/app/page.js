import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "@/app/components/Navbar";
import TopMovers from "@/app/components/TopMovers";
import FeatureBoard from "@/app/components/FeatureBoard";

export default function Home() {
  return (

    <>
      <Navbar />
      <div style={{alignItems: "center"}}>
        <TopMovers />
        <FeatureBoard />
      </div>

    </>
  );
}
