import { Card, Carousel } from "flowbite-react"
import Link from "next/link"
import { useRouter } from "next/router"

const HousingItem = ({
	housing
}) =>{

	const router = useRouter()

	const deleteHousing = async() => {
		await fetch(
			`http://localhost:3000/api/housings/${housing._id}`,{
				method: 'DELETE'
			})
			.then(router.push('/housings'))
	}
	
	return (

		<Link href={`/housing?id=${housing._id}`}>
			<Card className="w-full h-full flex-col flex cursor-pointer" imgSrc="https://flowbite.com/docs/images/blog/image-1.jpg" alt="imagen alojamiento">
				<div className="flex-col flex justify-start">
				<p className="w-full truncate text-xl font-bold text-gray-900">{housing.location}</p>
				<p className="w-full truncate text-lg font-normal text-gray-700">{housing.title}</p>
					<div className="w-full flex flex-row">
						<p className="text-sm font-bold text-gray-600 pr-1">{housing.price } </p>
						<p className="text-sm font-thin"> € noche </p>
					</div>
				</div>

			</Card>
		</Link>
	)
}

export default HousingItem