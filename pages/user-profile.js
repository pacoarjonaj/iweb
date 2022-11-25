import { Avatar, Button } from "flowbite-react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import NavbarItem from "../components/navbar"



const UserProfile = ({
	user
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


	const deleteUser = async() => {
		await fetch(
			`http://localhost:3000/api/users/${user._id}`,{
				method: 'DELETE'
			})
			.then(router.push('/users'))
	}


	function property(house) {
		return(
			<Link href={`/housing?id=${house._id}`} passHref>
				<div className='flex-none cursor-pointer'>
					<div className='flex flex-col w-auto h-103 space-y-4' key={house._id}>
						{/** Imagen del alojamiento */}
						<div>
							<img className='object-cover w-108 h-60 rounded-lg' src={'https://flowbite.com/docs/images/blog/image-1.jpg'} alt='Imagen del alojamiento' />
						</div>

						{/** Datos del alojamiento */}
						<div className='flex flex-col items-start space-y-4'>
							<div className='flex flex-col items-start space-y-0'>
								<p className='text-2xl font-semibold'>{house.title}</p>
								<div className='flex flex-row justify-start space-x-1.5'>
									<p className='text-sm text-gray-400'>{house.location}</p>
								</div>
							</div>

							{/** Barra inferior info propietario */}
							<div className='flex flex-row w-full justify-between'>
								<Link href={``} passHref>
									<div className='flex flex-row justify-start space-x-2'>
										<div>
											<img className='object-cover w-10 h-10 rounded-full' src={'https://flowbite.com/docs/images/people/profile-picture-5.jpg'} alt='Imagen del creador' />
										</div>
										<div className='flex flex-col items-start space-y-0'>
											<p className='text-sm'>{user.name}</p>
											<p className='text-xs text-gray-400'>4,5 sobre 5 valoraciones</p>
										</div>
									</div>
								</Link>

							</div>
						</div>

					</div>
				</div>
			</Link>
		)
	}
	

	return (
		<div className="flex flex-col">
			
				<NavbarItem />
			
			
			<div className="flex flex-col w-full h-full items-center justifiy-center space-y-10 py-20">

				{/** Foto y datos */}
				<div className="flex flex-col w-full items-center space-y-2">
					<div className="flex flex-col w-full h-full items-center justify-center space-y-4 px-6">
						<Avatar
							img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" size="xl" rounded={true}/>
					</div>
					

					<div className="flex flex-col items-center">
							<p className="text-3xl font-medium text-gray-700">{user.name} {user.surname}</p>
							<p className="text-base text-gray-400 pb-4">{"@" + user.username}</p>

							<div className="flex flex-row justifiy-center space-x-2">
								<p className="text-base text-gray-400">4,5 sobre 5</p>
								<p className="text-base text-gray-400">·</p>
								<p className="text-base text-gray-400">{propertiesList.length} viviendas</p>
							</div>
					</div>

					<div className="flex flex-row justify-between space-x-2">
						<Button>
							<Link href={`edit-user/?id=${user._id}`} passHref>Editar perfil</Link>
						</Button>

						{user._id == "636d57a75c1044b28b7fe9c8" ? (
							<Button className="bg-orange-500 hover:bg-orange-700">No Borrar</Button>
						)	
						:
							(
								<Button onClick={deleteUser} className="bg-orange-500 hover:bg-orange-700">Borrar Perfil</Button>
							)
						}
					</div>
				</div>

				{/** Alojamientos en propiedad */}
				<div className='flex flex-col w-full space-y-5'>
					<div className='flex flex-row justify-start space-x-4 p-6 md:pl-48'>
						<p className='text-2xl font-medium'>Alojamientos en propiedad</p>
						<p className='text-2xl text-gray-400'>{propertiesList.length}</p>
					</div>
					
					{/** Llamada al "item" */}
					<div className='overflow-auto hover:overflow-x-scroll flex flex-row justify-start space-x-2 px-6 md:pl-48 pb-4'>
						{(propertiesList.length > 0) && propertiesList.map((house, i) => {
							return (	
								property(house)
							)
						})}
						{(propertiesList.length === 0) && <p className='flex flex-col text-lg text-center text-gray-400 bg-gray-50 w-full justify-center items-center py-4 px-6 md:mr-48 rounded-lg'>
							Aquí aparecerán los alojamientos creados por este usuario
						</p>}
					</div>
				</div>


			</div>	

		</div>
	)
}

export async function getServerSideProps(ctx){

	const {id} = ctx.query

	const user = await fetch(`http://localhost:3000/api/users/${id}`)
		.then(response => response.json())

	return{
		props:{
			user
		}
	}
}

export default UserProfile