import Layout from "../components/Layout";
import LandingPage from "../components/pages/LandingPage";
import SearchModal from "../components/composite/modal/SearchModal";
import React from "react";

const Home = () => {
  return (
    <Layout
      meta={{
        title: 'My Movie App',
        description: 'Watch the latest movies and TV shows online on My Movie App. Enjoy a wide selection of genres and discover new favorites!',
      }}
    >
      <LandingPage />
      <SearchModal />
    </Layout>
  );
}

const Page = () => {
  return <Home />
}

export default Page;
