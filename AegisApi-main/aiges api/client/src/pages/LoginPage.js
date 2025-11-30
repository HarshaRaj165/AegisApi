import React from "react";
import LoginForm from "../components/LoginForm";

export default function LoginPage({ history }) {
  return <LoginForm onLogin={() => (window.location = "/dashboard")} />;
}
