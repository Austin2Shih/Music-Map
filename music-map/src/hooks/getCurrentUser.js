const useCurrentUser = () => {
    const user = localStorage['user'];
    return (user) ? JSON.parse(user) : null;
}

export default useCurrentUser;