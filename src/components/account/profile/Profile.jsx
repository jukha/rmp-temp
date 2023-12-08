import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../../../ui/Button";
import { Calendar } from "primereact/calendar";

function Profile() {
  const [date, setDate] = useState(null);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    school: Yup.string().required("School is required"),
    // expectedYear: Yup.number()
    //   .integer("Expected Year should be a whole number")
    //   .required("Expected Year is required"),
  });
  const initialValues = {
    firstName: "",
    lastName: "",
    school: "",
    // expectedYear: "",
  };

  function onSubmit(values) {
    console.log("Form data submitted:", values);
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <div className="mb-6 flex gap-3">
          <div className="flex-1">
            <label className="mb-2 inline-block" htmlFor="firstName">
              First Name:
            </label>
            <Field
              className="w-full rounded-[34px] border border-gray-200 bg-gray-100 py-3 pl-3 text-sm font-medium placeholder-gray-500 focus:border-gray-400 focus:bg-white focus:outline-none"
              type="text"
              id="firstName"
              name="firstName"
            />
            <ErrorMessage
              className="mt-2 text-left text-red-400"
              name="firstName"
              component="div"
            />
          </div>
          <div className="flex-1">
            <label className="mb-2 inline-block" htmlFor="lastName">
              Last Name:
            </label>
            <Field
              className="w-full rounded-[34px] border border-gray-200 bg-gray-100 py-3 pl-3 text-sm font-medium placeholder-gray-500 focus:border-gray-400 focus:bg-white focus:outline-none"
              type="text"
              id="lastName"
              name="lastName"
            />
            <ErrorMessage
              className="mt-2 text-left text-red-400"
              name="lastName"
              component="div"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="mb-2 inline-block" htmlFor="school">
            School:
          </label>
          <Field
            className="w-full rounded-[34px] border border-gray-200 bg-gray-100 py-3 pl-3 text-sm font-medium placeholder-gray-500 focus:border-gray-400 focus:bg-white focus:outline-none"
            type="text"
            id="school"
            name="school"
          />
          <ErrorMessage
            className="mt-2 text-left text-red-400"
            name="school"
            component="div"
          />
        </div>

        <div>
          <label className="mb-2 block" htmlFor="expectedYear">
            Expected Year of Education:
          </label>
          <Calendar
            value={date}
            onChange={(e) => setDate(e.value)}
            view="year"
            className="w-full max-w-3xl"
            dateFormat="yy"
            pt={{
              input: {
                root: {
                  className:
                    "border-gray-200 bg-gray-100 border rounded-[34px] py-3 pl-3",
                },
              },

              dropdownButton: {
                root: { className: "bg-teal-500 border-teal-500" },
              },
              panel: { className: "bg-white" },
              header: { className: "bg-primary" },
              yearPicker: { className: "text-primary" },
            }}
          />
        </div>
        <div className="mt-10 flex max-w-max gap-3">
          <Button text="Cancel" />
          <Button text="Save" htmlType="submit" type="primary" />
        </div>
      </Form>
    </Formik>
  );
}

export default Profile;
