{/* <TablePrincipalContainer>
			<TableTitle title={"Novedades"} />
			<TableContainerFilters>
				<TableDropDownList
					options={[
						{ value: 5, name: 5 },
						{ value: 10, name: 10 },
					]}
					name="pagination"
					setOnChange={handleSetAmountToShow}
				/>
				<TableInputSearch placeholder="Buscar...." inputFilter={search} setInputFilter={handleSearch} />
				<Link
					to={"/backoffice/novedades/crear"}
					className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
				>
					Crear Novedad
				</Link>
			</TableContainerFilters>
			<TableContainer>
				<div className="min-w-full leading-normal">
					<div>
						<div>
							<TableHeader>Nombre</TableHeader>
							<TableHeader>Imagen</TableHeader>
							<TableHeader>Fecha Creación</TableHeader>
							<TableHeader>Editar</TableHeader>
							<TableHeader>Borrar</TableHeader>
						</div>
					</div>
					<div>
						{!isLoading &&
							news?.map(n => {
								return (
									<div key={n.id}>
										<TableFieldContainer className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
											<p className="text-gray-900 whitespace-no-wrap">{n.name}</p>
										</TableFieldContainer>
										<TableFieldContainer>
											<p className="text-gray-900 whitespace-no-wrap">{n.image}</p>
										</TableFieldContainer>
										<TableFieldContainer>
											<p className="text-gray-900 whitespace-no-wrap">{n.created_at}</p>
										</TableFieldContainer>
										<TableFieldContainer>
											<Link to={`/backoffice/novedades/editar/${n.id}`}>
												<FaRegEdit size={30} className=" text-yellow-500" />
											</Link>
										</TableFieldContainer>
										<TableFieldContainer>
											<button onClick={() => handleDeleteNews(n.id)}>
												<FaRegTrashAlt size={30} className="text-red-600" />
											</button>
										</TableFieldContainer>
									</div>
								);
							})}
						{isLoading &&
							_.times(page.limit, i => (
								<div key={"skeletonUserList" + i}>
									<TableFieldContainer className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
										<Skeleton width={"100%"} height={"30px"} />
									</TableFieldContainer>
									<TableFieldContainer>
										<Skeleton width={"100%"} height={"30px"} />
									</TableFieldContainer>
									<TableFieldContainer>
										<Skeleton width={"100%"} height={"30px"} />
									</TableFieldContainer>
									<TableFieldContainer>
										<Skeleton width={"100%"} height={"30px"} />
									</TableFieldContainer>
								</div>
							))}
					</div>
				</div>
				<TablePagination
					page={page.pages}
					amountOfPages={itemsNews.totalPage}
					amountOfElements={itemsNews.total}
					handleNextPage={handleNextPage}
					handlePreviusPage={handlePreviusPage}
					title="Novedades"
				/>
			</TableContainer>
		</TablePrincipalContainer> */}