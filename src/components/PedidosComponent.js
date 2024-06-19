/** @format */

import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import usePedidos from '../hooks/HookPedidos';
import { Table } from 'flowbite-react';
import '../app/globals.css';

const PedidosList = () => {
	const router = useRouter();
	const { userId } = router.query;

	const { pedidos, loading, error } = usePedidos(userId);
    const handleDetPedidosSelect = (orderId) => {
		router.push(`/DetPedidos/${orderId}`);
	};
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error loading pedidos.</p>;

	return (
		<div>
			
				<Table>
					<Table.Head>
						<Table.HeadCell>FechaPedido</Table.HeadCell>
						<Table.HeadCell>CantidadDetallesPedido</Table.HeadCell>
						<Table.HeadCell>TotalPedido</Table.HeadCell>

						<Table.HeadCell>Acciones</Table.HeadCell>
						<Table.HeadCell>
							<span className='sr-only'>Pedidos</span>
						</Table.HeadCell>
					</Table.Head>
					<Table.Body className='divide-y'>
						{pedidos.map((book) => (
							<Table.Row
								key={book.PedidoID}
								className='bg-white dark:border-gray-700 dark:bg-gray-800'
							>
								<Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
									{book.FechaPedido}
								</Table.Cell>
								<Table.Cell>{book.CantidadDetallesPedido}</Table.Cell>
								<Table.Cell>{book.TotalPedido}</Table.Cell>

								<Table.Cell>
									<a
										onClick={() => handleDetPedidosSelect(book.PedidoID)}
										className='font-medium text-cyan-600 hover:underline dark:text-cyan-500'
									>
										Detalles
									</a>
								</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
				</Table>
		
		</div>
	);
};

export default PedidosList;
