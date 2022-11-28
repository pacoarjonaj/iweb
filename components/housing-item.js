import { Card, Carousel } from "flowbite-react"
import Link from "next/link"
import { useRouter } from "next/router"
import { AdvancedImage } from "@cloudinary/react"
import {Cloudinary} from "@cloudinary/url-gen";
import {thumbnail} from "@cloudinary/url-gen/actions/resize";
import {byRadius} from "@cloudinary/url-gen/actions/roundCorners";
import {focusOn} from "@cloudinary/url-gen/qualifiers/gravity";
import {FocusOn} from "@cloudinary/url-gen/qualifiers/focusOn";

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
	const cld = new Cloudinary({
		cloud: {
			cloudName: "dbzi42o21"
		}
	});
	const myImage = cld.image(housing.public_id)
	myImage.resize(thumbnail().width(400).height(250)).roundCorners(byRadius(10));
	return (

		<Link href={`/housing?id=${housing._id}`}>
			<Card className="w-full h-full flex-col flex cursor-pointer">
				<AdvancedImage cldImg={myImage} />
				<div className="flex-col flex justify-start">
				<p className="w-full truncate text-xl font-bold text-gray-900">{housing.title}</p>
				<p className="w-full truncate text-lg font-normal text-gray-700">{housing.address}</p>
					<div className="w-full flex flex-row">
						<p className="text-sm font-bold text-gray-600">{housing.price } </p>
						<p className="text-sm ">€ por noche </p>
					</div>
				</div>

			</Card>
		</Link>
	)
}

export default HousingItem