import { useState } from "react";
import { Form, FormValues } from "./form";

export function App() {
  const handleSubmit = (v: FormValues) => {
    console.log(v);

  }

  return <Form
    onSubmit={handleSubmit}
  />
}