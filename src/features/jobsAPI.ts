import axios from "../utils/axios";

import { Job, JobPostData, JobPutData } from "../types/job";

export const getJobs = async () => {
  const response = await axios.get("/jobs");

  return response.data as Job[];
};

export const addJob = async (data: JobPostData) => {
  const response = await axios.post("/jobs", data);

  return response.data as Job;
};

export const editJob = async (id: number, data: Partial<Job>) => {
  const response = await axios.put(`/jobs/${id}`, data);

  return response.data as Job;
};

export const deleteJob = async (id: number) => {
  const response = await axios.delete(`/jobs/${id}`);

  return response.data as {};
};
