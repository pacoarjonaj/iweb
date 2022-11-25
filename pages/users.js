import { Button, Card } from 'flowbite-react'
import Link from 'next/link'
import NavbarItem from '../components/navbar'


const Users = ({
	users
}) => {

	return (
		<>
			
			<NavbarItem />
			
				<div className="flex flex-col py-20 items-center">
				
				<Card>
					<div className="mb-4 flex items-center justify-center">
						<h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Lista de Usuarios</h5>
					</div>

					<ul className="divide-y divide-gray-200 dark:divide-gray-700">

						{users && users.length > 0 ? (
							users.map((user) => {
								return (
									<li className="py-3 sm:py-4">
										<div className="flex items-center space-x-4">
											<div className="shrink-0">
												<img className="h-8 w-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"/>
											</div>
											
											<div className="min-w-0 flex-1">
												<p className="truncate text-sm font-medium text-gray-900 dark:text-white">{user.name + " " + user.surname} </p>
												<p className="truncate text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
											</div>

												<Link href={`user-profile/?id=${user._id}`} passHref><Button>Ver perfil</Button></Link>
											
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

export async function getServerSideProps(){

	const users = await fetch(`http://localhost:3000/api/users`)
		.then(response => response.json())

		return {
			props:{
				users
			}
		}
}

export default Users