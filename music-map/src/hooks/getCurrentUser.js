import useFetch from "./useFetch";

const useCurrentUser = () => {
    const user = localStorage['user'];
    return (user) ? user : null;
}

export default useCurrentUser;