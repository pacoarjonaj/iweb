import { Button, Card, TextInput, Dropdown } from 'flowbite-react'
import { useState } from "react"
import { useRouter } from "next/router"
import NavbarItem from '../components/navbar'

const Madrid = ({weather, pollution}) => {
	const router = useRouter()
	const [dateValue, setDate] = useState(weather.date)
	const [pollutantValue, setPollutant] = useState(pollution.pollutant)

	const handleSubmitWeather = async event => {
		event.preventDefault()
		if(event.target.date.value !== "") {
			router.push(`/madrid?date=${event.target.date.value}`)
		} else {
			router.push(`/madrid`)
		}
	}

	const handleSubmitPollution = async event => {
		event.preventDefault()
		if(event.target.pollutant.value !== "") {
			router.push(`/madrid?pollutant=${event.target.pollutant.value}`)
		} else {
			router.push(`/madrid`)
		}
	}

	return (
		<>
			
			<NavbarItem/>
			
				<div className="flex flex-col py-10 items-center">
				
				<form onSubmit={handleSubmitWeather}>
					<div className="pb-4 w-96">
						<TextInput id="date" 
							name="date" 
							value={dateValue}
							placeholder="Fecha de predicción"
							onChange={ (event) => setDate(event.target.value)}
						/>
					</div>

					<div className="flex-col pb-4 flex items-center">
						<Button id="submit" type="submit">
							Buscar
						</Button>
					</div>
				</form>


				<Card>
					<div className="flex items-center justify-center">
						<h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Tiempo</h5>
					</div>

					<ul className="divide-y divide-gray-200 dark:divide-gray-700">

						{weather && weather.length > 0 ? (
							weather.map((weather) => {
								return (
									<li className="py-3 sm:py-4">
										<div className="flex items-center space-x-4">											
											<div className="min-w-0 flex-1">
												<p className="truncate font-medium text-gray-900 underline dark:text-white">{weather.fecha} </p>
												<p className="truncate font-medium text-gray-900 dark:text-white">{weather.estadoCieloDescripcion}, {weather.probPrecipitacion}%</p>
												<p className="truncate text-gray-500 dark:text-gray-400">Temperatura máxima: {weather.temperaturaMaxima}</p>
												<p className="truncate text-gray-500 dark:text-gray-400">Temperatura mínima: {weather.temperaturaMinima}</p>
											</div>											
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

				<form onSubmit={handleSubmitPollution}>
					<div className="py-4 pt-8 w-96">
						<TextInput id="pollutant" 
							name="pollutant" 
							value={pollutantValue}
							placeholder="Contaminante"
							onChange={ (event) => setPollutant(event.target.value)}
						/>
					</div>

					<div className="flex-col pb-4 flex items-center">
						<Button id="submit" type="submit">
							Buscar
						</Button>
					</div>
				</form>

				<Card>
					<div className="flex items-center justify-center">
						<h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Contaminación</h5>
					</div>

					<ul className="divide-y divide-gray-200 dark:divide-gray-700">

						{pollution && pollution.length > 0 ? (
							pollution.map((pollution) => {
								return (
									<li className="py-3 sm:py-4">
										<div className="flex items-center space-x-4">											
											<div className="min-w-0 flex-1">
											<p className="truncate font-medium text-gray-900 underline dark:text-white">{((pollution.Fecha).split('T')[0]).substring(0, 4) + "-" + ((pollution.Fecha).split('T')[0]).substring(4, 6) + "-" + ((pollution.Fecha).split('T')[0]).substring(6, 9)} </p>
												<p className="truncate font-medium text-gray-900 dark:text-white">Contaminante: {pollution.Contaminante} </p>
												<p className="truncate font-medium text-gray-900 dark:text-white">Concentración: {(pollution.Concentración == null) ? "N/A" : pollution.Concentración}</p>
											</div>											
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

export async function getServerSideProps(ctx) {
	if((ctx.query).pollutant !== undefined) {
		const {pollutant} = ctx.query 

		const allWeather = await fetch(`http://localhost:3001/api/madrid/weather`).then(response => response.json())
		const weather = [allWeather[0], allWeather[1], allWeather[2], allWeather[3], allWeather[4]]

		const allPollution = await fetch(`http://localhost:3001/api/madrid/pollution/pollutant/${pollutant}`).then(response => response.json())
		const pollution = [allPollution[0], allPollution[1], allPollution[2], allPollution[3], allPollution[4]]

		
		return {
			props:{
				weather,
				pollution
			}
		}
	}

	if((ctx.query).date !== undefined) {
		const {date} = ctx.query 

		const weather = await fetch(`http://localhost:3001/api/madrid/weather/date/${date}`)
		.then(response => response.json())

		const allPollution = await fetch(`http://localhost:3001/api/madrid/pollution`).then(response => response.json())
		const pollution = [allPollution[0], allPollution[1], allPollution[2], allPollution[3], allPollution[4]]
		
		return {
			props:{
				weather,
				pollution
			}
		}
	}

	const allWeather = await fetch(`http://localhost:3001/api/madrid/weather`).then(response => response.json())
	const weather = [allWeather[0], allWeather[1], allWeather[2], allWeather[3], allWeather[4]]

	const allPollution = await fetch(`http://localhost:3001/api/madrid/pollution`).then(response => response.json())
	const pollution = [allPollution[0], allPollution[1], allPollution[2], allPollution[3], allPollution[4]]

		return {
			props:{
				weather,
				pollution
			}
		}
}


export default Madrid