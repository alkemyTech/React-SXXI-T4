export const verifyTokenLocalStorage = () => {
	const token = localStorage.getItem("token");
	return token && { headers: { Authorization: `Bearer ${token}` } };
};
