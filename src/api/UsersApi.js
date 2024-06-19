import axios from 'axios';
const url_api = 'http://localhost:3000/';

export const getAllUsers = async () => {
	try {
		const response = await axios.get(url_api + 'usuarios');
		return response.data;
	} catch (error) {
		throw error;
	}
};