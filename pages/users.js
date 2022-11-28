import { Button, Card, TextInput, Dropdown } from 'flowbite-react'
import { useState } from "react"
import { useRouter } from "next/router"
import { AdvancedImage } from "@cloudinary/react"
import {Cloudinary} from "@cloudinary/url-gen";
import {thumbnail} from "@cloudinary/url-gen/actions/resize";
import {byRadius} from "@cloudinary/url-gen/actions/roundCorners";
import {focusOn} from "@cloudinary/url-gen/qualifiers/gravity";
import {FocusOn} from "@cloudinary/url-gen/qualifiers/focusOn";
import Link from 'next/link'
import NavbarItem from '../components/navbar'

const Users = ({users}) => {
	const router = useRouter()
	const [usernameValue, setUsername] = useState(users.username)
	const [age1Value, setAge1] = useState(users.age1)
	const [age2Value, setAge2] = useState(users.age2)

	const handleSubmit = async event => {
		event.preventDefault()
		if((event.target.age1.value !== "") && (event.target.age2.value !== "")) {
			router.push(`/users?age1=${event.target.age1.value}&age2=${event.target.age2.value}`)
		} else if(event.target.username.value !== "") {
			router.push(`/users?username=${event.target.username.value}`)
		} else {
			router.push(`/users`)
		}
	}

	function filterNone() {
		setUsername("")
		document.getElementById("username").value = ""
		document.getElementById("username").style.display = "none"

		setAge1("")
		setAge2("")
		document.getElementById("age1").value = ""
		document.getElementById("age2").value = ""
		document.getElementById("ages").style.display = "none"

		document.getElementById("submit").style.display = "none"
		document.getElementById("submit").click();
	}

	function filterUsername() {
		setUsername("")
		document.getElementById("username").value = ""
		document.getElementById("username").style.display = "block"

		setAge1("")
		setAge2("")
		document.getElementById("age1").value = ""
		document.getElementById("age2").value = ""
		document.getElementById("ages").style.display = "none"

		document.getElementById("submit").style.display = "block"
		document.getElementById("submit").click();
	}

	function filterAges() {
		setUsername("")
		document.getElementById("username").value = ""
		document.getElementById("username").style.display = "none"

		setAge1("")
		setAge2("")
		document.getElementById("age1").value = ""
		document.getElementById("age2").value = ""
		document.getElementById("ages").style.display = "block"

		document.getElementById("submit").style.display = "block"
		document.getElementById("submit").click();
	}

	return (
		<>
			<NavbarItem />	
			<div className="flex flex-col pt-10 items-center">
				<Dropdown label="Filtro">
					<Dropdown.Item onClick={filterNone}>
						Ninguno
					</Dropdown.Item>
					<Dropdown.Item onClick={filterUsername}>
						Apodo
					</Dropdown.Item>
					<Dropdown.Item onClick={filterAges}>
						Edades
					</Dropdown.Item>
				</Dropdown>

				<form onSubmit={handleSubmit}>
					<TextInput id="username" 
						name="username" 
						value={usernameValue}
						placeholder="Nombre de usuario"
						className="pt-4 w-96"
						onChange={(event) => setUsername(event.target.value)}
						style={{display: "none"}}/>

					<div id="ages" className="w-96" style={{display: "none"}}>
						<TextInput id="age1" 
							name="age1" 
							value={age1Value}
							placeholder="Edad mínima"
							onChange={(event) => setAge1(event.target.value)}/>

						<TextInput id="age2"
							name="age2" 
							value={age2Value}
							className="pt-4"
							placeholder="Edad máxima"
							onChange={(event) => setAge2(event.target.value)}/>
					</div>

					<div className="flex-col flex items-center">
						<Button id="submit" type="submit" className="my-4" style={{display: "none"}}>
							Buscar
						</Button>
					</div>
				</form>

				<Card>
					<div className="flex items-center justify-center">
						<h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Usuarios</h5>
					</div>

					<ul className="divide-y divide-gray-200 dark:divide-gray-700">
						{users && users.length > 0 ? (
							users.map((user) => {
								const cld = new Cloudinary({
									cloud: {
										cloudName: "dbzi42o21"
									}
								});
								const myImage = cld.image(user.public_id)
								myImage.resize(thumbnail().width(70).height(70).gravity(focusOn(FocusOn.face()))).roundCorners(byRadius(10));

								return (
									<li className="py-3 sm:py-4">
										<div className="flex items-center space-x-4">
											<AdvancedImage cldImg={myImage} />
											<div className="min-w-0 flex-1">
												<p className="truncate font-medium text-gray-900 dark:text-white underline">{user.name + " " + user.surname + " (" + user.age + " años)"} </p>
												<p className="truncate font-medium text-gray-900 dark:text-white">{user.username} </p>
												<p className="truncate text-gray-500 dark:text-gray-400">{user._id}</p>
											</div>
											<Link href={`user/?id=${user._id}`} passHref><Button>Ver perfil</Button></Link>
										</div>
									</li>
								)
							}))
							:
							(
								<div className="flex flex-col w-full h-full items-center justify-center">
									<span>No se han encontrado resultados en esta lista</span>
								</div>
							)
						}
					</ul>
				</Card>
			</div>
		</>
	)
}

export async function getServerSideProps(ctx) {
	if(((ctx.query).age1 !== undefined) && ((ctx.query).age2 !== undefined)) {
		const {age1} = ctx.query
		const {age2} = ctx.query 

		const users = await fetch(`http://localhost:3000/api/users/ages/${age1}/${age2}`)
		.then(response => response.json())

		return {
			props:{
				users
			}
		}
	}

	if((ctx.query).username !== undefined) {
		const {username} = ctx.query 

		const users = await fetch(`http://localhost:3000/api/users/username/${username}`)
		.then(response => response.json())

		return {
			props:{
				users
			}
		}
	}

	const users = await fetch(`http://localhost:3000/api/users`)
		.then(response => response.json())
	
		return {
			props:{
				users
			}
		}
}

export default Users
