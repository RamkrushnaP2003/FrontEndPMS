// import { Doughnut } from "react-chartjs-2";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// ChartJS.register(ArcElement, Tooltip, Legend);

// const IssueDonut = ({ issues }) => {
//   const issueCounts = {
//     todo: issues.filter((i) => i.status === "pending").length,
//     inProgress: issues.filter((i) => i.status === "in-progress").length,
//     done: issues.filter((i) => i.status === "done").length,
//   };

//   console.log(issueCounts);

//   const data = {
//     labels: ["To-Do", "In Progress", "Done"],
//     datasets: [
//       {
//         data: [issueCounts.todo, issueCounts.inProgress, issueCounts.done],
//         backgroundColor: [
//           "rgb(255, 99, 132)",
//           "rgb(255, 205, 86)",
//           "rgb(75, 192, 192)",
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };

//   return (
//     <div className="w-6/12 h-[260px] border flex items-center justify-center">
//       <div className="w-[200px] h-[200px]">
//         <Doughnut data={data} />
//       </div>
//     </div>
//   );
// };

// export default IssueDonut;

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const IssueDonut = ({ issues }) => {
  const issueCounts = {
    todo: issues.filter((i) => i.status === "pending").length,
    inProgress: issues.filter((i) => i.status === "in-progress").length,
    done: issues.filter((i) => i.status === "done").length,
  };

  const total =
    issueCounts.todo + issueCounts.inProgress + issueCounts.done || 1;

  const labels = [
    { label: "To-Do", color: "rgb(255, 99, 132)", count: issueCounts.todo },
    {
      label: "In-Progress",
      color: "rgb(255, 205, 86)",
      count: issueCounts.inProgress,
    },
    { label: "Done", color: "rgb(75, 192, 192)", count: issueCounts.done },
  ];

  const data = {
    labels: labels.map((l) => l.label),
    datasets: [
      {
        data: labels.map((l) => l.count),
        backgroundColor: labels.map((l) => l.color),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false, // disables built-in labels/legend
      },
    },
  };

  return (
    <div className="flex items-center p-4">
      {/* Doughnut Left */}
      <div className="w-[225px] h-[225px]">
        <Doughnut data={data} options={options} />
      </div>

      {/* Labels Right */}
      <div className="flex justify-end flex-col gap-3 ml-8">
        {labels.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: item.color }}
            ></div>
            <span className="text-sm font-medium">{item.label}</span>
            <span className="text-sm text-gray-600 ml-auto">
              {((item.count / total) * 100).toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IssueDonut;
