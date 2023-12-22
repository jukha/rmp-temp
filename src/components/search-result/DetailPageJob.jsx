import { useEffect, useState } from "react";
import Button from "../../ui/Button";
import { Dropdown } from "primereact/dropdown";
import { Tooltip } from "primereact/tooltip";
import { getBgColor } from "../../utils/calcBgColor";
import { getJobBySlug } from "../../services/apiJob";
import { useLocation } from "react-router-dom";

const ratingData = [
  { name: "awesome", value: 5, count: 1 },
  { name: "great", value: 4, count: 1 },
  { name: "good", value: 3, count: 4 },
  { name: "ok", value: 2, count: 6 },
  { name: "awful", value: 1, count: 4 },
];

const courses = [
  { name: "All courses", value: "all" },
  { name: "Computer Science", value: "cs" },
  { name: "Artificial Intelligence", value: "ai" },
];

function DetailPageJob() {
  const [course, setCourse] = useState("all");
  const [job, setJob] = useState(null);
  const location = useLocation();
  useEffect(() => {
    (async () => {
      const slug = location.pathname.split("/").pop();
      const response = await getJobBySlug(slug);
      setJob(response?.job);
    })();
  }, [location.pathname]);
  return (
    <main className="mx-auto px-4 py-16 xl:container">
      <div className="flex flex-col items-start gap-10 lg:flex-row">
        <div className="max-w-md flex-1">
          <div className="mb-3 flex items-start gap-3">
            <h3 className="text-4xl font-extrabold sm:text-7xl">4</h3>
            <h4 className="text-lg font-medium text-gray-600">/ 5</h4>
          </div>
          <h5 className="font-medium">Overall Quality Based on 5 ratings</h5>
          <h1 className="mb-2 mt-6 text-2xl font-extrabold sm:text-4xl">
            <span className="capitalize">{job?.title}</span>
          </h1>
          <p>
            at
            <strong> {job?.companyDetails?.name}</strong>
          </p>
          <div className="my-10 flex gap-5">
            <div className="text-center">
              <h5 className="text-2xl font-extrabold sm:text-4xl">100%</h5>
              <p>Would take again</p>
            </div>
            <span className="inline-block h-16 w-[1px] bg-black"></span>
            <div className="text-center">
              <h5 className="text-2xl font-extrabold sm:text-4xl">2.6</h5>
              <p>Level of Difficulty</p>
            </div>
          </div>
          <div className="mb-10 flex items-center gap-3">
            <div>
              <Button text="Rate" to={`/add/job-rating/${job?.slug}`} />
            </div>
            <div>
              <Button
                text="Compare"
                type="primary"
                to="/compare/jobs/abc/abc"
              />
            </div>
          </div>
          <h5 className="my-4 font-semibold">I'm Professor Abcede</h5>
          <div>
            <h5 className="mb-3 font-semibold">Professor Abcede's Top Tags</h5>
            <div className="flex flex-wrap gap-4">
              <span className="inline-block rounded-2xl bg-gray-300 px-4 py-2 uppercase">
                Extra credit
              </span>
              <span className="inline-block rounded-2xl bg-gray-300 px-4 py-2 uppercase">
                Get ready to read
              </span>
              <span className="inline-block rounded-2xl bg-gray-300 px-4 py-2 uppercase">
                Caring
              </span>
              <span className="inline-block rounded-2xl bg-gray-300 px-4 py-2 uppercase">
                Get ready to read
              </span>
            </div>
          </div>
        </div>
        {/* rating */}
        <div className="max-w-xl flex-1">
          <div className="mb-10 bg-gray-200 p-6">
            <h2 className="mb-4 font-bold">Rating Distribution</h2>
            {ratingData.map((rating, i) => {
              return (
                <div
                  key={i}
                  className="mb-4 grid grid-cols-[100px_1fr_50px] gap-3"
                >
                  <div className="flex justify-end gap-2">
                    <span className="text-end font-medium capitalize">
                      {rating.name}
                    </span>
                    <span>{rating.value}</span>
                  </div>
                  <span
                    className="w-full rounded-3xl py-3"
                    style={{ background: getBgColor(rating.value) }}
                  ></span>
                  <span>{rating.count}</span>
                </div>
              );
            })}
          </div>
          <div>
            <h3 className="mb-2 font-semibold">
              Check out Similar Professors in the Sociology Department
            </h3>
            <div className="flex flex-col justify-center gap-3 bg-blue-300 p-8 xl:flex-row">
              <div className="flex gap-2">
                <span className="bg-primary p-3 font-bold text-white">5.0</span>
                <h5 className="max-w-[120px]">Alexander Patrick</h5>
              </div>
              <div className="flex gap-2">
                <span className="bg-primary p-3 font-bold text-white">5.0</span>
                <h5 className="max-w-[120px]">Alexander Patrick</h5>
              </div>
              <div className="flex gap-2">
                <span className="bg-primary p-3 font-bold text-white">5.0</span>
                <h5 className="max-w-[120px]">Alexander Patrick</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-14">
        <h2 className="mb-4 text-xl font-bold">
          Student Ratings: Insights from 5 Reviews
        </h2>
        <Dropdown
          value={course}
          onChange={(e) => setCourse(e.value)}
          options={courses}
          optionLabel="name"
          placeholder="Select a City"
          className="w-full  max-w-xs bg-primary font-poppins"
          pt={{
            input: { className: "font-poppins py-3" },
            panel: { className: "bg-primary font-poppins" },
          }}
        />
        {/* ============== */}
        {/* Ratings result */}
        {/* ============== */}
        <div>
          <div className="mb-6 mt-6 flex max-w-4xl flex-col items-start gap-10 bg-background px-6 py-5 sm:flex-row">
            <div>
              <div className="mb-6">
                <p className="text-black">Quality</p>
                <div className="my-2 bg-[#90EE90] px-3 py-4 text-4xl font-extrabold">
                  4.0
                </div>
              </div>
              <div>
                <p className="text-black">Quality</p>
                <div className="my-2 bg-[#FFB6C1] px-3 py-4 text-4xl font-extrabold">
                  1.0
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-xl font-bold">SOC101</h3>
              <div className="my-5 flex gap-4">
                <div className="flex gap-2">
                  <span>For Credit</span>
                  <b>Yes</b>
                </div>
                <div className="className=" flex gap-2>
                  <span>For Credit</span>
                  <b>Yes</b>
                </div>
              </div>
              <p>
                I enjoyed my soc 101 class with this professor. I hadnt taken
                many in person classes since the pandemic, but glad I took this
                one. She engaged a lot with us and cared about our thoughts and
                opinions. She is very nice too. I had fun in the class and still
                learned some cool stuff.
              </p>
              <div className="my-6 flex flex-wrap gap-4">
                <span className="inline-block rounded-2xl bg-gray-300 px-4 py-2 uppercase">
                  Extra credit
                </span>
                <span className="inline-block rounded-2xl bg-gray-300 px-4 py-2 uppercase">
                  Get ready to read
                </span>
                <span className="inline-block rounded-2xl bg-gray-300 px-4 py-2 uppercase">
                  Caring
                </span>
                <span className="inline-block rounded-2xl bg-gray-300 px-4 py-2 uppercase">
                  Get ready to read
                </span>
              </div>
              {/* ============== */}
              {/* rating actions */}
              {/* ============== */}
              <div className="mt-8 flex items-center justify-between">
                <div className="flex gap-4">
                  <Tooltip
                    className="bg-black font-poppins"
                    target=".like"
                    pt={{
                      text: { className: "bg-black" },
                    }}
                  />
                  <Tooltip
                    className="bg-black font-poppins"
                    target=".dislike"
                    pt={{
                      text: { className: "bg-black" },
                    }}
                  />
                  <i
                    className="pi pi-thumbs-up like cursor-pointer text-2xl"
                    data-pr-tooltip="Helpful"
                    data-pr-position="right"
                    data-pr-at="right+5 top"
                    data-pr-my="left center-2"
                  ></i>
                  <i
                    className="pi pi-thumbs-down dislike cursor-pointer text-2xl"
                    data-pr-tooltip="Not helpful"
                    data-pr-position="right"
                    data-pr-at="right+5 top"
                    data-pr-my="left center-2"
                  ></i>
                </div>
                <div className="flex items-center gap-4">
                  <Tooltip
                    className="bg-black font-poppins"
                    target=".share"
                    pt={{
                      text: { className: "bg-black" },
                    }}
                  />
                  <Tooltip
                    className="bg-black font-poppins"
                    target=".report"
                    pt={{
                      text: { className: "bg-black" },
                    }}
                  />
                  <i
                    className="pi pi-share-alt share cursor-pointer text-2xl"
                    data-pr-tooltip="Share this rating"
                    data-pr-position="right"
                    data-pr-at="right+5 top"
                    data-pr-my="left center-2"
                  ></i>
                  <i
                    className="pi pi-flag report cursor-pointer text-2xl"
                    data-pr-tooltip="Report this rating"
                    data-pr-position="right"
                    data-pr-at="right+5 top"
                    data-pr-my="left center-2"
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default DetailPageJob;
