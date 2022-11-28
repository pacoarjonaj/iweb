import { Button, TextInput, Dropdown } from 'flowbite-react'
import NavbarItem from "../components/navbar"
import HousingItem from "../components/housing-item"
import MapItem from "../components/map"

import { useState } from "react"
import { useRouter } from "next/router"

const Housings = ({
	housings
}) => {

	const router = useRouter()
	const [addressValue, setAddress] = useState(housings.address)
	const [price1Value, setPrice1] = useState(housings.price1)
	const [price2Value, setPrice2] = useState(housings.price2)
	const [ownerValue, setOwner] = useState(housings.owner)

	const handleSubmit = async event => {
		event.preventDefault()
		if(event.target.owner.value !== "") {
			router.push(`/housings?owner=${event.target.owner.value}`)
		} else if((event.target.price1.value !== "") && (event.target.price2.value !== "")) {
			router.push(`/housings?price1=${event.target.price1.value}&price2=${event.target.price2.value}`)
		} else if(event.target.address.value !== "") {
			router.push(`/housings?address=${event.target.address.value}`)
		} else {
			router.push(`/housings`)
		}
	}

	function filterNone() {
		setAddress("")
		document.getElementById("address").value = ""
		document.getElementById("address").style.display = "none"

		setPrice1("")
		setPrice2("")
		document.getElementById("price1").value = ""
		document.getElementById("price2").value = ""
		document.getElementById("prices").style.display = "none"

		setOwner("")
		document.getElementById("owner").value = ""
		document.getElementById("owner").style.display = "none"

		document.getElementById("submit").style.display = "none"
		document.getElementById("submit").click();
	}

	function filterAddress() {
		setAddress("")
		document.getElementById("address").value = ""
		document.getElementById("address").style.display = "block"

		setPrice1("")
		setPrice2("")
		document.getElementById("price1").value = ""
		document.getElementById("price2").value = ""
		document.getElementById("prices").style.display = "none"

		setOwner("")
		document.getElementById("owner").value = ""
		document.getElementById("owner").style.display = "none"

		document.getElementById("submit").style.display = "block"
		document.getElementById("submit").click();
	}

	function filterPrices() {
		setAddress("")
		document.getElementById("address").value = ""
		document.getElementById("address").style.display = "none"

		setPrice1("")
		setPrice2("")
		document.getElementById("price1").value = ""
		document.getElementById("price2").value = ""
		document.getElementById("prices").style.display = "block"

		setOwner("")
		document.getElementById("owner").value = ""
		document.getElementById("owner").style.display = "none"

		document.getElementById("submit").style.display = "block"
		document.getElementById("submit").click();
	}

	function filterOwner() {
		setAddress("")
		document.getElementById("address").value = ""
		document.getElementById("address").style.display = "none"

		setPrice1("")
		setPrice2("")
		document.getElementById("price1").value = ""
		document.getElementById("price2").value = ""
		document.getElementById("prices").style.display = "none"

		setOwner("")
		document.getElementById("owner").value = ""
		document.getElementById("owner").style.display = "block"

		document.getElementById("submit").style.display = "block"
		document.getElementById("submit").click();
	}

	return (
		<div className="flex flex-col w-full h-full">
			
			<div>
				<NavbarItem />
			</div>

			<div className="flex-col flex items-left px-4 pt-12">
				<form onSubmit={handleSubmit}>
					<Dropdown label="Filtro">
						<Dropdown.Item onClick={filterNone}>
							Ninguno
						</Dropdown.Item>
						<Dropdown.Item onClick={filterAddress}>
							Dirección
						</Dropdown.Item>
						<Dropdown.Item onClick={filterPrices}>
							Precio
						</Dropdown.Item>
						<Dropdown.Item onClick={filterOwner}>
							Propietario
						</Dropdown.Item>
					</Dropdown>

						<TextInput id="address" 
							name="address" 
							className="pt-4 w-96"
							value={addressValue}
							placeholder="Dirección"
							onChange={ (event) => setAddress(event.target.value)}
							style={{display: "none"}}
						/>

						<div id="prices" className="w-96" style={{display: "none"}}>
							<TextInput id="price1" 
								name="price1" 
								value={price1Value}
								placeholder="Precio mínimo"
								onChange={ (event) => setPrice1(event.target.value)}/>

							<TextInput id="price2" 
								name="price2" 
								className="pt-4"
								value={price2Value}
								placeholder="Precio máximo"
								onChange={ (event) => setPrice2(event.target.value)}/>
						</div>


						<TextInput id="owner" 
							name="owner" 
							value={ownerValue}
							className="w-96"
							placeholder="Apodo del propietario"
							onChange={ (event) => setOwner(event.target.value)}
							style={{display: "none"}}
						/>


					<div className="flex-col ">
						<Button id="submit" type="submit" className="mt-4" style={{display: "none"}}>
							Buscar
						</Button>
					</div>
				</form>
			</div>
			



			<div className="relative flex flex-row w-full flex-grow-0">
				{/** Alojamientos */}
				<div className="relative overflow-auto w-full h-full">
					<div className="relative grid grid-cols-5 grid-flow-row gap-8 p-4">
						
					{housings && housings.length > 0 ? (
						housings.map((house) => {
							return (
								<HousingItem
									key={house}
									housing={house}
								/>
							)
					}))
					:
					(
						<div className="flex flex-col w-full h-full items-center justify-center">
							<span>No hay resultados para esta búsqueda</span>
						</div>
					)
				}

					</div>
				</div>
			</div>

		</div>	
	)
}

export async function getServerSideProps(ctx){
	if((ctx.query).owner !== undefined) {
		const {owner} = ctx.query 

		const housings = await fetch(`http://localhost:3000/api/housings/owner/${owner}`)
		.then(response => response.json())

		return {
			props:{
				housings
			}
		}
	}

	if(((ctx.query).price1 !== undefined) && ((ctx.query).price2 !== undefined)) {
		const {price1} = ctx.query
		const {price2} = ctx.query 

		const housings = await fetch(`http://localhost:3000/api/housings/prices/${price1}/${price2}`)
		.then(response => response.json())

		return {
			props:{
				housings
			}
		}
	}

	if((ctx.query).address !== undefined) {
		const {address} = ctx.query 

		const housings = await fetch(`http://localhost:3000/api/housings/address/${address}`)
		.then(response => response.json())

		return {
			props:{
				housings
			}
		}
	}

	const housings = await fetch(`http://localhost:3000/api/housings`)
		.then(response => response.json())

		return {
			props:{
				housings
			}
		}
} 

export default Housings 


