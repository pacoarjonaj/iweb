import { useRouter } from "next/router"
import { useState } from "react"
import NavbarItem from "../components/navbar"
import { Button,TextInput } from "flowbite-react"

const EditHousing = ({
	housing
}) => {

	const router = useRouter()

	const [titleValue, setTitle] = useState(housing.title)
	const [descriptionValue, setDescription] = useState(housing.description ? (housing.description) : null)
	const [locationValue, setLocation] = useState(housing.location)
	const [addressValue, setAddress] = useState(housing.address)
	const [priceValue, setPrice] = useState(housing.price)

	const handleSubmit = async event => {
		event.preventDefault()

		const res = await fetch(
			`http://localhost:3000/api/housings/${housing._id}`,{
				body: JSON.stringify({
					title: event.target.title.value,
					description: event.target.description.value,
					location: event.target.location.value,
					address: event.target.address.value,
					price: event.target.price.value
				}),
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'PUT'
			}).then(response => {
				router.push(`/housings`)
			})
	}


	return (
		<>
			<NavbarItem />

			<div className="flex-col flex w-full h-screen space-y-12 my-24 items-center" >

				<h1 className="text-2xl font-normal ">Crear Nuevo Alojamiento</h1>
				<form  onSubmit={handleSubmit}>
					<div className="pb-2">
						<div>
							<label className="text-gray-800"htmlFor="title"> Titulo </label>
						</div>
						<TextInput id="title" 
						name="title" 
						value={titleValue}
						onChange={ (event) => setTitle(event.target.value)}
						/>
					</div>
					<div className="pb-2">
						<div>
							<label className="text-gray-800"htmlFor="description"> Descripcion </label>
						</div>
						<TextInput id="description" sizing="lg" 
						name="description" 
						value={descriptionValue}
						onChange={ (event) => setDescription(event.target.value)}
						/>
					</div>
					<div className="pb-2">
						<div>
							<label className="text-gray-800"htmlFor="location"> Localidad </label>
						</div>
						<TextInput id="location" 
						name="location" 
						value={locationValue}
						onChange={ (event) => setLocation(event.target.value)}
						/>
					</div>
					<div className="pb-2">
						<div>
							<label className="text-gray-800"htmlFor="address"> Dirección </label>
						</div>
						<TextInput id="address" 
						name="address" 
						value={addressValue}
						onChange={ (event) => setAddress(event.target.value)}
						/>
					</div>
					<div className="pb-2">
						<div>
							<label className="text-gray-800"htmlFor="price"> Precio por noche</label>
						</div>
						<TextInput id="price" 
						name="price"

						value={priceValue}
						onChange={ (event) => setPrice(event.target.value)}
						 />
					</div>
					<div className="flex flex-col items-center">
						<Button type="submit" className="rounded-full border-2 flex flex-row justify-center cursor-pointer text-white bg-blue-500 hover:bg-blue-600">
							Modificar
						</Button>
					</div>
				</form>

		</div>


		</>
	)
}

export async function getServerSideProps(ctx){

	const {id} = ctx.query 

	const housing = await fetch(`http://localhost:3000/api/housings/${id}`)
		.then(response => response.json())


	return{
		props:{
			housing
		}
	}
}

export default EditHousing