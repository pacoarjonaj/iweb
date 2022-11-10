import Link from "next/link"
import { Card, Dropdown } from "flowbite-react"
import { useRouter } from "next/router"

const UserItem = ({
	user
}) => {

	const router = useRouter()

	const deleteUser = async() => {
		await fetch(
			`http://localhost:3000/api/users/${user._id}`,{
				method: 'DELETE'
			})
			.then(router.push('/users'))
	}

	return (
		<>
		<div className="w-80 py-4">
  			<Card>
   	 			<div className="flex justify-end px-4 pt-4">
      				<Dropdown inline={true} label="">

						<Dropdown.Item>
							<a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">
								Dropdown 1
							</a>
						</Dropdown.Item>

        				<Dropdown.Item>
							<a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">
								Dropdown 2
							</a>
        				</Dropdown.Item>
        
						<Dropdown.Item>
							<a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">
								Dropdown 3
							</a>
        				</Dropdown.Item>
     				</Dropdown>
    			</div>

    			<div className="flex flex-col items-center pb-10">
					<img
						className="mb-3 h-24 w-24 rounded-full shadow-lg"
						src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
						alt="Bonnie image"
					/>
					<h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white"> {user.name} </h5>
					<span className="text-sm text-gray-500 dark:text-gray-400"> {user.email} </span>
     					
						 <div className="mt-4 flex space-x-3 lg:mt-6">
						 	<button className="inline-flex items-center rounded-lg bg-blue-500 py-2 px-4 text-center text-sm font-medium text-white hover:bg-blue-600 cursor-pointer">
								<Link href={`edit-user/?id=${user._id}`} passHref>Editar perfil</Link>
							</button>
							<button onClick={deleteUser} className="inline-flex items-center rounded-lg bg-orange-500 py-2 px-4 text-center text-sm font-medium text-white hover:bg-orange-600 cursor-pointer">
								Borrar perfil
							</button>
      					</div>
    			</div>

  			</Card>
		</div>
		</>
	)
}

export default UserItem