import React, { useContext, useState } from 'react';

import { CategoriasContext } from '../context/CategoriasContext';
import { RecetasContext } from '../context/RecetasContext';

const Formulario = () => {
	const [busqueda, setBusqueda] = useState({
		nombre: '',
		categoria: '',
	});

	const { categorias } = useContext(CategoriasContext);
	const { buscarRecetas, setConsultar } = useContext(RecetasContext);

	// Funcion para leer los contenidos
	const obtenerDatosReceta = e => {
		setBusqueda({
			...busqueda,
			[e.target.name]: e.target.value,
		});
	};

	// Funcion para obtener la receta
	const obtenerReceta = e => {
		e.preventDefault();

		buscarRecetas(busqueda);
		setConsultar(true);
	};

	return (
		<form className='col-12' onSubmit={obtenerReceta}>
			<fieldset className='text-center'>
				<legend>Bebidas por categoría o Ingrediente</legend>
			</fieldset>
			<div className='row mt-4'>
				<div className='col-md-4'>
					<input
						type='text'
						name='nombre'
						className='form-control'
						placeholder='Buscar por ingrediente'
						onChange={obtenerDatosReceta}
					/>
				</div>
				<div className='col-md-4'>
					<select
						name='categoria'
						className='form-control'
						onChange={obtenerDatosReceta}>
						<option value=''>-- Selecciona Categoría --</option>
						{categorias.map(categoria => (
							<option
								key={categoria.strCategory}
								value={categoria.strCategory}>
								{categoria.strCategory}
							</option>
						))}
					</select>
				</div>
				<div className='col-md-4'>
					<button type='submit' className='btn btn-block btn-primary'>
						Buscar Bebidas
					</button>
				</div>
			</div>
		</form>
	);
};

export default Formulario;
