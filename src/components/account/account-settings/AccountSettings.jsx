import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../../../ui/Button";
import { useAuth } from "../../../contexts/AuthContext";
import { toast } from "react-toastify";

const AccountSettings = () => {
  const [allowEdit, setAllowEdit] = useState(false);
  const { user, updateUser } = useAuth();

  const validationSchema = Yup.object().shape({
    newPassword: Yup.string()
      .min(2, "Password must be at least 8 characters")
      .required("Password is required"),
    oldPassword: Yup.string()
      .min(2, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const initialValues = {
    newPassword: "",
    oldPassword: "",
  };

  async function onSubmit(values) {
    try {
      setAllowEdit(false);

      await updateUser({
        newPassword: values.newPassword,
        oldPassword: values.oldPassword,
      });
    } catch (error) {
      toast.error(`Error updating user: ${error.message}`);
    }
  }

  function handleEditClick() {
    if (user.googleId) {
      toast.error("Cannot change password for Google sign-up users");
    } else {
      setAllowEdit(true);
    }
  }

  return (
    <>
      {!allowEdit && (
        <>
          <div className="flex justify-end">
            <button
              className="flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-lg text-white"
              onClick={handleEditClick}
            >
              <i className="pi pi-user-edit text-xl"></i>
              Edit
            </button>
          </div>
          <div className="mb-6">
            <span className="mb-2 inline-block">Email:</span>
            <div className="rounded-[34px] border border-gray-200 bg-gray-100 py-3 pl-3 text-sm font-medium ">
              {user.email}
            </div>
          </div>
          <div className="mb-6">
            <span className="mb-2 inline-block">Password:</span>
            <div className="flex items-center gap-1 rounded-[34px] border border-gray-200 bg-gray-100 py-3 pl-3 ">
              <i className="pi pi-ellipsis-h font-medium"></i>
              <i className="pi pi-ellipsis-h font-medium"></i>
            </div>
          </div>
        </>
      )}

      {allowEdit && (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <div className="mb-6">
              <label htmlFor="oldPassword" className="mb-2 inline-block">
                Old Password:
              </label>
              <Field
                type="password"
                id="oldPassword"
                name="oldPassword"
                className="w-full rounded-[34px] border border-gray-200 bg-gray-100 py-3 pl-3 text-sm font-medium placeholder-gray-500 focus:border-gray-400 focus:bg-white focus:outline-none"
              />
              <ErrorMessage
                name="oldPassword"
                component="div"
                className="mt-1 text-sm text-red-400"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="newPassword" className="mb-2 inline-block">
                New Password:
              </label>
              <Field
                type="password"
                id="newPassword"
                name="newPassword"
                className="w-full rounded-[34px] border border-gray-200 bg-gray-100 py-3 pl-3 text-sm font-medium placeholder-gray-500 focus:border-gray-400 focus:bg-white focus:outline-none"
              />
              <ErrorMessage
                name="newPassword"
                component="div"
                className="mt-1 text-sm text-red-400"
              />
            </div>

            <div className="mt-10 flex max-w-max gap-3">
              <Button text="Cancel" onClick={() => setAllowEdit(false)} />
              <Button text="Save" htmlType="submit" type="primary" />
            </div>
          </Form>
        </Formik>
      )}
    </>
  );
};

export default AccountSettings;
