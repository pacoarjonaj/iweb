import NavbarItem from "../components/navbar"
import { useRef } from "react"
import { Button, TextInput } from "flowbite-react"

const CreateBooking = ({}) => {
	const startDate = useRef()
	const endDate = useRef()
	const user = useRef()
	const housing = useRef()
	const lat = useRef()
	const lng = useRef()

	const handleSubmit = async() => {
		await fetch(
			`http://localhost:3000/api/bookings`,{
				body: JSON.stringify({
					startDate: startDate.current.value,
					endDate: endDate.current.value,
					user: user.current.value,
					housing: housing.current.value,
					lat: lat.current.value,
					lng: lng.current.value
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

			<div className="flex-col flex w-full h-screen space-y-4 mt-10 items-center" >

				<h1 className="text-2xl font-normal ">Crear reserva</h1>
				<div >
					<form onSubmit={handleSubmit} action={'http://localhost:3000/bookings'}>
						<div className="pb-2 w-96">
							<div>
								<label className="text-gray-800"htmlFor="startDate"> Fecha de inicio </label>
							</div>
							<TextInput required={true} type="date" id="startDate" name="_startDate" placeholder="Fecha de inicio" ref={startDate}/>
						</div>
						<div className="pb-2">
							<div>
								<label className="text-gray-800"htmlFor="endDate"> Fecha de fin </label>
							</div>
							<TextInput required={true} type="date" id="endDate" name="_endDate" placeholder="Fecha de fin" ref={endDate}/>
						</div>
						<div className="pb-2">
							<div>
								<label className="text-gray-800"htmlFor="user"> Identificador de usuario </label>
							</div>
							<TextInput required={true} id="user" name="_user" placeholder="Identificador de usuario" ref={user}/>
						</div>
						<div className="pb-2">
							<div>
								<label className="text-gray-800"htmlFor="housing"> Identificador de alojamiento </label>
							</div>
							<TextInput required={true} id="housing" name="_housing" placeholder="Identificador de alojamiento" ref={housing}/>
						</div>
						<div className="pb-2">
							<div>
								<label className="text-gray-800"htmlFor="lat"> Latitud para recogida</label>
							</div>
							<TextInput required={true} id="lat" name="_lat" placeholder="Latitud para recogida" ref={lat}/>
						</div>
						<div className="pb-4">
							<div>
								<label className="text-gray-800"htmlFor="lng"> Longitud para recogida</label>
							</div>
							<TextInput required={true} id="lng" name="_lng" placeholder="Longitud para recogida" ref={lng}/>
						</div>
						
						<div className="flex flex-col items-center ">
						<Button type="submit">
							Crear
						</Button>
						</div>
					</form>
				</div>

			</div>
		</>
	)

}

export default CreateBooking