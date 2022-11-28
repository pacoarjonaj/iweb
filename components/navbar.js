import { Navbar, Button } from "flowbite-react"
import Link from "next/link"

const NavbarItem = () => {
	return (
	<Navbar fluid={true} rounded={true}>
		<Navbar.Brand href="http://localhost:3000">
			<img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="IWEB"/>
			<span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">IWEB</span>
		</Navbar.Brand>

		<Navbar.Collapse>
			<Link href='/users'>Usuarios</Link> 
			<Link href='/housings'>Alojamientos</Link> 
			<Link href='/bookings'>Reservas</Link> 
			<a href='/madrid' className="underline">Madrid</a>
		</Navbar.Collapse>

		<div className="flex-row flex">
			<div className="px-2">
				<Link href='new-user'><Button>Crear usuario</Button></Link>
				<Navbar.Toggle/>
			</div>
			<div className="px-2">
				<Link href='new-housing'><Button>Crear alojamiento</Button></Link>
				<Navbar.Toggle/>
			</div>
			<div className="pl-2">
				<Link href='new-booking'><Button>Crear reserva</Button></Link>
				<Navbar.Toggle/>
			</div>
		</div>
	</Navbar>
	)
}

export default NavbarItem