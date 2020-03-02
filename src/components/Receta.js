/* eslint-disable no-plusplus */
import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import PropTypes from 'prop-types';

import { ModalContext } from '../context/ModalContext';

function getModalStyles() {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}

const useStyles = makeStyles(theme => ({
	paper: {
		position: 'absolute',
		width: 450,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

const Receta = ({ receta }) => {
	// Configuracion del modal de Material UI
	const [modalStyle] = useState(getModalStyles);
	const [open, setOpen] = useState(false);

	const classes = useStyles();

	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	// Extraer los valores del context
	const { infoReceta, setIdReceta, setReceta } = useContext(ModalContext);

	// Muestra y formatea los ingredientes
	const mostrarIngredientes = infoDrink => {
		const ingredientes = [];

		for (let i = 1; i < 16; i++) {
			if (infoDrink[`strIngredient${i}`]) {
				ingredientes.push(
					<li>
						{infoDrink[`strIngredient${i}`]} {infoDrink[`strMeasure${i}`]}
					</li>,
				);
			}
		}
		return ingredientes;
	};

	return (
		<div className='col-md-4 mb-3'>
			<div className='card'>
				<h2 className='card-header'>{receta.strDrink}</h2>
				<img
					src={receta.strDrinkThumb}
					alt={`Imagen de ${receta.strDrink}`}
					className='card-img-top'
				/>
				<div className='card-body'>
					<button
						type='button'
						className='btn btn-block btn-primary'
						onClick={() => {
							setIdReceta(receta.idDrink);
							handleOpen();
						}}>
						Ver Receta
					</button>
					<Modal
						open={open}
						onClose={() => {
							setIdReceta(null);
							setReceta({});
							handleClose();
						}}>
						<div style={modalStyle} className={classes.paper}>
							<h2>{infoReceta.strDrink}</h2>
							<h3 className='mt-4'>Instrucciones</h3>
							<p>{infoReceta.strInstructions}</p>
							<img
								className='img-fluid my-4'
								src={infoReceta.strDrinkThumb}
								alt={infoReceta.strDrink}
							/>
							<h3>Ingredientes y cantidades</h3>
							<ul>{mostrarIngredientes(infoReceta)}</ul>
						</div>
					</Modal>
				</div>
			</div>
		</div>
	);
};

Receta.propTypes = {
	receta: PropTypes.object.isRequired,
};

export default Receta;
