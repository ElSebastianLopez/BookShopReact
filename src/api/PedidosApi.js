import axios from 'axios';
const url_api = 'http://localhost:3000/';

export const getAllPedidosxUser = async (idUser) => {
	try {
		const response = await axios.get(url_api + 'pedidos/'+idUser);
		console.log("RespuestaApiPedidos",response)
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const getAllDetPedidosXpedido = async (idPedido) => {
	try {
		const response = await axios.get(url_api + 'pedidos/DetPedidos/'+idPedido);
		return response.data;
	} catch (error) {
		throw error;
	}
};