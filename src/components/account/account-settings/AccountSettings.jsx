import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../../../ui/Button";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const initialValues = {
  email: "",
  password: "",
};

const onSubmit = (values) => {
  console.log("Form data submitted:", values);
};

const AccountSettings = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <div className="mb-6">
          <label htmlFor="email" className="mb-2 inline-block">
            Email:
          </label>
          <Field
            type="email"
            id="email"
            name="email"
            className="w-full rounded-[34px] border border-gray-200 bg-gray-100 py-3 pl-3 text-sm font-medium placeholder-gray-500 focus:border-gray-400 focus:bg-white focus:outline-none"
          />
          <ErrorMessage
            name="email"
            component="div"
            className="mt-1 text-sm text-red-400"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="mb-2 inline-block">
            Password:
          </label>
          <Field
            type="password"
            id="password"
            name="password"
            className="w-full rounded-[34px] border border-gray-200 bg-gray-100 py-3 pl-3 text-sm font-medium placeholder-gray-500 focus:border-gray-400 focus:bg-white focus:outline-none"
          />
          <ErrorMessage
            name="password"
            component="div"
            className="mt-1 text-sm text-red-400"
          />
        </div>
        <div className="w-max">
          <Button text="Save" htmlType="submit" type="primary" />
        </div>
      </Form>
    </Formik>
  );
};

export default AccountSettings;
