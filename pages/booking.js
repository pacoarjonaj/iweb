import { Avatar, Button } from "flowbite-react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import NavbarItem from "../components/navbar"
import MapItem from "../components/map"



const BookingProfile = ({
	booking
}) => {

	const router = useRouter()
	const [propertiesList, setProperties] = useState([])


	useEffect(() => {
		const getHousings = async() => {

			const housingList = await fetch(`http://localhost:3000/api/housings/owner/adminPaco`)
				.then(response => response.json())

			setProperties(housingList)
		}

		getHousings()
	},[])


	const deleteBooking = async() => {
		await fetch(
			`http://localhost:3000/api/bookings/${booking._id}`,{
				method: 'DELETE'
			})
			.then(router.push('/bookings'))
	}
	
	const containerStyle = {
		position: 'relative',
		width: '400px',
		height: '700px'
	}

	const center = {
		lat: booking.lat,
		lng: booking.lng
	}

	const [user, setUser] = useState([])
	useEffect(() => {
		const getUser = async() => {
			const user = await fetch(`http://localhost:3000/api/users/${booking.user}`)
				.then(response => response.json())
				setUser(user)
		}
		getUser()
	}, [])

	const [housing, setHousing] = useState([])
	useEffect(() => {
		const getHousing = async() => {
			const housing = await fetch(`http://localhost:3000/api/housings/${booking.housing}`)
				.then(response => response.json())
				setHousing(housing)
		}
		getHousing()
	}, [])

	return (
		<div className="flex flex-col">
			
				<NavbarItem />
			
			
			<div className="flex flex-col w-full h-full items-center justify-center space-y-4 py-10">

				<div className="flex flex-col w-full items-center space-y-2">
					

					<div className="flex flex-col pb-4 items-left">
							<p className="text-base text-center text-gray-400">{booking._id}</p>
							<p className="text-3xl font-medium text-gray-700">Reserva de <span className="text-3xl font-light text-gray-700">{user.name} {user.surname}</span> en <span className="text-3xl font-light text-gray-700">{housing.address}</span></p>
							<p className="text-normal font-medium">Desde <span className="text-normal font-light text-gray-700">{(booking.startDate).split('T')[0]}</span> hasta <span className="text-normal font-light text-gray-700">{(booking.endDate).split('T')[0]}</span></p>
					</div>

					<div className="flex flex-row justify-between space-x-2">
						<Button>
							<Link href={`edit-booking/?id=${booking._id}`} passHref>Editar reserva</Link>
						</Button>

						<Button onClick={deleteBooking} className="bg-orange-500 hover:bg-orange-700">Borrar reserva</Button>
					</div>
				</div>
				<div className="w-196 pt-4">	
						<MapItem
							containerStyle={containerStyle}
							center={center}
							zoom={9}
						/>
				</div>
			</div>	
		</div>
	)
}

export async function getServerSideProps(ctx){

	const {id} = ctx.query

	const booking = await fetch(`http://localhost:3000/api/bookings/${id}`)
		.then(response => response.json())

	return{
		props:{
			booking
		}
	}
}

export default BookingProfile