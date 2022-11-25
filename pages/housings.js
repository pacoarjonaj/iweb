import NavbarItem from "../components/navbar"
import HousingItem from "../components/housing-item"
import MapItem from "../components/map"

const Housings = ({
	housings
}) => {

	const containerStyle = {
		position: 'relative',
		width: '400px',
		height: '700px'
	}

	const center = {
		lat: 36.7212737,
		lng: -4.4213988
	}

	return (
		<div className="flex flex-col w-full h-full">
			
			<div>
				<NavbarItem />
			</div>

			
			<div className="relative flex flex-row w-full flex-grow-0">
				{/** Alojamientos */}
				<div className="relative overflow-auto w-full h-full">
					<div className="relative grid grid-cols-5 grid-flow-row gap-8 p-4">
						
					{housings && housings.length > 0 ? (
						housings.map((house) => {
							return (
								<HousingItem
									key={house}
									housing={house}
								/>
							)
					}))
					:
					(
						<div className="flex flex-col w-full h-full items-center justify-center">
							<span>No hay resultados para esta búsqueda</span>
						</div>
					)
				}

					</div>
				</div>
				{/** Mapa */}
				<div className="relative w-196 pt-16 pr-4">	
						<MapItem
							containerStyle={containerStyle}
							center={center}
							zoom={12}
						/>
				</div>
				
			</div>

		</div>	
	)
}

export async function getServerSideProps(){

	const housings = await fetch(`http://localhost:3000/api/housings`)
		.then(response => response.json())

		return {
			props:{
				housings
			}
		}
} 

export default Housings 



/**
 * {housings && housings.length > 0 ? (
					housings.map((house) => {
						return (
							<HousingItem
								key={house}
								housing={house}
							/>
						)
					}))
					:
					(
						<div className="flex flex-col w-full h-full items-center justify-center">
							<span>No hay resultados para esta búsqueda</span>
						</div>
					)
				}
 */