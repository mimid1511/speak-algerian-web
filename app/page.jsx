import React from "react";
import Hero from "@/components/Hero";
import LessonGrid from "@/components/LessonGrid";
import Layout from "./layout";
import Features from "@/components/Features";
import Link from "next/link";

export default function Home() {
  return (
    <Layout type="root">
      <Hero />
      <Features />
      <LessonGrid limited={true} />
      {/* <Link href={"/"}>
        <img src={'/pub-felaha.jpg'} className="w-full" alt="Logo" />
      </Link> */}
    </Layout>
  );
}