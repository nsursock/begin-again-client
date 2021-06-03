import React from "react";
import useToggle from "../hooks/ToggleElement";
import PreviewModal from "../components/PreviewModal";
import ProfilePicture from "../components/ProfilePicture";
import OptionsButton from "../components/OptionsButton";
import { toKilo } from "../helpers/utils";

const JobListRow = ({ job, index }) => {
  const { isShowing, toggle } = useToggle();
  const {
    id,
    uid,
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
    <tr key={id} onDoubleClick={toggle}>
      <td class="px-6 py-4 whitespace-nowrap">
        <div class="flex items-center">
          <div class="flex-shrink-0 h-10 w-10">
            <ProfilePicture id={uid} />
          </div>
          <div class="ml-4">
            <div class="text-sm font-medium text-gray-900">{title}</div>
            <div class="text-sm text-gray-500">{experience}</div>
          </div>

          <PreviewModal isShowing={isShowing} hide={toggle} job={job} />
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
        {currency} {toKilo(salaryLow)} - {toKilo(salaryHigh)}
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <OptionsButton jobId={id} userId={uid} />
      </td>
    </tr>
  );
};

export default JobListRow;
