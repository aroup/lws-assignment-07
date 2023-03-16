import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { changeJob } from "../features/jobsSlice";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";

// TODO: move to common files
// TODO: move edit into add job maybe?
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

export default function EditJob() {
  const { id: editIdx = -1 } = useParams();
  const navigate = useNavigate();
  const { jobs } = useAppSelector((state) => state.jobs);
  const currentJob = jobs.find((j) => j.id === Number(editIdx));
  const { title: t, salary: s, deadline: d, type: ty } = currentJob || {};

  const [title, setTitle] = React.useState(t);
  const [salary, setSalary] = React.useState(s);
  const [deadline, setDeadline] = React.useState(d);
  const [type, setType] = React.useState(ty);
  const dispatch = useAppDispatch();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch(
      changeJob({
        id: Number(editIdx),
        data: {
          title,
          salary,
          deadline,
          type,
        },
      })
    );
    navigate("/jobs");
  }

  return (
    <div className="lg:pl-[14rem] mt-[5.8125rem]">
      <main className="max-w-3xl rounded-lg mx-auto relative z-20 p-10 xl:max-w-none bg-[#1E293B]">
        <h1 className="mb-10 text-center lws-section-title">Edit Job</h1>

        <div className="max-w-3xl mx-auto">
          <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
            <div className="fieldContainer">
              <label
                htmlFor="lws-JobTitle"
                className="text-sm font-medium text-slate-300"
              >
                Job Title
              </label>
              <select
                value={title}
                id="lws-JobTitle"
                name="lwsJobTitle"
                required
                onChange={(e) => setTitle(e.target.value)}
              >
                <option value="" hidden selected>
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
                value={type}
                id="lws-JobType"
                name="lwsJobType"
                required
              >
                <option value="" hidden selected>
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
                  className="!rounded-l-none !border-0"
                  placeholder="20,00,000"
                  onChange={(e) => setSalary(e.target.value)}
                />
              </div>
            </div>

            <div className="fieldContainer">
              <label htmlFor="lws-JobDeadline">Deadline</label>
              <input
                type="date"
                name="lwsJobDeadline"
                id="lws-JobDeadline"
                required
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </div>

            <div className="text-right">
              <button
                type="submit"
                id="lws-submit"
                className="cursor-pointer btn btn-primary w-fit"
              >
                Edit
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
