import React, { useState, useEffect, useCallback } from "react";
import useSortableData from "../hooks/SortableData";
import useFilterableData from "../hooks/FilterableData";
import usePaginableData from "../hooks/PaginableData";
import HeaderButton from "../components/HeaderButton";
import TableBar from "../components/TableBar";
import { Link } from "react-router-dom";
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
  const { sortedItems, requestSort, sortConfig } = useSortableData(
    filteredItems
  );
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

  // function getPhotoUrl(uid) {
  //   auth()
  //     .getUser(uid)
  //     .then((userRecord) => {
  //       alert(userRecord.photoURL);
  //       return userRecord.photoURL;
  //     })
  //     .catch((error) => {
  //       setError("Error fetching user data: " + error.message);
  //     });
  // }

  const renderTableData = useCallback((jobs) => {
    return jobs.map((job, index) => {
      const {
        id,
        title,
        experience,
        schedule,
        location,
        salaryLow,
        salaryHigh,
        currency,
        closingDate,
      } = job;
      return (
        <tr key={id}>
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex items-center">
              <div class="flex-shrink-0 h-10 w-10">
                <img
                  class="h-10 w-10 rounded-full"
                  src="https://thispersondoesnotexist.com/image"
                  alt=""
                />
              </div>
              <div class="ml-4">
                <div class="text-sm font-medium text-gray-900">{title}</div>
                <div class="text-sm text-gray-500">{experience}</div>
              </div>
            </div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm text-gray-900">{location}</div>
            <div class="text-sm text-gray-500">{schedule}</div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
              {closingDate}
            </span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {currency} {salaryLow} - {salaryHigh}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <Link
              class="text-indigo-600 hover:text-indigo-900"
              to={`/jobs/${id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Details</span>
            </Link>
          </td>
        </tr>
      );
    });
  }, []);

  return (
    <div class="my-8">
      <div class="md:grid md:grid-cols-4 md:gap-6">
        <div class="mt-5 md:mt-0 md:col-span-3">
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
                        <th scope="col" class="relative px-6 py-3">
                          <span class="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                      {renderTableData(paginatedItems)}
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
        <div class="mt-5 md:mt-0 md:col-span-1 mr-8">
          <div class="shadow sm:rounded-md sm:overflow-hidden">
            <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
              <div>
                <label for="filter" class="text-sm font-medium text-gray-700">
                  Search
                </label>
                <div class="mt-1 relative rounded-md shadow-sm">
                  <input
                    onInput={(event) => {
                      requestFilter(event.target.value);
                      requestPage(0, pageConfig.pageSize);
                    }}
                    type="text"
                    name="search"
                    id="search"
                    class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Filter"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
