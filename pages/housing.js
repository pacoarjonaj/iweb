import { Avatar, Button, TextInput } from "flowbite-react"
import Link from "next/link"
import { useRouter } from "next/router"
import NavbarItem from "../components/navbar"


const House = ({
	house,
	owner
}) => {

	const router = useRouter()

	const deleteHousing = async() => {
		await fetch(
			`http://localhost:3000/api/housings/${house._id}`,{
				method: 'DELETE'
			})
			.then(router.push('/housings'))
	}



	return (
		<div className="flex flex-col w-full h-screen">
			<NavbarItem />

			<div className="flex flex-col w-full items-center bg-red">

				{/** Contenido del alojamiento */}
				<div className="flex flex-col items-start w-auto h-full mx-96 my-16">

					{/** Titulo e Imagenes */}
					<div className="flex flex-col w-full h-full space-y-4">

						<div className="space-y-0">
							<h1 className="text-3xl font-semibold text-gray-800">{house.title}</h1>
							<div className="flex flex-row justifiy-center space-x-6">
								<div className="flex flex-row justifiy-center space-x-1">
									<p className="text-base text-gray-500">4,5 sobre 5</p>
									<p className="text-base text-gray-400">·</p>
									<p className="text-base text-gray-500">114 evaulaciones</p>
								</div>

								<div className="flex flex-row justifiy-center">
									<p className="text-base font-medium text-gray-500 underline underline-offset-1">{house.location}</p>
								</div>
							</div>
						</div>		

						<div className="relative w-full h-full">		
							<div className="relative grid grid-rows-2 grid-flow-col gap-x-5 gap-y-3">
								<div className="row-span-2 col-span-2"> <img className="border-none rounded-lg" src={"https://a0.muscache.com/im/pictures/24666488/cb9d2036_original.jpg?im_w=1200"} alt="Imagen 1"/> </div>
								<div> <img className="border-none rounded-lg" src={"https://a0.muscache.com/im/pictures/19536574/2e6a370b_original.jpg?im_w=720"} alt="Imagen 2"/> </div>
								<div> <img className="border-none rounded-lg"src={"https://a0.muscache.com/im/pictures/19536542/aa99bea6_original.jpg?im_w=720"} alt="Imagen 3"/></div>
								<div> <img className="border-none rounded-lg"src={"https://a0.muscache.com/im/pictures/45006093/d990c817_original.jpg?im_w=1200"} alt="Imagen 4"/></div>
								<div> <img className="border-none rounded-lg" src={"https://a0.muscache.com/im/pictures/45005972/5de8c60a_original.jpg?im_w=720"} alt="Imagen 5"/></div>		
							</div>
						</div>

					</div>

					{/** Propietario, descripción y reserva */}
					<div className="flex flex-row w-full h-full py-4 space-x-8">

						{/** Propietario y descripción */}
						<div className="flex flex-col w-full h-full divide-y divide-slate-200 space-y-4">
							<div className="flex flex-row justify-between">   
								<div className="flex flex-col">
									<p className="text-lg text-grey-800">Anfitrión: {owner.name + " " + owner.surname} </p>		
									<p className="text-sm text-grey-800">@ {owner.username} </p>	
								</div>

								<Link href={`user-profile/?id=${owner._id}`}>
									<Avatar className="cursor-pointer" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded={true}></Avatar>
								</Link>	
							</div>

							<div className="flex flex-col w-full py-8">
								<p className="text-base">{house.description}</p>
							</div>
						</div>

						{/** Reserva */}
						<div className="w-full">
								<div className="flex flex-col items-center py-16">
								<div className=" border border-black rounded-lg space-y-2">

									<div className="flex flex-col p-8">
										{/** Precio y evaluaciones */}
										<div className="flex flex-row w-full space-x-2 pb-6">
											<p className="text-2xl font-semibold text-gray-800">{house.price + "€"}</p>
											<p className="text-xl font-normal  text-gray-700">noche</p>
										</div>
										
										{/** Formulario para reservar y botón */}
										<form>
											
											<div className="flex flex-row space-x-2 pb-2">
												<div className="flex flex-col items-center">
													<label className="text-base text-gray-500">LLEGADA</label>
													<input className="border border-gray-300 rounded-md" type="date" id="startDate" name="startDate"/>
												</div>	
												<div className="flex flex-col items-center">
													<label className="text-base text-gray-500">SALIDA</label>
													<input className="border border-gray-300 rounded-md" type="date" id="endDate" name="endDate"/>
												</div>	
											</div>						
											<div className="flex flex-col w-auto space-y-2">
												<TextInput required={true} type="text" sizing="xl" id="guests" name="guests" placeholder="Número de huéspedes"/>
												<Button>Reservar</Button>
											</div>
										</form>	

									</div>
								</div>

								<div className="flex flex-row justify-between space-x-2 my-4">
								<Button>
									<Link href={`edit-housing/?id=${house._id}`} passHref>Editar alojamiento</Link>
								</Button>

								<Button onClick={deleteHousing} className="bg-orange-500 hover:bg-orange-700">
									Borrar Alojamiento
								</Button>
								</div>
							</div>
							</div>	

					</div>
					{/** Mapa */}
					{/** Compartir */}
				</div>
			</div>

		</div>
	)
}

export async function getServerSideProps(ctx){

	const {id} = ctx.query

	const house = await fetch(`http://localhost:3000/api/housings/${id}`)
		.then(response => response.json())

	const owner = await fetch(`http://localhost:3000/api/users/${house.owner}`)
		.then(response => response.json())


	return {
		props: {
			house,
			owner
		}
	}
}

export default House