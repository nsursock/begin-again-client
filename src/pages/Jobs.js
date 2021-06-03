import React, { useState, useEffect, useCallback } from "react";
import useSortableData from "../hooks/SortableData";
import useFilterableData from "../hooks/FilterableData";
import usePaginableData from "../hooks/PaginableData";
import useToggle from "../hooks/ToggleElement";
import HeaderButton from "../components/HeaderButton";
import TableBar from "../components/TableBar";
import FilterSlideOver from "../components/FilterSlideOver";
import JobListRow from "../components/JobListRow";
import { db } from "../services/firebase";

const Jobs = () => {
  const [jobsRaw, setJobsRaw] = useState([]);
  const [error, setError] = useState(null);

  const { filteredItems, requestFilter } = useFilterableData(jobsRaw, {
    key: "",
    fields: [
      "title",
      "description",
      "location",
      "schedule",
      "closingDate",
      "experience",
    ],
  });

  const transformRole = (title, experience) => {
    return title + experience;
  };

  const {
    sortedItems,
    requestSort,
    sortConfig,
  } = useSortableData(filteredItems, null, [
    { field: "role", func: transformRole },
  ]);
  const { paginatedItems, requestPage, pageConfig } = usePaginableData(
    sortedItems,
    {
      selectedPage: 0,
      pageSize: 10,
    }
  );

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      try {
        await db.ref("jobs").on("value", (snapshot) => {
          let jobs = [];
          let index = 0; // bug (doc, index) gives undefined wtf
          snapshot.forEach((doc) => {
            let record = doc.val();
            record.id = Object.keys(snapshot.val())[index];
            jobs.push(record);
            index++;
          });
          setJobsRaw(jobs);
        });
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  const { isShowing, toggle } = useToggle();
  return (
    <div class="my-8">
      <div class="md:grid md:grid-cols-4 md:gap-6 divide divide-x">
        <div class="mt-5 md:mt-0 md:col-span-4">
          <div class="flex flex-col">
            <div class="-my-2 overflow-x-auto">
              <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                      <tr>
                        <HeaderButton
                          caption="Role"
                          keys="title"
                          config={sortConfig}
                          requestSort={requestSort}
                        />
                        <HeaderButton
                          caption="Terms"
                          keys="location"
                          config={sortConfig}
                          requestSort={requestSort}
                        />
                        <HeaderButton
                          caption="Closing"
                          keys="closingDate"
                          config={sortConfig}
                          requestSort={requestSort}
                        />
                        <HeaderButton
                          caption="Salary"
                          keys="salaryLow"
                          config={sortConfig}
                          requestSort={requestSort}
                        />
                        <th scope="col">
                          <span class="sr-only">Search</span>
                          <button
                            onClick={toggle}
                            className="focus:outline-none flex items-center justify-end w-full px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            type="button"
                          >
                            Search
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="h-5 w-5 ml-2"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          </button>
                        </th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                      {paginatedItems.map((job, index) => {
                        return <JobListRow job={job} index={index} />;
                      })}
                    </tbody>
                  </table>
                  {filteredItems.length !== 0 && (
                    <TableBar
                      numJobs={filteredItems.length}
                      config={pageConfig}
                      requestPage={requestPage}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <FilterSlideOver
          isShowing={isShowing}
          hide={toggle}
          requestFilter={requestFilter}
          requestPage={requestPage}
          pageConfig={pageConfig}
        />
      </div>
    </div>
  );
};

export default Jobs;
