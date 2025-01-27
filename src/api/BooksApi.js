/** @format */

import axios from 'axios';
const url_api = 'http://localhost:3000/';

export const getAllBooks = async () => {
	try {
		const response = await axios.get(url_api + 'libros');
		return response.data;
	} catch (error) {
		throw error;
	}
};
export const getBooksById = async (id) => {
	try {
		const response = await axios.get(url_api + 'libros/'+id);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const PostBooks = async (book) => {
	try {
		const response = await axios.post(url_api + 'libros', book, {
			headers: { 'Content-Type': 'application/json' },
		});
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const EditBooks = async (id,book) => {
	try {
		const response = await axios.put(url_api + 'libros/'+id, book, {
			headers: { 'Content-Type': 'application/json' },
		});
		return response.data;
	} catch (error) {
		throw error;
	}
};
export const DeleteBooksA = async (id) => {
	try {
		const response = await axios.delete(url_api + 'libros/'+id, {
			headers: { 'Content-Type': 'application/json' },
		});
		return response.data;
	} catch (error) {
		throw error;
	}
};
