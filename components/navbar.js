import { Navbar, Button } from "flowbite-react";

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

		<div className="flex md:order-2">
			<Button href="/new-user">
				Registrarse
			</Button>
			<Navbar.Toggle />
		</div>

		<Navbar.Collapse>
			<Navbar.Link href="/users"> Usuarios </Navbar.Link>

			<Navbar.Link href="/housings"> Viviendas </Navbar.Link>

			<Navbar.Link href="/bookings"> Reservas </Navbar.Link>

		</Navbar.Collapse>

	</Navbar>
	)
}

export default NavbarItem