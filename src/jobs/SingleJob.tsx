import React from "react";
import { useNavigate } from "react-router-dom";
import { editActive, removeJob } from "../features/jobsSlice";
import { useAppDispatch } from "../hooks/redux-hooks";
import { Job } from "../types/job";

interface SingleJobProps {
  job: Job;
}

export default function SingleJob({ job }: SingleJobProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { title, salary, deadline, type, id } = job;
  function handleDelete() {
    dispatch(removeJob(id));
  }

  function handleEdit() {
    dispatch(editActive(id));
    navigate(`/jobs/${id}`);
  }

  function getColor() {
    switch (type) {
      case "Full Time":
        return "#FF8A00";
      case "Internship":
        return "#FF5757";
      case "Remote":
        return "#56E5C4";
    }
  }
  return (
    <div className="lws-single-job">
      <div className="flex-1 min-w-0">
        <h2 className="lws-title">{title}</h2>
        <div className="job-footers">
          <div className="lws-type">
            <i
              className={`fa-solid fa-stop !text-[${getColor()}] text-lg mr-1.5`}
            ></i>
            {type}
          </div>
          <div className="lws-salary">
            <i className="fa-solid fa-bangladeshi-taka-sign text-slate-400 text-lg mr-1.5"></i>
            BDT {salary}
          </div>
          <div className="lws-deadline">
            <i className="fa-regular fa-calendar text-slate-400 text-lg mr-1.5"></i>
            Closing on {deadline}
          </div>
        </div>
      </div>
      <div className="mt-5 flex lg:mt-0 lg:ml-4">
        <span className="hidden sm:block">
          <button
            onClick={handleEdit}
            type="button"
            className="lws-edit btn btn-primary"
          >
            <i className="fa-solid fa-pen text-gray-300 -ml-1 mr-2"></i>
            Edit
          </button>
        </span>

        <span className="sm:ml-3">
          <button
            onClick={handleDelete}
            type="button"
            className="lws-delete btn btn-danger "
          >
            <i className="fa-solid fa-trash text-gray-300 -ml-1 mr-2"></i>
            Delete
          </button>
        </span>
      </div>
    </div>
  );
}
