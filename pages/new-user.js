import NavbarItem from "../components/navbar"
import {useRouter} from "next/router"
import { useRef } from "react"
import { Button } from "flowbite-react"

const CreateUser = ({}) => {

	const router = useRouter()

	const name = useRef()
	const surname = useRef()
	const email = useRef()
	const username = useRef()
	const age = useRef()

	const handleSubmit = async() => {
		await fetch(
			`http://localhost:3000/api/users`,{
				body: JSON.stringify({
					name: name.current.value,
					surname: surname.current.value,
					email: email.current.value,
					username: username.current.value,
					age: age.current.value
				}),
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST'
			}).then(response => {
				router.push(`/users`)
			})
	}


	return (
		<>
			<NavbarItem />

			<div className="flex-col flex w-full h-screen space-y-12 my-24 items-center" >

				<h1 className="text-2xl font-normal ">Crear Nuevo Usuario</h1>
				<form>
					<div className="pb-2">
						<div>
							<label className="text-gray-800"htmlFor="name"> Nombre </label>
						</div>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600" type="text" id="name" name="name" placeholder="Nombre" ref={name}/>
					</div>
					<div className="pb-2">
						<div>
							<label className="text-gray-800"htmlFor="surname"> Apellidos </label>
						</div>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600" type="text" id="surname" name="surname" placeholder="Apellidos" ref={surname}/>
					</div>
					<div className="pb-2">
						<div>
							<label className="text-gray-800"htmlFor="email"> Email </label>
						</div>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600" type="text" id="email" name="email" placeholder="email" ref={email}/>
					</div>
					<div className="pb-2">
						<div>
							<label className="text-gray-800"htmlFor="username"> Nombre de usuario </label>
						</div>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600" type="text" id="username" name="nusernameame" placeholder="username" ref={username}/>
					</div>
					<div className="pb-4">
						<div>
							<label className="text-gray-800"htmlFor="age"> Edad </label>
						</div>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600" type="text" id="age" name="age" placeholder="age" ref={age}/>
					</div>
					<div className="flex flex-col items-center">
						<Button onClick={handleSubmit} className="rounded-full border-2 flex flex-row justify-center cursor-pointer text-white bg-blue-500 hover:bg-blue-600">
							Crear
						</Button>
					</div>
				</form>

			</div>
		</>
	)

}

export default CreateUser