import Layout from "../../components/Layout";
import React from "react";
import Admin from "@/components/pages/Admin";

const AdminPage = () => {
  return (
    <Layout
      meta={{
        title: "Trang quản trị",
        description:
          "Manage your Movie App effectively with the Admin Dashboard. Update content, monitor user activity, and ensure smooth operations of the app.",
      }}
      noindex
    >
      <Admin />
    </Layout>
  );
};

const Page = () => {
  return <AdminPage />;
};

export default Page;
