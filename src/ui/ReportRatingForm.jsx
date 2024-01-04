import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "./Button";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "./Loader";
import { getRatingDetail, reportARating } from "../services/apiRating";

function ReportRatingForm() {
  const [loading, setLoading] = useState(true);

  const [ratingDetail, setRatingDetail] = useState(null);

  const [reporting, setReporting] = useState(false);

  const [ratingId, setRatingId] = useState(false);

  const validationSchema = Yup.object().shape({
    reportingReason: Yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      reportingReason: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setReporting(true);
        const response = await reportARating(
          ratingId,
          true,
          values.reportingReason,
        );
        toast.success(response.message);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setReporting(false);
      }
    },
  });

  useEffect(() => {
    async function ratingDetail() {
      try {
        const ratingId = location.pathname.split("/").pop();

        setRatingId(ratingId);

        const response = await getRatingDetail(ratingId);

        setRatingDetail(response?.data);
      } catch (error) {
        toast.error(`error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    }

    ratingDetail();
  }, [location.pathname]);

  console.log("ratingDetail", ratingDetail);

  if (loading) {
    return <Loader />;
  }

  return (
    <main className="mx-auto px-4 py-16 xl:container">
      <div className="max-w-5xl">
        <h3 className="mb-3 text-xl">
          Report a Rating for
          <strong className="pl-1">
            {ratingDetail?.company
              ? ratingDetail?.company?.name
              : ratingDetail?.job?.title}
          </strong>
        </h3>
        <div className="rounded-md border border-gray-400 p-6 shadow-lg ">
          <div className="mb-6 bg-gray-200 p-4">
            <h4 className="mb-1 font-medium">You're reporting:</h4>
            <p className="mb-4">{ratingDetail?.ratingText}</p>
            <h4 className="mb-1 font-medium">What's the problem?</h4>
            <p>
              If you think this comment is inconsistent with Rate My Professors
              Site Guidelines, report it and tell us why.
            </p>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div>
              <textarea
                name="reportingReason"
                value={formik.values.reportingReason}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full resize-none rounded-md border border-gray-400 bg-white p-4 text-lg font-medium placeholder-gray-400 focus:border-gray-800 focus:outline-none"
                placeholder="Tell us what's wrong with this comment..."
                rows={10}
              ></textarea>
              {formik.touched.reportingReason &&
                formik.errors.reportingReason && (
                  <div className="text-red-500">
                    {formik.errors.reportingReason}
                  </div>
                )}
            </div>
            <div className="mt-6 flex max-w-max gap-3">
              <Button text="Report" disabled={reporting} htmlType="submit" type="primary" />
              <Button text="Cancel" />
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default ReportRatingForm;
