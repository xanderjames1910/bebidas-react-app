import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

export const ModalContext = createContext();

const ModalProvider = props => {
	// State del provider
	const [idReceta, setIdReceta] = useState(null);
	const [infoReceta, setReceta] = useState({});

	// Una vez que tenemos una receta, llamar la API
	useEffect(() => {
		const obtenerReceta = async () => {
			if (!idReceta) return;

			const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idReceta}`;

			const resultado = await axios.get(url);

			setReceta(resultado.data.drinks[0]);
		};
		obtenerReceta();
	}, [idReceta]);

	const { children } = props;

	return (
		<ModalContext.Provider value={{ infoReceta, setIdReceta, setReceta }}>
			{children}
		</ModalContext.Provider>
	);
};

ModalProvider.propTypes = {
	children: PropTypes.object.isRequired,
};

export default ModalProvider;
