import { Avatar, Button, TextInput } from "flowbite-react"
import Link from "next/link"
import { useRouter } from "next/router"
import NavbarItem from "../components/navbar"
import MapItem from "../components/map"
import { AdvancedImage } from "@cloudinary/react"
import {Cloudinary} from "@cloudinary/url-gen";
import {thumbnail} from "@cloudinary/url-gen/actions/resize";
import {byRadius} from "@cloudinary/url-gen/actions/roundCorners";
import {fill} from "@cloudinary/url-gen/actions/resize";

import {focusOn} from "@cloudinary/url-gen/qualifiers/gravity";
import {FocusOn} from "@cloudinary/url-gen/qualifiers/focusOn";


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

	const containerStyle = {
		position: 'relative',
		width: '400px',
		height: '700px'
	}
	
	const center = {
		lat: house.lat,
		lng: house.lng
	}

	const cld = new Cloudinary({
    cloud: {
      cloudName: "dbzi42o21"
    }
  });
	const myImage = cld.image(house.public_id)
	myImage.resize(fill().width(1000).height(700)).roundCorners(byRadius(10))

	const myImage2 = cld.image(owner.public_id)
	myImage2.resize(thumbnail().width(75).height(75).gravity(focusOn(FocusOn.face()))).roundCorners(byRadius(100))
	return (
		<div className="flex flex-col w-full h-screen">
			<NavbarItem />
			<div className="flex flex-col w-full items-center bg-red">
				<div className="flex flex-col items-start w-auto h-full mx-96 my-16">
					<div className="flex flex-col w-full h-full space-y-4">
						<div className="space-y-0">
							<p className="text-3xl font-semibold text-gray-800">{house.title}</p>
							<p className="text-base font-medium underline">{house.address}</p>
							<p className="text-base font-medium">{house.price}€ por noche</p>
							<p className="text-base text-gray-500">{house._id}</p>
						</div>		

						<div className="relative w-full">		
							<div className="flex flex-row gap-x-5">
								<AdvancedImage cldImg={myImage} />
								<MapItem
									containerStyle={containerStyle}
									center={center}
									zoom={9}
								/>
							</div>
						</div>

						<div className="flex flex-col w-10/12 h-full divide-y divide-slate-200 space-y-4">
							<div className="flex flex-row">
								<div className="flex flex-col">
									<Link href={`user/?id=${owner._id}`}>
									<AdvancedImage cldImg={myImage2} />
									</Link>	
								</div>
								<div className="flex flex-col pl-4">
									<p className="text-xl font-semibold underline text-grey-800">{owner.name + " " + owner.surname} </p>		
									<p className="text-grey-800 font-semibold">{owner.username} </p>	
									<p className="text-base text-gray-500">{owner._id}</p>
								</div>
							</div>

							<div className="flex flex-col w-full py-4">
								<p className="text-base">{house.description}</p>
								<div className="flex flex-row space-x-2 my-4">
									<Button>
										<Link href={`edit-housing/?id=${house._id}`} passHref>Editar alojamiento</Link>
									</Button>

									<Button onClick={deleteHousing} className="bg-orange-500 hover:bg-orange-700">
										Borrar alojamiento
									</Button>
									</div>
							</div>
						</div>
					</div>
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