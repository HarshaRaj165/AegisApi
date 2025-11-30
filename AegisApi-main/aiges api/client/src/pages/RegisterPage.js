import React from "react";
import RegisterForm from "../components/RegisterForm";

export default function RegisterPage({ history }) {
  return <RegisterForm onSuccess={() => (window.location = "/login")} />;
}
