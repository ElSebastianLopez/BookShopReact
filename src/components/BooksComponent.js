/** @format */

// src/components/BooksList.js
import React, { useState } from 'react';
import useBooks from '../hooks/HookBooks';
import { Button, Modal, Table } from 'flowbite-react';
import '../app/globals.css';

const BooksList = () => {
	const { books, book, loading, error, createBook, editBooks, fetchBooksByid,DeleteBooks } =
		useBooks();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [formData, setFormData] = useState({
		BookId: 0,
		Titulo: '',
		Autor: '',
		FechaPublicacion: '',
		Precio: '',
	});

	const getByid = async (id) => {
		const fetchedBook = await fetchBooksByid(id);
		if (fetchedBook) {
			openEditModal(fetchedBook);
		}
	};
	const openModal = () => {
		setIsEditing(false); // Estamos creando un libro
		setFormData({
			BookId: 0,
			Titulo: '',
			Autor: '',
			FechaPublicacion: '',
			Precio: '',
		});
		setIsModalOpen(true);
	};

	const openEditModal = (fetchedBook) => {
		setIsEditing(true);
		setFormData({
			BookId: fetchedBook.LibroID,
			Titulo: fetchedBook.Titulo,
			Autor: fetchedBook.Autor,
			FechaPublicacion: fetchedBook.FechaPublicacion.split('T')[0],
			Precio: fetchedBook.Precio,
		});
		setIsModalOpen(true);
	};
	const closeModal = () => {
		setIsModalOpen(false);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (isEditing) {
			editBooks(formData.BookId, formData); // Llama a la función editBooks con los datos del formulario
		} else {
			createBook(formData); // Llama a la función createBook con los datos del formulario
		}
		closeModal(); // Cierra la modal después de crear o editar el libro
	};

    const handleDeleteBooks = async (id) => {
        const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar este libro?");
		if (confirmDelete) {
			await DeleteBooks(id);
		}
    }

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error loading Books.</p>;

	return (
		<div>
			<Button color='success' onClick={openModal}>
				Crear Libro
			</Button>
			<div>
				<Table>
					<Table.Head>
						<Table.HeadCell>Title</Table.HeadCell>
						<Table.HeadCell>Author</Table.HeadCell>
						<Table.HeadCell>Publication Date</Table.HeadCell>
						<Table.HeadCell>Price</Table.HeadCell>
						<Table.HeadCell>Acciones</Table.HeadCell>
						<Table.HeadCell>
							<span className='sr-only'>Editar</span>
						</Table.HeadCell>
                       
					</Table.Head>
					<Table.Body className='divide-y'>
						{books.map((book) => (
							<Table.Row
								key={book.LibroID}
								className='bg-white dark:border-gray-700 dark:bg-gray-800'
							>
								<Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
									{book.Titulo}
								</Table.Cell>
								<Table.Cell>{book.Autor}</Table.Cell>
								<Table.Cell>
									{new Date(book.FechaPublicacion).toLocaleDateString()}
								</Table.Cell>
								<Table.Cell>{`$${book.Precio.toFixed(2)}`}</Table.Cell>
								<Table.Cell>
									<a
										onClick={() => getByid(book.LibroID)}
										className='font-medium text-cyan-600 hover:underline dark:text-cyan-500'
									>
										Edit
									</a>-------------
                                    <a
										onClick={() => handleDeleteBooks(book.LibroID)}
										className='font-medium text-cyan-600 hover:underline dark:text-cyan-500'
									>
										eliminar
									</a>
								</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
				</Table>
			</div>

			<Modal show={isModalOpen} onClose={closeModal}>
				<Modal.Header>Crear Nuevo Libro</Modal.Header>
				<Modal.Body>
					<form onSubmit={handleSubmit} className='space-y-6'>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Título
							</label>
							<input
								type='text'
								name='Titulo'
								value={formData.Titulo}
								onChange={handleInputChange}
								required
								className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm'
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Autor
							</label>
							<input
								type='text'
								name='Autor'
								value={formData.Autor}
								onChange={handleInputChange}
								required
								className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm'
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Fecha de Publicación
							</label>
							<input
								type='date'
								name='FechaPublicacion'
								value={formData.FechaPublicacion}
								onChange={handleInputChange}
								required
								className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm'
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Precio
							</label>
							<input
								type='number'
								name='Precio'
								value={formData.Precio}
								onChange={handleInputChange}
								required
								className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm'
							/>
						</div>
						<div className='flex justify-end space-x-2'>
							<Button color='success' type='submit'>
								{isEditing ? 'Editar' : 'Crear'}
							</Button>
							<Button color='gray' onClick={closeModal}>
								Cancelar
							</Button>
						</div>
					</form>
				</Modal.Body>
			</Modal>
		</div>
	);
};

export default BooksList;
