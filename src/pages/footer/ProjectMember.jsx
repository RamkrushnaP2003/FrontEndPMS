import React from "react";
import { map } from "zod";

const ProjectMember = () => {
  const members = [
    { name: "Ramkrushna Parkipandla", prn: "2262191242515" },
    { name: "Vinay Thisake", prn: "2262191242514" },
    { name: "Mahalappa Waghmode", prn: "2262191242512" },
    { name: "Ganesh Kamble", prn: "2262191242511" },
    { name: "Mayur Macharla", prn: "2262191242508" },
  ];

  const guide = [
    { name: "Prof.A.R. Gyanbote", designation: "Guide" },
    { name: "Prof.A.R. Gyanbote", designation: "HOD-CSE" },
    { name: "Dr. Anil Deshmane", designation: "Principal" },
  ];

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-150">
        <p className="font-semibold text-center">Submitted By:</p>
        <div className="6/12">
          {members.map((member, idx) => (
            <div className="flex flex-row">
              <div key={idx + " " + idx} className="w-100 mt-2">
                <p className="font-semibold">{member.name}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-950">
                  {"PRN No : " + member.prn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-8/12 flex flex-wrap items-center justify-between h-4 mt-12 font-medium">
        {guide.map((m, idx) => (
          <div className="4/12" key={idx + m}>
            <p className="">{m.name}</p>
            <p className="">{m.designation}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectMember;
