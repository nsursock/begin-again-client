import { gql, useQuery } from "@apollo/client";

const ProfilePicture = ({ id }) => {
  const GET_USER_INFO = gql`
    query getUserInfo($id: String!) {
      users(id: $id) {
        displayName
        photoUrl
        email
        password
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_USER_INFO, {
    variables: { id },
  });

  if (loading)
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-10 w-10 animate-spin-slow mr-2"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
          clip-rule="evenodd"
        />
      </svg>
    );
  if (error)
    return (
      <svg
        class="w-10 h-10"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
    );
  if (data.users && data.users.photoUrl) {
    const token = localStorage.getItem("token");
    return (
      <img
        class="h-10 w-10 rounded-full"
        src={
          data.users.photoUrl + (token !== null ? `?access_token=${token}` : "")
        }
        alt=""
      />
    );
  } else
    return (
      <span class="inline-block h-10 w-10 rounded-full overflow-hidden bg-gray-100">
        <svg
          class="h-full w-full text-gray-300"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      </span>
    );
};

export default ProfilePicture;
