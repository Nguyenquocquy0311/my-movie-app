import Layout from "@/components/Layout";
import LandingPage from "@/components/pages/LandingPage";

const Home = () => {
  return (
    <Layout
      meta={{
        title: 'Home - My Movie App',
        description: 'Watch the latest movies and TV shows online on My Movie App. Enjoy a wide selection of genres and discover new favorites!',
      }}
    >
      <LandingPage />
    </Layout>
  );
}

const Page = () => {
  return <Home />
}

export default Page;
