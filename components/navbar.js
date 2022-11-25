import { Navbar, Button } from "flowbite-react"
import Link from "next/link"

const NavbarItem = () => {

	return (

	<Navbar
  		fluid={true}
  		rounded={true}
	>
  
		<Navbar.Brand href="http://localhost:3000">
			<img
				src="https://flowbite.com/docs/images/logo.svg"
				className="mr-3 h-6 sm:h-9"
				alt="IWEB"
			/>
			<span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
				IWEB
			</span>
		</Navbar.Brand>

		<Navbar.Collapse>
		    <Link href='/users'><a className="">Usuarios</a></Link> 
			<Link href='/housings'>Alojamientos</Link> 
			<Link href=''>Reservas</Link> 
		</Navbar.Collapse>

			
		<div className="flex-row flex pr-2">
			<div className="px-2">
				<Link href='new-user'><Button>Crear Usuario</Button></Link>
				<Navbar.Toggle />
			</div>

			<div className="px-2">
				<Link href='new-housing'><Button>Crear Alojamiento</Button></Link>
				<Navbar.Toggle />
			</div>
		</div>


	</Navbar>
	)
}

export default NavbarItem