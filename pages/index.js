import { Button, Carousel, TextInput } from "flowbite-react"
import NavbarItem from "../components/navbar"

const Home = (props) => {
  
	return (
		
		<div className="flex flex-col w-full h-screen">

			<div>
				<NavbarItem />
			</div>

			<div className="relative flex flex-row w-full h-full ">
				
				{/** Busqueda */}
				<div className="flex flex-col w-full justify-center items-center">
					<div className="flex flex-col w-1/2">
						<p className="text-5xl font-semibold text-gray-900 py-12">Alojamientos para todos los gustos</p>
						<TextInput className="pb-4" placeholder=" Buscar alojamientos"/>
						<Button>Buscar</Button>
					</div>
				</div>

				{/** Imagen */}
				<div className= "relative flex flex-col w-full h-full p-24">
					<Carousel className="h-full">
						<img src="https://images.unsplash.com/photo-1612972735944-ed73dd220d21?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80" alt="Imagen carousel 1"/>
						<img src="https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="Imagen carousel 2"/>
						<img src="https://images.unsplash.com/photo-1614485294972-5724216bf796?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80" alt="Imagen carousel 3"/>	
						<img src="https://images.unsplash.com/photo-1502700559166-5792585222ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=691&q=80" alt="Imagen carousel 4"/>
					</Carousel>
				
				</div>
				
			</div>

		</div>

  )
}

export default Home
