type Coordinates = {
  lat: number;
  lng: number;
};

type DirectionsOptions = {
  coordinates?: Coordinates;
  fallbackDestination: string;
};

export function getGoogleMapsDirectionsUrl({ coordinates, fallbackDestination }: DirectionsOptions) {
  const destination = hasValidCoordinates(coordinates)
    ? `${coordinates.lat},${coordinates.lng}`
    : fallbackDestination;
  const query = new URLSearchParams({
    api: "1",
    destination,
    travelmode: "driving"
  });

  return `https://www.google.com/maps/dir/?${query.toString()}`;
}

function hasValidCoordinates(coordinates?: Coordinates): coordinates is Coordinates {
  if (!coordinates) return false;

  return (
    Number.isFinite(coordinates.lat) &&
    Number.isFinite(coordinates.lng) &&
    coordinates.lat >= -90 &&
    coordinates.lat <= 90 &&
    coordinates.lng >= -180 &&
    coordinates.lng <= 180
  );
}
