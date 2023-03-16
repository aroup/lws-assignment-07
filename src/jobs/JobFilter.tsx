import React from "react";
import { editSearchInput, editSortOrder } from "../features/filtersSlice";
import { useAppDispatch } from "../hooks/redux-hooks";

export default function JobFilter() {
  const [searchInput, setSearchInput] = React.useState("");
  const [sortOrder, setSortOrder] = React.useState("");
  const dispatch = useAppDispatch();

  function handleSearchInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchInput(event.target.value);
    dispatch(editSearchInput(event.target.value));
  }

  function handleSortOrderChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSortOrder(event.target.value);
    dispatch(editSortOrder(event.target.value));
  }

  return (
    <div className="md:flex space-y-2 md:space-y-0 justify-between mb-10 ">
      <h1 className="lws-section-title">All Available Jobs</h1>
      <div className="flex gap-4">
        <div className="search-field group flex-1">
          <i className="fa-solid fa-magnifying-glass search-icon group-focus-within:text-blue-500"></i>
          <input
            type="text"
            placeholder="Search Job"
            className="search-input"
            id="lws-searchJob"
            value={searchInput}
            onChange={(e) => handleSearchInputChange(e)}
          />
        </div>
        <select
          id="lws-sort"
          name="sort"
          autoComplete="sort"
          className="flex-1"
          value={sortOrder}
          onChange={(e) => handleSortOrderChange(e)}
        >
          <option value="">Default</option>
          <option value="asc">Salary (Low to High)</option>
          <option value="desc">Salary (High to Low)</option>
        </select>
      </div>
    </div>
  );
}
