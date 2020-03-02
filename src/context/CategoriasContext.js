import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

// Crear el context
export const CategoriasContext = createContext();

// Provider es donde se encuentra las funciones y state
const CategoriasProvider = props => {
	// Crear el state del context
	const [categorias, setCategorias] = useState([]);

	// Ejecutar el llamado a la API
	useEffect(() => {
		const obtenerCategorias = async () => {
			const url = `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`;

			const categories = await axios.get(url);

			setCategorias(categories.data.drinks);
		};
		obtenerCategorias();
	}, []);
	const { children } = props;
	return (
		<CategoriasContext.Provider value={{ categorias }}>
			{children}
		</CategoriasContext.Provider>
	);
};

export default CategoriasProvider;
