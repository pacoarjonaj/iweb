import Link from "next/link"
import NavbarItem from "../components/navbar"

const Home = (props) => {
  
	return (
		<>

			<NavbarItem />

			<div className="w-full flex flex-col space-y-10 py-50 items-center font-semibold">
				<div className="flex flex-col space-y-5 py-60 justify-center items-center">
					<Link href="/users">
						<a>Mostrar lista de usuarios</a>
					</Link>

					<Link href="/housings">
						<a>Mostrar lista de viviendas</a>
					</Link>

					<Link href="/bookings">
					<a>Mostrar lista de reservas</a>
					</Link>
				</div>
			</div>	
		</>
  )
}

export default Home
