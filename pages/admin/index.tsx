import Layout from "../../components/Layout";
import React from "react";
import Admin from "@/components/pages/Admin";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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
      <ToastContainer />
    </Layout>
  );
};

const Page = () => {
  return <AdminPage />;
};

export default Page;
