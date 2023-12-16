import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "../../ui/Button";
import { Checkbox } from "primereact/checkbox";
import { useState } from "react";
import { Dropdown } from "primereact/dropdown";

const departments = [
  { name: "Any", value: "any" },
  { name: "Computer Science", value: "cs" },
  { name: "Socialogy", value: "socialogy" },
  { name: "Speech", value: "speech" },
];

function AddJob() {
  const [checked, setChecked] = useState(false);
  const [department, setDepartment] = useState("");
  const validationSchema = Yup.object({
    schoolName: Yup.string().required("School Name is required"),
    professorFirstName: Yup.string().required(
      "Professor's First Name is required",
    ),
    professorLastName: Yup.string().required(
      "Professor's Last Name is required",
    ),
    directoryListing: Yup.string().required(
      "Directory Listing of Professor is required",
    ),
    agreeToTerms: Yup.boolean().oneOf([true], "You must agree to the terms"),
    department: Yup.string().required("Department is required"),
  });

  const formik = useFormik({
    initialValues: {
      schoolName: "",
      professorFirstName: "",
      professorMiddleName: "",
      professorLastName: "",
      directoryListing: "",
      agreeToTerms: false,
      department: "",
    },
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission logic here
      console.log("Form submitted with values:", values);
    },
  });
  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="mb-2 text-5xl font-extrabold">Add a Professor</h1>
      <p className="mb-10">
        Please use the search bar above to make sure that the professor does not
        already exist at this school.
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
          <label className="mb-2 inline-block" htmlFor="professorFirstName">
            Professor's First Name:
          </label>
          <input
            type="text"
            id="professorFirstName"
            className="w-full rounded-[34px] border border-gray-200 bg-gray-100 py-3 pl-3 text-sm font-medium placeholder-gray-500 focus:border-gray-400 focus:bg-white focus:outline-none"
            name="professorFirstName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.professorFirstName}
          />
          {formik.touched.professorFirstName &&
          formik.errors.professorFirstName ? (
            <div className="mt-2 text-left text-red-400">
              {formik.errors.professorFirstName}
            </div>
          ) : null}
        </div>

        <div className="mb-6">
          <label className="mb-2 inline-block" htmlFor="professorMiddleName">
            Professor's Middle Name:
          </label>
          <input
            type="text"
            id="professorMiddleName"
            className="w-full rounded-[34px] border border-gray-200 bg-gray-100 py-3 pl-3 text-sm font-medium placeholder-gray-500 focus:border-gray-400 focus:bg-white focus:outline-none"
            name="professorMiddleName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.professorMiddleName}
          />
          {/* Add error handling if needed */}
        </div>

        <div className="mb-6">
          <label className="mb-2 inline-block" htmlFor="professorLastName">
            Professor's Last Name:
          </label>
          <input
            type="text"
            id="professorLastName"
            className="w-full rounded-[34px] border border-gray-200 bg-gray-100 py-3 pl-3 text-sm font-medium placeholder-gray-500 focus:border-gray-400 focus:bg-white focus:outline-none"
            name="professorLastName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.professorLastName}
          />
          {formik.touched.professorLastName &&
          formik.errors.professorLastName ? (
            <div className="mt-2 text-left text-red-400">
              {formik.errors.professorLastName}
            </div>
          ) : null}
        </div>
        <div className="mb-6">
          <label className="mb-2 inline-block" htmlFor="department">
            Department
          </label>
          <Dropdown
            value={department}
            onChange={(e) => setDepartment(e.value)}
            options={departments}
            optionLabel="name"
            placeholder="Select..."
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
          {formik.touched.department && formik.errors.department ? (
            <div className="mt-2 text-left text-red-400">
              {formik.errors.department}
            </div>
          ) : null}
        </div>

        <div className="mb-6">
          <label className="mb-2 inline-block" htmlFor="directoryListing">
            Directory Listing of Professor:
          </label>
          <input
            type="text"
            id="directoryListing"
            className="w-full rounded-[34px] border border-gray-200 bg-gray-100 py-3 pl-3 text-sm font-medium placeholder-gray-500 focus:border-gray-400 focus:bg-white focus:outline-none"
            name="directoryListing"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.directoryListing}
          />
          {formik.touched.directoryListing && formik.errors.directoryListing ? (
            <div className="mt-2 text-left text-red-400">
              {formik.errors.directoryListing}
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
          <Button type="primary" htmlType="submit" text="Add Professor" />
        </div>
      </form>
    </main>
  );
}

export default AddJob;
