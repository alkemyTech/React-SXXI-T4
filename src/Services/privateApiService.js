export const getAuthorization = () => {
	const token = localStorage.getItem("token");
	return token && `Bearer ${token?token:""}`;
};
