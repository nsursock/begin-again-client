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
        class="h-10 w-10 animate-spin-slow mr-2 text-indigo-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    );
  if (error)
    return (
      <svg
        class="w-10 h-10 text-indigo-600"
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
    // const token = localStorage.getItem("token");
    // data.users.photoUrl + (token !== null ? `?access_token=${token}` : "")
    return (
      <img class="h-10 w-10 rounded-full" src={data.users.photoUrl} alt="" />
    );
  } else
    return (
      <span class="inline-block h-10 w-10 rounded-full overflow-hidden bg-indigo-100">
        <svg
          class="h-full w-full text-indigo-300"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      </span>
    );
};

export default ProfilePicture;
