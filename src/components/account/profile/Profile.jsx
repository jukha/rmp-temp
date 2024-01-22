import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../../../ui/Button";
import { useAuth } from "../../../contexts/AuthContext";
import { toast } from "react-toastify";

function Profile() {
  const [allowEdit, setAllowEdit] = useState(false);
  const { user, updateUser } = useAuth();

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
  });
  const initialValues = {
    firstName: user.firstName,
    lastName: user.lastName,
  };

  async function onSubmit(values) {
    try {
      setAllowEdit(false);

      await updateUser({
        firstName: values.firstName,
        lastName: values.lastName,
      });
    } catch (error) {
      toast.error(`Error updating user: ${error.message}`);
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        {!allowEdit && (
          <div className="flex justify-end">
            <button
              className="flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-lg text-white"
              onClick={() => setAllowEdit(true)}
            >
              <i className="pi pi-user-edit text-xl"></i>
              Edit
            </button>
          </div>
        )}

        <div className="mb-6">
          <label className="mb-2 inline-block" htmlFor="firstName">
            First Name:
          </label>
          <Field
            className="w-full rounded-[34px] border border-gray-200 bg-gray-100 dark:bg-transparent py-3 pl-3 text-sm font-medium placeholder-gray-500 focus:border-gray-400 focus:bg-white focus:outline-none"
            type="text"
            id="firstName"
            name="firstName"
            disabled={!allowEdit}
          />
          <ErrorMessage
            className="mt-2 text-left text-red-400"
            name="firstName"
            component="div"
          />
        </div>
        <div className="mb-6">
          <label className="mb-2 inline-block" htmlFor="lastName">
            Last Name:
          </label>
          <Field
            className="w-full rounded-[34px] border border-gray-200 bg-gray-100 dark:bg-transparent py-3 pl-3 text-sm font-medium placeholder-gray-500 focus:border-gray-400 focus:bg-white focus:outline-none"
            type="text"
            id="lastName"
            name="lastName"
            disabled={!allowEdit}
          />
          <ErrorMessage
            className="mt-2 text-left text-red-400"
            name="lastName"
            component="div"
          />
        </div>

        {allowEdit && (
          <div className="mt-10 flex max-w-max gap-3">
            <Button text="Cancel" onClick={() => setAllowEdit(false)} />
            <Button text="Save" htmlType="submit" type="primary" />
          </div>
        )}
      </Form>
    </Formik>
  );
}

export default Profile;
