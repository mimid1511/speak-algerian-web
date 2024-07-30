import React from "react";
import Hero from "@/components/Hero";
import LessonGrid from "@/components/LessonGrid";
import Layout from "./layout";
import Features from "@/components/Features";

export default function Home() {
  return (
    <Layout type="root">
      <Hero />
      <Features />
      <LessonGrid />
    </Layout>
  );
}