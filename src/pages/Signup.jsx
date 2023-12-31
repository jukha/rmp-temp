import Button from "../ui/Button";
import Logo from "../ui/Logo";
import { Link } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../contexts/AuthContext";
import { useGoogleLogin } from "@react-oauth/google";

function Signup() {
  const { signup, loading, googleAuth } = useAuth();
  function handleGoogleLoginSuccess(tokenResponse) {
    const accessToken = tokenResponse.access_token;
    googleAuth(accessToken);
  }
  const login = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required."),
      lastName: Yup.string().required("Last name is required."),
      email: Yup.string()
        .email("Invalid email address. E.g. example@email.com")
        .required("Email is required."),
      password: Yup.string().required("Password is required."),
    }),
    onSubmit: async (values) => {
      await signup(values);
    },
  });

  return (
    <div className="flex min-h-screen justify-center bg-gray-100 text-gray-900">
      <div className="m-0 max-w-screen-2xl flex-1 justify-center bg-white shadow sm:m-10 sm:rounded-lg lg:flex">
        <div className="p-6 sm:p-12 lg:w-1/2 xl:w-5/12">
          <div className="mx-auto max-w-max">
            <Logo />
          </div>
          <form
            onSubmit={formik.handleSubmit}
            className="mt-12 flex flex-col items-center"
          >
            <h1 className="text-2xl font-extrabold xl:text-3xl">Sign up</h1>
            <div className="mt-8 w-full flex-1">
              <div className="flex flex-col items-center">
                <button
                  type="button"
                  onClick={login}
                  className="focus:shadow-outline flex w-full max-w-xs items-center justify-center rounded-[34px] bg-indigo-100 py-3 font-bold text-gray-800 shadow-sm transition-all duration-300 ease-in-out hover:shadow focus:shadow-sm focus:outline-none"
                >
                  <div className="rounded-full bg-white p-2">
                    <svg className="w-4" viewBox="0 0 533.5 544.3">
                      <path
                        d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                        fill="#4285f4"
                      />
                      <path
                        d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                        fill="#34a853"
                      />
                      <path
                        d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                        fill="#fbbc04"
                      />
                      <path
                        d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                        fill="#ea4335"
                      />
                    </svg>
                  </div>
                  <span className="ml-4">Sign Up with Google</span>
                </button>
              </div>

              <div className="my-12 border-b text-center">
                <div className="inline-block translate-y-1/2 transform bg-white px-2 text-sm font-medium leading-none tracking-wide text-gray-600">
                  Or sign up with e-mail
                </div>
              </div>

              <div>
                <div className="mb-9 flex flex-col gap-9 md:flex-row md:gap-3">
                  <div className="flex-1">
                    <span className="p-float-label">
                      <InputText
                        id="fName"
                        value={formik.values.firstName}
                        className="w-full rounded-[34px] border border-gray-200 bg-gray-100 py-3 pl-3 text-sm font-medium placeholder-gray-500 focus:border-gray-400 focus:bg-white focus:outline-none"
                        onChange={(e) =>
                          formik.setFieldValue("firstName", e.target.value)
                        }
                      />
                      <label htmlFor="fName" className="pl-2 text-primary">
                        First Name
                      </label>
                    </span>
                    {formik.touched.firstName && formik.errors.firstName ? (
                      <div className="ml-3 mt-2 text-left text-red-400">
                        {formik.errors.firstName}
                      </div>
                    ) : null}
                  </div>
                  <div className="flex-1">
                    <span className="p-float-label">
                      <InputText
                        id="lName"
                        value={formik.values.lastName}
                        className="w-full rounded-[34px] border border-gray-200 bg-gray-100 py-3 pl-3 text-sm font-medium placeholder-gray-500 focus:border-gray-400 focus:bg-white focus:outline-none"
                        onChange={(e) =>
                          formik.setFieldValue("lastName", e.target.value)
                        }
                      />
                      <label htmlFor="lName" className="pl-2 text-primary">
                        Last Name
                      </label>
                    </span>
                    {formik.touched.lastName && formik.errors.lastName ? (
                      <div className="ml-3 mt-2 text-left text-red-400">
                        {formik.errors.lastName}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="mb-9">
                  <span className="p-float-label">
                    <InputText
                      id="email"
                      value={formik.values.email}
                      className="w-full rounded-[34px] border border-gray-200 bg-gray-100 py-3 pl-3 text-sm font-medium placeholder-gray-500 focus:border-gray-400 focus:bg-white focus:outline-none"
                      onChange={(e) =>
                        formik.setFieldValue("email", e.target.value)
                      }
                    />
                    <label htmlFor="email" className="pl-2 text-primary">
                      Email
                    </label>
                  </span>
                  {formik.touched.email && formik.errors.email ? (
                    <div className="mt-2 text-left text-red-400">
                      {formik.errors.email}
                    </div>
                  ) : null}
                </div>
                <div className="mb-9">
                  <span className="p-float-label">
                    <InputText
                      id="password"
                      value={formik.values.password}
                      type="password"
                      className="w-full rounded-[34px] border border-gray-200 bg-gray-100 py-3 pl-3 text-sm font-medium placeholder-gray-500 focus:border-gray-400 focus:bg-white focus:outline-none"
                      onChange={(e) =>
                        formik.setFieldValue("password", e.target.value)
                      }
                    />
                    <label htmlFor="password" className="pl-2 text-primary">
                      Password
                    </label>
                  </span>
                  {formik.touched.password && formik.errors.password ? (
                    <div className="ml-3 mt-2 text-left text-red-400">
                      {formik.errors.password}
                    </div>
                  ) : null}
                </div>

                <div className="mt-5">
                  <Button
                    htmlType="submit"
                    type="primary"
                    text="Continue"
                    disabled={loading}
                  />
                </div>
                <p className="mt-6 text-center text-xs text-gray-600">
                  Already have an account?
                  <Link
                    to="/login"
                    className="ml-1 border-b border-dotted border-gray-500 font-medium text-primary"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
        <div className="hidden flex-1 bg-indigo-100 text-center lg:flex">
          <div className="m-12 w-full bg-[url('/assets/signup-bg.svg')] bg-contain bg-center bg-no-repeat xl:m-16"></div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
