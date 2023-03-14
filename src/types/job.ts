export type Job = {
  title: string;
  type: string;
  salary: string;
  deadline: string;
  id: number;
};

export type JobsInitialState = {
  jobs: Job[];
  isLoading: boolean;
  isError: boolean;
  error: string;
  editing: number;
};

export type JobPostData = Omit<Job, "id">;

export type JobPutData = {
  id: string;
  data: Partial<Job>;
};
