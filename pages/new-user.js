import NavbarItem from "../components/navbar"
import { useRef } from "react"
import { Button, TextInput } from "flowbite-react"

const CreateUser = ({}) => {
	const name = useRef()
	const surname = useRef()
	const email = useRef()
	const username = useRef()
	const age = useRef()
	const public_id = useRef()


	const handleSubmit = async() => {
		await fetch(
			`http://localhost:3000/api/users`,{
				body: JSON.stringify({
					name: name.current.value,
					surname: surname.current.value,
					email: email.current.value,
					username: username.current.value,
					age: age.current.value,
					public_id: public_id.current.value
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

				<h1 className="text-2xl font-normal ">Crear usuario</h1>
				<div >
					<form onSubmit={handleSubmit} action={'http://localhost:3000/users'}>
						<div className="pb-2 w-96">
							<div>
								<label className="text-gray-800"htmlFor="name"> Nombre </label>
							</div>
							<TextInput required={true} id="name" name="_name" placeholder="Nombre" ref={name}/>
						</div>
						<div className="pb-2">
							<div>
								<label className="text-gray-800"htmlFor="surname"> Apellidos </label>
							</div>
							<TextInput required={true} id="surname" name="_surname" placeholder="Apellidos" ref={surname}/>
						</div>
						<div className="pb-2">
							<div>
								<label className="text-gray-800"htmlFor="email"> Email </label>
							</div>
							<TextInput required={true} id="email" name="_email" placeholder="Email" ref={email}/>
						</div>
						<div className="pb-2">
							<div>
								<label className="text-gray-800"htmlFor="username"> Apodo </label>
							</div>
							<TextInput required={true} id="username" name="_username" placeholder="Apodo" ref={username}/>
						</div>
						<div className="pb-2">
							<div>
								<label className="text-gray-800"htmlFor="age"> Edad </label>
							</div>
							<TextInput required={true} id="age" name="_age" placeholder="Edad" ref={age}/>
						</div>
						<div className="pb-4">
							<div>
								<label className="text-gray-800"htmlFor="public_id"> Identificador de foto </label>
							</div>
							<TextInput required={true} id="public_id" name="_public_id" placeholder="Identificador de foto" ref={public_id}/>
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

export default CreateUser
