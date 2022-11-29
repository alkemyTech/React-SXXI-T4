import React from "react";

const TablePagination = ({
	page,
	amountOfPages,
	amountOfElements,
	handleNextPage,
	handlePreviusPage,
	title,
}) => {
	return (
		<div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
			<span className="text-xs xs:text-sm text-gray-900">
				Pagina {page} de {amountOfPages} Cantidad de {title}: {amountOfElements}
			</span>
			<div className="inline-flex mt-2 xs:mt-0">
				<button
					className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l"
					onClick={handlePreviusPage}
				>
					Anterior
				</button>
				<button
					className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r"
					onClick={handleNextPage}
				>
					Siguiente
				</button>
			</div>
		</div>
	);
};

export default TablePagination;
