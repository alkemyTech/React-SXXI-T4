import axios from "axios";

const getActivities = async (search = "", amountToShow = 5, page = 0) => {
	const response = { data: {}, error: null };
	try {
		const { data } = await axios.get(
			`https://ongapi.alkemy.org/api/activities?search=${search}&limit=${amountToShow}&skip=${
				amountToShow * page
			}`
		);
		response.data = data.data;
	} catch (error) {
		response.error = error;
	}
	return response;
};

const getAmountOfActivities = async (search = "") => {
	const response = { data: {}, error: null };
	try {
		const { data } = await axios.get(
			`https://ongapi.alkemy.org/api/activities?search=${search}`
		);
		response.data = data.data.length;
	} catch (error) {
		response.error = error;
	}
	return response;
};

const deleteActivity = async id => {
	const response = { data: {}, error: null };
	try {
		const { data } = await axios.delete(
			`https://ongapi.alkemy.org/api/activities/${id}`
		);
		response.data = data.data;
	} catch (error) {
		response.error = error;
	}
	return response;
};

export { getActivities, getAmountOfActivities, deleteActivity };
