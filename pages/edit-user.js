import NavbarItem from "../components/navbar"
import { useState } from "react"
import { useRouter } from "next/router"
import { Button } from "flowbite-react"


const EditUser = ({
	user
}) => {

	const router = useRouter()

	const [nameValue, setName] = useState(user.name)
	const [surnameValue, setSurname] = useState(user.surname)
	const [emailValue, setEmail] = useState(user.email)
	const [usernameValue, setUsername] = useState(user.username)
	const [ageValue, setAge] = useState(user.age)

	
	const handleSubmit = async event => {
		event.preventDefault()

		const res = await fetch(
			`http://localhost:3000/api/users/${user._id}`,{
				body: JSON.stringify({
					name: event.target.name.value,
					surname: event.target.surname.value,
					email: event.target.email.value,
					username: event.target.username.value,
					age: event.target.age.value
				}),
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'PUT'
			}).then(response => {
				router.push(`/users`)
			})
	}

	return (
		<>

			<NavbarItem />

			<div className="flex-col flex w-full h-screen space-y-12 my-24 items-center" >

				<h1 className="text-2xl font-normal ">Editar Datos de Usuario</h1>
				<form onSubmit={handleSubmit}>
					<div className="pb-2">
						<div>
							<label className="text-gray-800"htmlFor="name"> Nombre </label>
						</div>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600" type="text" id="name" 
							name="name" 
							placeholder={nameValue}
							onChange={ (event) => setName(event.target.value)}
						/>
					</div>
					<div className="pb-2">
						<div>
							<label className="text-gray-800"htmlFor="surname"> Apellidos </label>
						</div>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600" type="text" id="surname" 
							name="surname" 
							placeholder={surnameValue}
							onChange={ (event) => setSurname(event.target.value)}
						/>
					</div>
					<div className="pb-2">
						<div>
							<label className="text-gray-800"htmlFor="email"> Email </label>
						</div>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600" type="text" id="email" 
							name="email" 
							placeholder={emailValue}
							onChange={ (event) => setEmail(event.target.value)}/>
					</div>
					<div className="pb-2">
						<div>
							<label className="text-gray-800"htmlFor="username"> Nombre de usuario </label>
						</div>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600" type="text" id="username" 
							name="nusernameame" 
							placeholder={usernameValue}
							onChange={ (event) => setUsername(event.target.value)}
						/>
					</div>
					<div className="pb-4">
						<div>
							<label className="text-gray-800"htmlFor="age"> Edad </label>
						</div>
						<input className="rounded-lg border border-gray-600 focus:border-gray-600" type="text" id="age" 
							name="age" 
							placeholder={ageValue}
							onChange={ (event) => setAge(event.target.value)}
						/>
					</div>
					<div className="flex-col flex items-center">
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

	const user = await fetch(`http://localhost:3000/api/users/${id}`)
		.then(response => response.json())


	return{
		props:{
			user
		}
	}
}

export default EditUser