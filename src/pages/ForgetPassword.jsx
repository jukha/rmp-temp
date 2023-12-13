import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  return (
    <div className=" flex min-h-screen flex-col items-center justify-center  space-y-4 bg-gray-100 p-4 text-gray-900 antialiased">
      <div className="w-full max-w-lg space-y-6 rounded-md bg-white px-8 py-16">
        <h1 className=" mb-6 text-center text-3xl font-bold">Don't worry</h1>
        <p className="lg:mx-12 text-center">
          We are here to help you to recover your password. Enter the email
          address you used when you joined and we'll send you instructions to
          reset your password.
        </p>
        <form action="#" className="w-ful mt-10">
          <span className="p-float-label mb-6">
            <InputText
              id="email"
              value={email}
              className="w-full rounded-[34px] border border-gray-200 bg-gray-100 py-3 pl-3 text-sm font-medium placeholder-gray-500 focus:border-gray-400 focus:bg-white focus:outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email" className="pl-2 text-primary">
              Email
            </label>
          </span>
          <div className="mt-5">
            <Button type="primary" text="Continue" />
          </div>
        </form>
        <div className="flex items-center justify-between text-sm text-gray-600">
          <Link
            to="/login"
            className="ml-4 inline-flex cursor-pointer items-center gap-2 text-gray-800 hover:text-blue-500"
          >
            <i className="pi pi-arrow-left"></i>
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
