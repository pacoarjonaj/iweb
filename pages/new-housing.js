import { Button, TextInput } from "flowbite-react"
import { useRef } from "react"
import NavbarItem from "../components/navbar"


const CreateHousing = ({

}) => {

	const title = useRef()
	const description = useRef()
	const location = useRef()
	const address = useRef()
	const price = useRef()
	const owner = useRef()	// Es temporal, en siguientes versiones ya no se hará asi


	const handleSubmit = async() => {
		await fetch(`http://localhost:3000/api/housings`,{
			body: JSON.stringify({
				title: title.current.value,
				description: description.current.value,
				location: location.current.value,
				address: address.current.value,
				price: price.current.value,
				owner: owner.current.value  
			}),
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST'
		})
	}

	return (
		<>
			
			<NavbarItem />

			<div className="flex-col flex w-full h-screen space-y-12 my-24 items-center" >

				<h1 className="text-2xl font-normal ">Crear Nuevo Alojamiento</h1>
				<form onSubmit={handleSubmit} action={'http://localhost:3000/housings'}>
					{/** Esto es temporal, hasta que tengamos la sesion del usuario */}
					<input type="text" hidden={true} id="owner" name="owner" ref={owner} value={"636d57a75c1044b28b7fe9c8"}/>   
					<div className="pb-2">
						<div>
							<label className="text-gray-800"htmlFor="title"> Titulo </label>
						</div>
						<TextInput required={true} id="title" name="title" placeholder="Titulo" ref={title}/>
					</div>
					<div className="pb-2">
						<div>
							<label className="text-gray-800"htmlFor="description"> Descripcion </label>
						</div>
						<TextInput id="description" sizing="lg" name="description" placeholder="Descripcion" ref={description}/>
					</div>
					<div className="pb-2">
						<div>
							<label className="text-gray-800"htmlFor="location"> Localidad </label>
						</div>
						<TextInput required={true} id="location" name="location" placeholder="Localidad" ref={location}/>
					</div>
					<div className="pb-2">
						<div>
							<label className="text-gray-800"htmlFor="address"> Dirección </label>
						</div>
						<TextInput required={true} id="address" name="address" placeholder="Dirección" ref={address}/>
					</div>
					<div className="pb-2">
						<div>
							<label className="text-gray-800"htmlFor="price"> Precio </label>
						</div>
						<TextInput required={true} id="price" name="price" placeholder="Precio por noche" ref={price}/>
					</div>
					<div className="flex flex-col items-center">
						<Button type="submit" className="rounded-full border-2 flex flex-row justify-center cursor-pointer text-white bg-blue-500 hover:bg-blue-600">
							Crear
						</Button>
					</div>
				</form>

		</div>
		</>
	)
}

export default CreateHousing