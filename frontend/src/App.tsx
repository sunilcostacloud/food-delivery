import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import HomePage from "./pages/HomePage";

export default function App() {
  return (
    <Routes>
     <Route path="/" element={<Layout> <HomePage /> </Layout>} />
     <Route path="/user-profile" element={<div>User Profile</div>} />
     <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}