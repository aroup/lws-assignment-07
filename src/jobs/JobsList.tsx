import React from "react";
import JobFilter from "./JobFilter";
import SingleJob from "./SingleJob";

export default function JobsList() {
  return (
    <div className="lg:pl-[14rem]  mt-[5.8125rem]">
      <main className="max-w-3xl rounded-lg  mx-auto relative z-20 p-10 xl:max-w-none bg-[#1E293B]">
        <JobFilter />
        <div className="jobs-list">
          <SingleJob />
        </div>
      </main>
    </div>
  );
}
