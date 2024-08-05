import React from "react";
import HeroEvolued from "@/components/HeroEvolued";
import Layout from "../layout";
import Blog from "@/components/Blog";
import Title from "@/components/Title";

export default function news() {
    return (
        <Layout type="root">
            {/* <HeroEvolued /> */}
            <Title>Actualitées</Title>
            <Blog />
        </Layout>
    );
}