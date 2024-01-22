import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "../../ui/Button";
import { Checkbox } from "primereact/checkbox";
import { useState } from "react";
import { toast } from "react-toastify";
import { addJob } from "../../services/apiJob";
import SearchCompanyForm from "../header/SearchCompanyForm";

function AddJob() {
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState(null);

  const validationSchema = Yup.object({
    title: Yup.string().required("Job title is required"),
    description: Yup.string().required("Description is required"),
    location: Yup.string().required("Location is required"),
    agreeToTerms: Yup.boolean().oneOf([true], "You must agree to the terms"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      location: "",
      agreeToTerms: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log("vlaues", values);
      try {
        setLoading(true);
        const response = await addJob({ ...values, company });
        toast.success(response.message);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    },
  });

  function handleCompanySelect(company) {
    setCompany(company.id);
  }

  function handleClearCompany() {
    setCompany(null);
  }

  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="mb-2 text-3xl font-extrabold sm:text-5xl">Add a Job</h1>
      <p className="mb-10">
        Please use the search bar above to make sure that the company does not
        already exist.
      </p>
      <form onSubmit={formik.handleSubmit} className="max-w-5xl">
        <div className="mb-6">
          <label className="mb-2 inline-block" htmlFor="title">
            Title of Job:
          </label>
          <input
            type="text"
            id="title"
            className="w-full rounded-[34px] border border-gray-200 bg-gray-100 py-3 pl-3 text-sm font-medium placeholder-gray-500 focus:border-gray-400 focus:bg-transparent focus:bg-white focus:outline-none dark:bg-transparent dark:focus:bg-transparent"
            name="title"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
          />
          {formik.touched.title && formik.errors.title ? (
            <div className="mt-2 text-left text-red-400">
              {formik.errors.title}
            </div>
          ) : null}
        </div>

        <div className="mb-6">
          <label className="mb-2 inline-block" htmlFor="title">
            Company:
          </label>
          <SearchCompanyForm
            onSelect={handleCompanySelect}
            onClear={handleClearCompany}
            ignoreHandleEnter={true}
          />
        </div>

        <div className="mb-6">
          <label className="mb-2 inline-block" htmlFor="description">
            Description:
          </label>
          <input
            type="text"
            id="description"
            className="w-full rounded-[34px] border border-gray-200 bg-gray-100 py-3 pl-3 text-sm font-medium placeholder-gray-500 focus:border-gray-400 focus:bg-transparent focus:bg-white focus:outline-none dark:bg-transparent dark:focus:bg-transparent"
            name="description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
          />
          {formik.touched.description && formik.errors.description ? (
            <div className="mt-2 text-left text-red-400">
              {formik.errors.description}
            </div>
          ) : null}
        </div>

        <div className="mb-6">
          <label className="mb-2 inline-block" htmlFor="location">
            Location:
          </label>
          <input
            type="text"
            id="location"
            className="w-full rounded-[34px] border border-gray-200 bg-gray-100 py-3 pl-3 text-sm font-medium placeholder-gray-500 focus:border-gray-400 focus:bg-transparent focus:bg-white focus:outline-none dark:bg-transparent dark:focus:bg-transparent"
            name="location"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.location}
          />
          {formik.touched.location && formik.errors.location ? (
            <div className="mt-2 text-left text-red-400">
              {formik.errors.location}
            </div>
          ) : null}
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-2">
            <Checkbox
              onChange={(e) => {
                formik.setFieldValue("agreeToTerms", e.checked);
                setChecked(e.checked);
              }}
              checked={checked}
              inputId="agreeToTerms"
              pt={{
                icon: "bg-white",
                input: "bg-transparent border border-primary",
              }}
            ></Checkbox>
            <label htmlFor="agreeToTerms">
              I agree to the Terms of Use and Privacy Policy.
            </label>
          </div>
          {formik.touched.agreeToTerms && formik.errors.agreeToTerms ? (
            <div className="mt-2 text-left text-red-400">
              {formik.errors.agreeToTerms}
            </div>
          ) : null}
        </div>

        <div className="max-w-max">
          <Button
            disabled={loading}
            type="primary"
            htmlType="submit"
            text="Add Job"
          />
        </div>
      </form>
    </main>
  );
}

export default AddJob;
