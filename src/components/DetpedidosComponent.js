/** @format */

import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import useDetPedidos from '../hooks/HookDetPedidos';
import { Table } from 'flowbite-react';
import '../app/globals.css';

const DetPedidosList = () => {
	const router = useRouter();
	const { orderId } = router.query;

	const { detpedidos, loading, error } = useDetPedidos(orderId);
    console.log("Detpedidos",detpedidos)

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error loading pedidos.</p>;

	return (
		<div>
			<Table>
				<Table.Head>
					<Table.HeadCell>Titulo</Table.HeadCell>
					<Table.HeadCell>FechaPedido</Table.HeadCell>
					<Table.HeadCell>Autor</Table.HeadCell>
					<Table.HeadCell>Cantidad</Table.HeadCell>
					<Table.HeadCell>Precio Libro</Table.HeadCell>
					<Table.HeadCell>Total</Table.HeadCell>
				</Table.Head>
				<Table.Body className='divide-y'>
					{detpedidos.map((book) => (
						<Table.Row
							key={book.DetallePedidoID}
							className='bg-white dark:border-gray-700 dark:bg-gray-800'
						>
							<Table.Cell>{book.Titulo}</Table.Cell>
							<Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
								{book.FechaPedido}
							</Table.Cell>
                            <Table.Cell>{book.Autor}</Table.Cell>
                            <Table.Cell>{book.Cantidad}</Table.Cell>
							<Table.Cell>{book.PrecioLibro}</Table.Cell>
							<Table.Cell>{book.Precio}</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table>
		</div>
	);
};

export default DetPedidosList;
