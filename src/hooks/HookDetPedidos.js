/** @format */

import { useEffect, useState } from 'react';
import { getAllDetPedidosXpedido } from '../api/PedidosApi';

const useDetPedidos = (pedidoId) => {
	const [detpedidos, setDetPedidos] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchDetPedidos = async () => {
			try {
				const data = await getAllDetPedidosXpedido(pedidoId);
				console.log('pedidos', data);
				setDetPedidos(data.Data);
			} catch (err) {
				setError(err);
			} finally {
				setLoading(false);
			}
		};

		if (pedidoId) {
			fetchDetPedidos();
		}
	}, [pedidoId]);

	return { detpedidos, loading, error };
};

export default useDetPedidos;
