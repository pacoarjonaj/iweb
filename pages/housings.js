import NavbarItem from "../components/navbar"
import HousingItem from "../components/housing-item"

const Housings = ({
	housings
}) => {

	const array = [1,2,3]

	return (
		<>
			<NavbarItem />
			
			<div className="flex-row flex px-8 py-8">
				
				{ array.map((house) => {
					return (
						<HousingItem
							key={house}
							housing={house}
						/>
					)
				})

				}

			</div>
		</>	
	)
}

export async function getServerSideProps(){

	const housings = await fetch(`http://localhost:3000/api/housings`)
		.then(response => response.json())

		console.log(housings)

		return {
			props:{
				housings
			}
		}
} 

export default Housings 