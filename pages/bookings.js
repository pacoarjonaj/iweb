import { Button, Card, TextInput, Dropdown } from 'flowbite-react'
import Link from 'next/link'
import NavbarItem from "../components/navbar"

import { useEffect, useState } from "react"
import { useRouter } from "next/router"

const Bookings = ({bookings}) => {
	const router = useRouter()
	const [startDate1Value, setStartDate1] = useState(bookings.startDate1)
	const [startDate2Value, setStartDate2] = useState(bookings.startDate2)
	const [endDate1Value, setEndDate1] = useState(bookings.endDate1)
	const [endDate2Value, setEndDate2] = useState(bookings.endDate2)
	const [userValue, setUser] = useState(bookings.user)

	const handleSubmit = async event => {
		event.preventDefault()
		if(event.target.user.value !== "") {
			router.push(`/bookings?user=${event.target.user.value}`)
		} else if((event.target.endDate1.value !== "") && (event.target.endDate2.value !== "")) {
			router.push(`/bookings?endDate1=${event.target.endDate1.value}&endDate2=${event.target.endDate2.value}`)
		} else if((event.target.startDate1.value !== "") && (event.target.startDate2.value !== "")) {
			router.push(`/bookings?startDate1=${event.target.startDate1.value}&startDate2=${event.target.startDate2.value}`)
		} else {
			router.push(`/bookings`)
		}
	}

	function filterNone() {
		setStartDate1("")
		setStartDate2("")
		document.getElementById("startDate1").value = ""
		document.getElementById("startDate2").value = ""
		document.getElementById("startDates").style.display = "none"

		setEndDate1("")
		setEndDate2("")
		document.getElementById("endDate1").value = ""
		document.getElementById("endDate2").value = ""
		document.getElementById("endDates").style.display = "none"

		setUser("")
		document.getElementById("user").value = ""
		document.getElementById("user").style.display = "none"

		document.getElementById("submit").style.display = "none"
		document.getElementById("submit").click();
	}

	function filterStartDates() {
		setStartDate1("")
		setStartDate2("")
		document.getElementById("startDate1").value = ""
		document.getElementById("startDate2").value = ""
		document.getElementById("startDates").style.display = "block"

		setEndDate1("")
		setEndDate2("")
		document.getElementById("endDate1").value = ""
		document.getElementById("endDate2").value = ""
		document.getElementById("endDates").style.display = "none"

		setUser("")
		document.getElementById("user").value = ""
		document.getElementById("user").style.display = "none"

		document.getElementById("submit").style.display = "block"
		document.getElementById("submit").click();
	}

	function filterEndDates() {
		setStartDate1("")
		setStartDate2("")
		document.getElementById("startDate1").value = ""
		document.getElementById("startDate2").value = ""
		document.getElementById("startDates").style.display = "none"
		
		setEndDate1("")
		setEndDate2("")
		document.getElementById("endDate1").value = ""
		document.getElementById("endDate2").value = ""
		document.getElementById("endDates").style.display = "block"
		
		setUser("")
		document.getElementById("user").value = ""
		document.getElementById("user").style.display = "none"

		document.getElementById("submit").style.display = "block"
		document.getElementById("submit").click();
	}

	function filterUser() {
		setStartDate1("")
		setStartDate2("")
		document.getElementById("startDate1").value = ""
		document.getElementById("startDate2").value = ""
		document.getElementById("startDates").style.display = "none"

		setEndDate1("")
		setEndDate2("")
		document.getElementById("endDate1").value = ""
		document.getElementById("endDate2").value = ""
		document.getElementById("endDates").style.display = "none"

		setUser("")
		document.getElementById("user").value = ""
		document.getElementById("user").style.display = "block"

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
					<Dropdown.Item onClick={filterStartDates}>
						Fechas de inicio
					</Dropdown.Item>
					<Dropdown.Item onClick={filterEndDates}>
						Fechas de fin
					</Dropdown.Item>
					<Dropdown.Item onClick={filterUser}>
						Reservador
					</Dropdown.Item>
				</Dropdown>

				<form onSubmit={handleSubmit}>
					<TextInput id="user" 
						name="user" 
						value={userValue}
						placeholder="Apodo del reservador"
						className="pt-4 w-96"
						onChange={ (event) => setUser(event.target.value)}
						style={{display: "none"}}/>

					<div id="endDates" className="w-96" style={{display: "none"}}>
						<TextInput id="endDate1" 
							name="endDate1" 
							value={endDate1Value}
							placeholder="Fecha de fin mínima"
							onChange={ (event) => setEndDate1(event.target.value)}/>

						<TextInput id="endDate2" 
							name="endDate2" 
							value={endDate2Value}
							className="pt-4"
							placeholder="Fecha de fin máxima"
							onChange={ (event) => setEndDate2(event.target.value)}/>
					</div>	

					<div id="startDates" className="w-96" style={{display: "none"}}>
						<TextInput id="startDate1" 
							name="startDate1" 
							value={startDate1Value}
							placeholder="Fecha de inicio mínima"
							onChange={ (event) => setStartDate1(event.target.value)}/>
						
						<TextInput id="startDate2" 
							name="startDate2" 
							className="pt-4"
							value={startDate2Value}
							placeholder="Fecha de inicio máxima"
							onChange={ (event) => setStartDate2(event.target.value)}/>
					</div>

					<div className="flex-col flex items-center">
						<Button id="submit" type="submit" className="my-4" style={{display: "none"}}>
							Buscar
						</Button>
					</div>
			</form>

				<Card>
					<div className="flex items-center justify-center">
						<h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Reservas</h5>
					</div>

					<ul className="divide-y divide-gray-200 dark:divide-gray-700">

						{bookings && bookings.length > 0 ? (
							bookings.map((booking) => {
								return (
									<li className="py-3 sm:py-4">
										<div className="flex items-center space-x-4">
											
											<div className="min-w-0 flex-1">
												<p className="truncate font-medium text-gray-900 dark:text-white">{(booking.startDate).split('T')[0] + " → " + (booking.endDate).split('T')[0]} </p>
												<p className="truncate text-gray-500 dark:text-gray-400">Usuario: {booking.user}</p>
												<p className="truncate text-gray-500 dark:text-gray-400">Alojamiento: {booking.housing}</p>
											</div>

											<Link href={`booking/?id=${booking._id}`} passHref><Button>Ver reserva</Button></Link>
											
										</div>
									</li>
								)
						}))
						:
						(
							<div className="flex flex-col w-full h-full items-center justify-center">
								<span>No hay resultados en esta lista</span>
							</div>
						)
					}
					</ul>

				</Card>

			</div>
		</>
	)
}

export async function getServerSideProps(ctx){
	if((ctx.query).user !== undefined) {
		const {user} = ctx.query 

		const bookings = await fetch(`http://localhost:3000/api/bookings/user/${user}`)
		.then(response => response.json())

		return {
			props:{
				bookings
			}
		}
	}

	if(((ctx.query).endDate1 !== undefined) && ((ctx.query).endDate2 !== undefined)) {
		const {endDate1} = ctx.query
		const {endDate2} = ctx.query 

		const bookings = await fetch(`http://localhost:3000/api/bookings/endDates/${endDate1}/${endDate2}`)
		.then(response => response.json())

		return {
			props:{
				bookings
			}
		}
	}


	if(((ctx.query).startDate1 !== undefined) && ((ctx.query).startDate2 !== undefined)) {
		const {startDate1} = ctx.query
		const {startDate2} = ctx.query 

		const bookings = await fetch(`http://localhost:3000/api/bookings/startDates/${startDate1}/${startDate2}`)
		.then(response => response.json())

		return {
			props:{
				bookings
			}
		}
	}

	const bookings = await fetch(`http://localhost:3000/api/bookings`)
		.then(response => response.json())

		return {
			props:{
				bookings
			}
		}
}

export default Bookings