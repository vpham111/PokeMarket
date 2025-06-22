import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "@/app/components/Navbar";
import TopMovers from "@/app/components/TopMovers";
import FeatureBoard from "@/app/components/FeatureBoard";
import FullSearch from "@/app/components/FullSearch";

export default function Home() {
  return (

    <>
      <Navbar />
      <div style={{alignItems: "center"}}>
          <FullSearch />
        <TopMovers />
        <FeatureBoard />
      </div>

    </>
  );
}
