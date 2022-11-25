import { Map, GoogleApiWrapper } from "google-maps-react"

const MapItem = ({
	google,
	containerStyle,
	center,
	zoom
}) => {

	return (
		<div className="relative flex flex-col w-full h-full">
			<Map
				google = {google}
				zoom = {zoom}
				initialCenter = {center}
				containerStyle = {containerStyle}
			>

			</Map>
		</div>
	)
}

export default GoogleApiWrapper({
	apiKey: "AIzaSyAm-ikI0oB0HyRcqaxlP4ObvaMyr16wQ5c",
	language: 'ES'
})(MapItem)