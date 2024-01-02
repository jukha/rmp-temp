import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "../../ui/Button";
import { Checkbox } from "primereact/checkbox";
import { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { toast } from "react-toastify";
import { addCompany } from "../../services/apiCompany";

const countries = [
  { name: "Select Country", value: "" },
  { name: "United States", value: "US" },
  { name: "Canada", value: "CA" },
  // Add more countries as needed
];

const states = [
  { name: "Select State/Province", value: "" },
  { name: "California", value: "CA" },
  { name: "New York", value: "NY" },
  // Add more states/provinces as needed
];

function AddCompany() {
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().required("Company name is required"),
    description: Yup.string().required("Description is required"),
    location: Yup.string().required("Location is required"),
    agreeToTerms: Yup.boolean().oneOf([true], "You must agree to the terms"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      location: "",
      agreeToTerms: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await addCompany(values);
        toast.success(response.message);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="mb-2 text-5xl font-extrabold">Add a Company</h1>
      <p className="mb-10">
        Please use the search bar above to make sure that the company does not
        already exist.
      </p>
      <form onSubmit={formik.handleSubmit} className="max-w-5xl">
        <div className="mb-6">
          <label className="mb-2 inline-block" htmlFor="name">
            Name of Company:
          </label>
          <input
            type="text"
            id="name"
            className="w-full rounded-[34px] border border-gray-200 bg-gray-100 py-3 pl-3 text-sm font-medium placeholder-gray-500 focus:border-gray-400 focus:bg-white focus:outline-none"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="mt-2 text-left text-red-400">
              {formik.errors.name}
            </div>
          ) : null}
        </div>

        <div className="mb-6">
          <label className="mb-2 inline-block" htmlFor="description">
            Description:
          </label>
          <input
            type="text"
            id="description"
            className="w-full rounded-[34px] border border-gray-200 bg-gray-100 py-3 pl-3 text-sm font-medium placeholder-gray-500 focus:border-gray-400 focus:bg-white focus:outline-none"
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
            className="w-full rounded-[34px] border border-gray-200 bg-gray-100 py-3 pl-3 text-sm font-medium placeholder-gray-500 focus:border-gray-400 focus:bg-white focus:outline-none"
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
            text="Add Company"
          />
        </div>
      </form>
    </main>
  );
}

export default AddCompany;
