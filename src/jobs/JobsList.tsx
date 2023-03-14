import React from "react";
import { fetchJobs } from "../features/jobsSlice";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import JobFilter from "./JobFilter";
import SingleJob from "./SingleJob";

export default function JobsList() {
  const { jobs, isLoading, isError } = useAppSelector((state) => state.jobs);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(fetchJobs());
  }, []);

  let content = null;
  if (isLoading) content = <p>Loading...</p>;

  if (!isLoading && isError)
    content = <p className="error">There was an error occured</p>;

  if (!isLoading && !isError && jobs?.length > 0) {
    content = jobs.map((job) => <SingleJob key={job.id} job={job} />);
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
