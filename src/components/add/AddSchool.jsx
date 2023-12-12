import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "../../ui/Button";
import { Checkbox } from "primereact/checkbox";
import { useState } from "react";
import { Dropdown } from "primereact/dropdown";

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

function AddSchool() {
  const [checked, setChecked] = useState(false);
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");

  const validationSchema = Yup.object({
    schoolName: Yup.string().required("School Name is required"),
    country: Yup.string().required("Country is required"),
    state: Yup.string().required("State/Province is required"),
    city: Yup.string().required("City is required"),
    website: Yup.string().required("Website is required").url("Invalid URL"),
    yourEmail: Yup.string()
      .required("Your Email is required")
      .email("Invalid Email"),
    agreeToTerms: Yup.boolean().oneOf([true], "You must agree to the terms"),
  });

  const formik = useFormik({
    initialValues: {
      schoolName: "",
      country: "",
      state: "",
      city: "",
      website: "",
      yourEmail: "",
      agreeToTerms: false,
    },
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission logic here
      console.log("Form submitted with values:", values);
    },
  });

  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="mb-2 text-5xl font-extrabold">Add a School</h1>
      <p className="mb-10">
        Please use the search bar above to make sure that the school does not
        already exist.
      </p>
      <form onSubmit={formik.handleSubmit} className="max-w-5xl">
        <div className="mb-6">
          <label className="mb-2 inline-block" htmlFor="schoolName">
            Name of School:
          </label>
          <input
            type="text"
            id="schoolName"
            className="w-full rounded-[34px] border border-gray-200 bg-gray-100 py-3 pl-3 text-sm font-medium placeholder-gray-500 focus:border-gray-400 focus:bg-white focus:outline-none"
            name="schoolName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.schoolName}
          />
          {formik.touched.schoolName && formik.errors.schoolName ? (
            <div className="mt-2 text-left text-red-400">
              {formik.errors.schoolName}
            </div>
          ) : null}
        </div>

        <div className="mb-6">
          <label className="mb-2 inline-block" htmlFor="country">
            Country:
          </label>
          <Dropdown
            value={country}
            onChange={(e) => setCountry(e.value)}
            options={countries}
            optionLabel="name"
            placeholder="Select Country"
            className="w-full rounded-[34px] border border-gray-200"
            pt={{
              root: "bg-gray-100 text-primary",
              input: "font-poppins py-3 bg-transparent text-black",
              panel: "bg-transparent font-poppins rounded-[34px]",
              wrapper: "bg-gray-100 rounded-[inherit]",
              item: "text-black",
              trigger: "text-black",
            }}
          />
          {formik.touched.country && formik.errors.country ? (
            <div className="mt-2 text-left text-red-400">
              {formik.errors.country}
            </div>
          ) : null}
        </div>

        <div className="mb-6">
          <label className="mb-2 inline-block" htmlFor="state">
            State/Province:
          </label>
          <Dropdown
            value={state}
            onChange={(e) => setState(e.value)}
            options={states}
            optionLabel="name"
            placeholder="Select State/Province"
            className="w-full rounded-[34px] border border-gray-200"
            pt={{
              root: "bg-gray-100 text-primary",
              input: "font-poppins py-3 bg-transparent text-black",
              panel: "bg-transparent font-poppins rounded-[34px]",
              wrapper: "bg-gray-100 rounded-[inherit]",
              item: "text-black",
              trigger: "text-black",
            }}
          />
          {formik.touched.state && formik.errors.state ? (
            <div className="mt-2 text-left text-red-400">
              {formik.errors.state}
            </div>
          ) : null}
        </div>

        <div className="mb-6">
          <label className="mb-2 inline-block" htmlFor="city">
            City:
          </label>
          <input
            type="text"
            id="city"
            className="w-full rounded-[34px] border border-gray-200 bg-gray-100 py-3 pl-3 text-sm font-medium placeholder-gray-500 focus:border-gray-400 focus:bg-white focus:outline-none"
            name="city"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.city}
          />
          {formik.touched.city && formik.errors.city ? (
            <div className="mt-2 text-left text-red-400">
              {formik.errors.city}
            </div>
          ) : null}
        </div>

        <div className="mb-6">
          <label className="mb-2 inline-block" htmlFor="website">
            Website:
          </label>
          <input
            type="text"
            id="website"
            className="w-full rounded-[34px] border border-gray-200 bg-gray-100 py-3 pl-3 text-sm font-medium placeholder-gray-500 focus:border-gray-400 focus:bg-white focus:outline-none"
            name="website"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.website}
          />
          {formik.touched.website && formik.errors.website ? (
            <div className="mt-2 text-left text-red-400">
              {formik.errors.website}
            </div>
          ) : null}
        </div>

        <div className="mb-6">
          <label className="mb-2 inline-block" htmlFor="yourEmail">
            Your Email:
          </label>
          <input
            type="text"
            id="yourEmail"
            className="w-full rounded-[34px] border border-gray-200 bg-gray-100 py-3 pl-3 text-sm font-medium placeholder-gray-500 focus:border-gray-400 focus:bg-white focus:outline-none"
            name="yourEmail"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.yourEmail}
          />
          {formik.touched.yourEmail && formik.errors.yourEmail ? (
            <div className="mt-2 text-left text-red-400">
              {formik.errors.yourEmail}
            </div>
          ) : null}
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-2">
            <Checkbox
              onChange={(e) => setChecked(e.checked)}
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
          <Button type="primary" htmlType="submit" text="Add School" />
        </div>
      </form>
    </main>
  );
}

export default AddSchool;
