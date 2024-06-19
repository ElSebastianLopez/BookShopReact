/** @format */

import { useEffect, useState } from 'react';
import { getAllPedidosxUser } from '../api/PedidosApi';

const usePedidos = (userId) => {
	const [pedidos, setPedidos] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchPedidos = async () => {
			try {
				const data = await getAllPedidosxUser(userId);
				console.log('pedidos', data);
				setPedidos(data.Data);
			} catch (err) {
				setError(err);
			} finally {
				setLoading(false);
			}
		};

		if (userId) {
			fetchPedidos();
		}
	}, [userId]);

	return { pedidos, loading, error };
};

export default usePedidos;
