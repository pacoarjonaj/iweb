import NavbarItem from '../components/navbar'
import UserItem from '../components/user-item'

const Users = ({
	users
}) => {

	return (
		<>
			
			<NavbarItem />
			
			<div className="flex flex-col py-8 items-center">
				
				{ users.map((us) => {
					return (
						<UserItem
							key={us._id}
							user={us}
						/>
					)
				})

				}

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