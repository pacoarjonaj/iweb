import NavbarItem from "../components/navbar"
import { useState } from "react"
import { useRouter } from "next/router"
import { Button, TextInput } from "flowbite-react"

const EditUser = ({user}) => {
	const router = useRouter()
	const [nameValue, setName] = useState(user.name)
	const [surnameValue, setSurname] = useState(user.surname)
	const [emailValue, setEmail] = useState(user.email)
	const [usernameValue, setUsername] = useState(user.username)
	const [ageValue, setAge] = useState(user.age)
	const [public_idValue, setPublic_id] = useState(user.public_id)

	const handleSubmit = async event => {
		event.preventDefault()

		const res = await fetch(
			`http://localhost:3000/api/users/${user._id}`,{
				body: JSON.stringify({
					name: event.target.name.value,
					surname: event.target.surname.value,
					email: event.target.email.value,
					username: event.target.username.value,
					age: event.target.age.value,
					public_id: event.target.public_id.value
				}),
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'PUT'
			}).then(response => {
				router.push(`/user?id=${user._id}`)
			})
	}

	return (
		<>
			<NavbarItem />
			<div className="flex-col flex w-full h-screen space-y-4 mt-10 items-center" >

				<h1 className="text-2xl font-normal ">Editar usuario</h1>
				<form onSubmit={handleSubmit}>
					<div className="pb-2 w-96">
						<div>
							<label className="text-gray-800"htmlFor="name"> Nombre </label>
						</div>
						<TextInput id="name" 
							name="name" 
							value={nameValue}
							onChange={ (event) => setName(event.target.value)}
						/>
					</div>
					<div className="pb-2">
						<div>
							<label className="text-gray-800"htmlFor="surname"> Apellidos </label>
						</div>
						<TextInput id="surname" 
							name="surname" 
							value={surnameValue}
							onChange={ (event) => setSurname(event.target.value)}
						/>
					</div>
					<div className="pb-2">
						<div>
							<label className="text-gray-800"htmlFor="email"> Email </label>
						</div>
						<TextInput id="email" 
							name="email" 
							value={emailValue}
							onChange={ (event) => setEmail(event.target.value)}/>
					</div>
					<div className="pb-2">
						<div>
							<label className="text-gray-800"htmlFor="username"> Nombre de usuario </label>
						</div>
						<TextInput addon="@" id="username" 
							name="nusernameame" 
							value={usernameValue}
							onChange={ (event) => setUsername(event.target.value)}
						/>
					</div>
					<div className="pb-4">
						<div>
							<label className="text-gray-800"htmlFor="age"> Edad </label>
						</div>
						<TextInput id="age" 
							name="age" 
							value={ageValue}
							onChange={ (event) => setAge(event.target.value)}
						/>
					</div>
					<div className="pb-4">
						<div>
							<label className="text-gray-800"htmlFor="public_id"> Identificador de foto </label>
						</div>
						<TextInput id="public_id" 
							name="public_id" 
							value={public_idValue}
							onChange={ (event) => setPublic_id(event.target.value)}
						/>
					</div>
					<div className="flex-col flex items-center">
						<Button type="submit">
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

	const user = await fetch(`http://localhost:3000/api/users/${id}`)
		.then(response => response.json())


	return{
		props:{
			user
		}
	}
}

export default EditUser