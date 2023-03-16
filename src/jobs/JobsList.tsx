import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchJobs } from "../features/jobsSlice";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { Job } from "../types/job";
import JobFilter from "./JobFilter";
import SingleJob from "./SingleJob";

function getServerType(type: string | undefined) {
  if (type === "fulltime") {
    return "Full Time";
  } else if (type === "internship") {
    return "Internship";
  } else if (type === "remote") {
    return "Remote";
  }
  return "";
}

export default function JobsList() {
  const { type } = useParams();
  const serverType = getServerType(type);
  const { searchInput, sortOrder } = useAppSelector((state) => state.filters);

  const { jobs, isLoading, isError } = useAppSelector((state) => state.jobs);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(fetchJobs());
  }, []);

  function filterByType(job: Job) {
    if (serverType === "") return false;
    return job.type === serverType;
  }

  function filterBySearch(job: Job) {
    if (searchInput === "") return false;
    return job.title.toLowerCase().includes(searchInput.toLowerCase());
  }

  function sortBySortOrder(a: Job, b: Job) {
    if (sortOrder === "asc") {
      if (Number(a.salary) < Number(b.salary)) return -1;
      if (Number(a.salary) > Number(b.salary)) return 1;
      return 0;
    }
    if (sortOrder === "desc") {
      if (Number(b.salary) < Number(a.salary)) return -1;
      if (Number(b.salary) > Number(a.salary)) return 1;
      return 0;
    }
  }

  let content = null;
  if (isLoading) content = <p>Loading...</p>;

  if (!isLoading && isError)
    content = <p className="error">There was an error occured</p>;

  if (!isLoading && !isError && jobs?.length > 0) {
    let copiedJobs = jobs;
    if (serverType !== "") {
      copiedJobs = copiedJobs.filter(filterByType);
    }
    if (searchInput !== "") {
      copiedJobs = copiedJobs.filter(filterBySearch);
    }
    if (sortOrder !== "") {
      console.log(sortOrder);
      copiedJobs = [...copiedJobs].sort(sortBySortOrder);
    }

    content = copiedJobs.map((job) => <SingleJob key={job.id} job={job} />);
  }

  if (!isLoading && !isError && jobs?.length === 0) {
    content = <p>No jobs found!</p>;
  }

  return (
    <div className="lg:pl-[14rem]  mt-[5.8125rem]">
      <main className="max-w-3xl rounded-lg  mx-auto relative z-20 p-10 xl:max-w-none bg-[#1E293B]">
        <JobFilter />
        <div className="jobs-list">{content}</div>
      </main>
    </div>
  );
}
