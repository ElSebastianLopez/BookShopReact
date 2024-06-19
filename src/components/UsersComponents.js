/** @format */

// src/components/BooksList.js
import React, { useState } from 'react';
import useUsers from '../hooks/UsersHooks';
import { useRouter } from 'next/router';

import { Table } from 'flowbite-react';
import '../app/globals.css';

const UsersList = () => {
	const { users, loading, error } = useUsers();
	const router = useRouter();

	const handleUserSelect = (userId) => {
		router.push(`/Pedidos/${userId}`);
	};

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error loading Books.</p>;

	return (
		<div>
			<div>
				<Table>
					<Table.Head>
						<Table.HeadCell>Nombre</Table.HeadCell>
						<Table.HeadCell>Email</Table.HeadCell>

						<Table.HeadCell>Acciones</Table.HeadCell>
						<Table.HeadCell>
							<span className='sr-only'>Pedidos</span>
						</Table.HeadCell>
					</Table.Head>
					<Table.Body className='divide-y'>
						{users.map((book) => (
							<Table.Row
								key={book.UsuarioID}
								className='bg-white dark:border-gray-700 dark:bg-gray-800'
							>
								<Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
									{book.Nombre}
								</Table.Cell>
								<Table.Cell>{book.Email}</Table.Cell>

								<Table.Cell>
									<a
										onClick={() => handleUserSelect(book.UsuarioID)}
										className='font-medium text-cyan-600 hover:underline dark:text-cyan-500'
									>
										Ordenes
									</a>
								</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
				</Table>
			</div>
		</div>
	);
};

export default UsersList;
