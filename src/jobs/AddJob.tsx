import React from "react";
import { createJob } from "../features/jobsSlice";
import { useAppDispatch } from "../hooks/redux-hooks";

// TODO: move titles to a common file
// TODO: Edit/Add same page maybe?
const titles = [
  "Software Engineer",
  "Software Developer",
  "Full Stack Developer",
  "MERN Stack Developer",
  "DevOps Engineer",
  "QA Engineer",
  "Product Manager",
  "Social Media Manager",
  "Senior Executive",
  "Junior Executive",
  "Android App Developer",
  "IOS App Developer",
  "Frontend Developer",
  "Frontend Engineer",
];

export default function AddJob() {
  const [title, setTitle] = React.useState("");
  const [type, setType] = React.useState("");
  const [salary, setSalary] = React.useState("");
  const [deadline, setDeadline] = React.useState("");
  const dispatch = useAppDispatch();

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch(
      createJob({
        title,
        type,
        salary,
        deadline,
      })
    );

    setTitle("");
    setType("");
    setSalary("");
    setDeadline("");
  }
  return (
    <div className="lg:pl-[14rem] mt-[5.8125rem]">
      <main className="max-w-3xl rounded-lg mx-auto relative z-20 p-10 xl:max-w-none bg-[#1E293B]">
        <h1 className="mb-10 text-center lws-section-title">Add New Job</h1>

        <div className="max-w-3xl mx-auto">
          <form onSubmit={(e) => handleFormSubmit(e)} className="space-y-6">
            <div className="fieldContainer">
              <label
                htmlFor="lws-JobTitle"
                className="text-sm font-medium text-slate-300"
              >
                Job Title
              </label>
              <select
                onChange={(e) => setTitle(e.target.value)}
                id="lws-JobTitle"
                name="lwsJobTitle"
                required
                value={title}
                defaultValue={""}
              >
                <option value="" hidden>
                  Select Job
                </option>
                {titles.map((t) => (
                  <option value={t} key={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div className="fieldContainer">
              <label htmlFor="lws-JobType">Job Type</label>
              <select
                onChange={(e) => setType(e.target.value)}
                id="lws-JobType"
                name="lwsJobType"
                required
                defaultValue={""}
                value={type}
              >
                <option value="" hidden>
                  Select Job Type
                </option>
                <option value="Full Time">Full Time</option>
                <option value="Internship">Internship</option>
                <option value="Remote">Remote</option>
              </select>
            </div>

            <div className="fieldContainer">
              <label htmlFor="lws-JobSalary">Salary</label>
              <div className="flex border rounded-md shadow-sm border-slate-600">
                <span className="input-tag">BDT</span>
                <input
                  type="number"
                  name="lwsJobSalary"
                  id="lws-JobSalary"
                  required
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  className="!rounded-l-none !border-0"
                  placeholder="20,00,000"
                />
              </div>
            </div>

            <div className="fieldContainer">
              <label htmlFor="lws-JobDeadline">Deadline</label>
              <input
                type="date"
                name="lwsJobDeadline"
                id="lws-JobDeadline"
                onChange={(e) => setDeadline(e.target.value)}
                required
                value={deadline}
              />
            </div>

            <div className="text-right">
              <button
                type="submit"
                id="lws-submit"
                className="cursor-pointer btn btn-primary w-fit"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
