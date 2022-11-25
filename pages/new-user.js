import NavbarItem from "../components/navbar"
import { useRef } from "react"
import { Button, TextInput } from "flowbite-react"

const CreateUser = ({}) => {

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
			})	
	}



	return (
		<>
			<NavbarItem />

			<div className="flex-col flex w-full h-screen space-y-12 my-24 items-center" >

				<h1 className="text-2xl font-normal ">Crear Nuevo Usuario</h1>
				<div >
					<form onSubmit={handleSubmit} action={'http://localhost:3000/users'}>
						<div className="pb-2">
							<div>
								<label className="text-gray-800"htmlFor="name"> Nombre </label>
							</div>
							<TextInput required={true} id="name" name="name" placeholder="Nombre" ref={name}/>
						</div>
						<div className="pb-2">
							<div>
								<label className="text-gray-800"htmlFor="surname"> Apellidos </label>
							</div>
							<TextInput required={true} id="surname" name="surname" placeholder="Apellidos" ref={surname}/>
						</div>
						<div className="pb-2">
							<div>
								<label className="text-gray-800"htmlFor="email"> Email </label>
							</div>
							<TextInput required={true} id="email" name="email" placeholder="email" ref={email}/>
						</div>
						<div className="pb-2">
							<div>
								<label className="text-gray-800"htmlFor="username"> Nombre de usuario </label>
							</div>
							<TextInput required={true} addon="@" id="username" name="nusernameame" placeholder="username" ref={username}/>
						</div>
						<div className="pb-4">
							<div>
								<label className="text-gray-800"htmlFor="age"> Edad </label>
							</div>
							<TextInput required={true} id="age" name="age" placeholder="age" ref={age}/>
						</div>
						<div className="flex flex-col items-center ">
						<Button type="submit" className="rounded-full border-2 flex flex-row justify-center cursor-pointer text-white bg-blue-500 hover:bg-blue-600">
							Crear
						</Button>
						</div>
					</form>
				</div>

			</div>
		</>
	)

}

export default CreateUser