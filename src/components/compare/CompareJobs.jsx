import { useEffect, useState } from "react";
import Button from "../../ui/Button";
import { getBgColor } from "../../utils/calcBgColor";
import { Chart } from "primereact/chart";

const ratingData = [
  { name: "awesome", value: 5, count: 1 },
  { name: "great", value: 4, count: 1 },
  { name: "good", value: 3, count: 4 },
  { name: "ok", value: 2, count: 6 },
  { name: "awful", value: 1, count: 4 },
];

function CompareJobs() {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const data = {
      labels: ["A", "B", "C"],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: [
            documentStyle.getPropertyValue("--blue-500"),
            documentStyle.getPropertyValue("--yellow-500"),
            documentStyle.getPropertyValue("--green-500"),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue("--blue-400"),
            documentStyle.getPropertyValue("--yellow-400"),
            documentStyle.getPropertyValue("--green-400"),
          ],
        },
      ],
    };
    const options = {
      cutout: "80%",
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, []);
  return (
    <main className="xl:container mx-auto px-4 py-16">
      <div className="flex flex-wrap justify-between gap-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold">Compare Jobs</h1>
        <div className="flex flex-wrap gap-4">
          <div>
            <Button type="primary" text="Reset" />
          </div>
          <div>
            <Button type="primary" text="Share Comparison" />
          </div>
        </div>
      </div>
      <input
        type="text"
        className="my-5 w-full max-w-sm rounded-[34px] border border-gray-200 bg-gray-100 py-3 pl-3 text-sm font-medium placeholder-gray-500 focus:border-gray-400 focus:bg-white focus:outline-none"
        placeholder="Job"
      />
      <div className="grid lg:max-w-4xl lg:grid-cols-2 gap-6 bg-background p-6">
        {/* ======= */}
        {/* 01 */}
        {/* ======= */}
        <div>
          <div className="mb-6 bg-white p-4 text-center">
            <div
              className="mx-auto my-2 max-w-max px-3 py-4 text-4xl font-extrabold"
              style={{ background: getBgColor(1) }}
            >
              1.0
            </div>
            <p className="font-semibold">Overall</p>
            <p className="mb-6">
              <span>1 </span>
              Rating
            </p>
            <h3 className="text-xl font-extrabold">ABC Institue</h3>
          </div>
          <div className="mb-6 bg-white p-4">
            {ratingData.map((rating, i) => {
              return (
                <div className="mb-4 lg:mb-8 flex flex-col sm:flex-row items-center gap-4" key={i}>
                  <div className="grid grid-cols-[repeat(5,40px)] sm:grid-cols-[repeat(5,57px)] grid-rows-[18px] gap-[2px]">
                    {Array.from({ length: 5 }, (_, index) => {
                      {
                        if (index + 1 > rating.value)
                          return (
                            <span
                              key={index}
                              className={`bg-gray-400 ${
                                index === 0
                                  ? "rounded-bl-md rounded-tl-md"
                                  : index === 4
                                    ? "rounded-br-md rounded-tr-md"
                                    : ""
                              }`}
                            ></span>
                          );
                        else
                          return (
                            <span
                              key={index}
                              className={`bg-primary ${
                                index === 0
                                  ? "rounded-bl-md rounded-tl-md"
                                  : index === 4
                                    ? "rounded-br-md rounded-tr-md"
                                    : ""
                              }`}
                            ></span>
                          );
                      }
                    })}
                  </div>
                  <span
                    className="hidden sm:inline-block h-3 min-h-[12px] w-3 min-w-[12px] rounded-full"
                    style={{ background: getBgColor(rating.value) }}
                  ></span>
                  <h6 className="font-bold">{rating.value}</h6>
                  <span>({rating.count})</span>
                </div>
              );
            })}
          </div>
          <div className="mb-6 bg-white p-4 text-center">
            <p className="mb-3">Level of Difficulty</p>
            <h6 className="text-3xl font-bold">2.3</h6>
          </div>
          <div className="mb-6 bg-white p-4 text-center">
            <p className="mb-3">Would Take Again</p>
            <h6 className="text-3xl font-bold">100%</h6>
          </div>
          <div className="mb-6 bg-white p-4 text-center">
            <p className="mb-3">Taken for Credit</p>
            <Chart
              type="doughnut"
              data={chartData}
              options={chartOptions}
              className="mx-auto max-w-[250px]"
            />
          </div>
          <div className="bg-white p-4 text-center">
            <p className="mb-3">Mandatory Attendance</p>
            <Chart
              type="doughnut"
              data={chartData}
              options={chartOptions}
              className="mx-auto max-w-[250px]"
            />
          </div>
        </div>
        {/* ======= */}
        {/* 02 */}
        {/* ======= */}
        <div>
          <div className="mb-6 bg-white p-4 text-center">
            <div
              className="mx-auto my-2 max-w-max px-3 py-4 text-4xl font-extrabold"
              style={{ background: getBgColor(1) }}
            >
              1.0
            </div>
            <p className="font-semibold">Overall</p>
            <p className="mb-6">
              <span>1 </span>
              Rating
            </p>
            <h3 className="text-xl font-extrabold">ABC Institue</h3>
          </div>
          <div className="mb-6 bg-white p-4">
            {ratingData.map((rating, i) => {
              return (
                <div className="mb-4 lg:mb-8 flex flex-col sm:flex-row items-center gap-4" key={i}>
                  <div className="grid grid-cols-[repeat(5,40px)] sm:grid-cols-[repeat(5,57px)] grid-rows-[18px] gap-[2px]">
                    {Array.from({ length: 5 }, (_, index) => {
                      {
                        if (index + 1 > rating.value)
                          return (
                            <span
                              key={index}
                              className={`bg-gray-400 ${
                                index === 0
                                  ? "rounded-bl-md rounded-tl-md"
                                  : index === 4
                                    ? "rounded-br-md rounded-tr-md"
                                    : ""
                              }`}
                            ></span>
                          );
                        else
                          return (
                            <span
                              key={index}
                              className={`bg-primary ${
                                index === 0
                                  ? "rounded-bl-md rounded-tl-md"
                                  : index === 4
                                    ? "rounded-br-md rounded-tr-md"
                                    : ""
                              }`}
                            ></span>
                          );
                      }
                    })}
                  </div>
                  <span
                    className="hidden sm:inline-block min-h-[12px] min-w-[12px] rounded-full"
                    style={{ background: getBgColor(rating.value) }}
                  ></span>
                  <h6 className="font-bold">{rating.value}</h6>
                  <span>({rating.count})</span>
                </div>
              );
            })}
          </div>
          <div className="mb-6 bg-white p-4 text-center">
            <p className="mb-3">Level of Difficulty</p>
            <h6 className="text-3xl font-bold">2.3</h6>
          </div>
          <div className="mb-6 bg-white p-4 text-center">
            <p className="mb-3">Would Take Again</p>
            <h6 className="text-3xl font-bold">100%</h6>
          </div>
          <div className="mb-6 bg-white p-4 text-center">
            <p className="mb-3">Taken for Credit</p>
            <Chart
              type="doughnut"
              data={chartData}
              options={chartOptions}
              className="mx-auto max-w-[250px]"
            />
          </div>
          <div className="bg-white p-4 text-center">
            <p className="mb-3">Mandatory Attendance</p>
            <Chart
              type="doughnut"
              data={chartData}
              options={chartOptions}
              className="mx-auto max-w-[250px]"
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default CompareJobs;
