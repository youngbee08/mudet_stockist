import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/Home";
import { Toaster } from "sonner";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Affiliate from "./pages/Affiliate";
import Contact from "./pages/Contact";
import Purchase from "./pages/Purchase";
import PaymentStatus from "./pages/PaymentStatusPage";

const App: React.FC = () => {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route
          index
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        <Route
          path="/about"
          element={
            <MainLayout>
              <About />
            </MainLayout>
          }
        />
        <Route
          path="/become-an-affiliate"
          element={
            <MainLayout>
              <Affiliate />
            </MainLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <MainLayout>
              <Contact />
            </MainLayout>
          }
        />
        <Route
          path="/purchase-product"
          element={
            <MainLayout>
              <Purchase />
            </MainLayout>
          }
        />
        <Route
          path="/payment-status"
          element={
            <MainLayout>
              <PaymentStatus />
            </MainLayout>
          }
        />
      </Routes>
    </>
  );
};

export default App;
