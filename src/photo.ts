import manifestJson from "./manifest.json";

export interface PhotoJson {
  locations: {
    location: string;
    photos: Photo[];
  }[];
}

export interface Photo {
  id: string;
  alt: string;
  url: string;
}

export const photoData: PhotoJson = manifestJson;
export const photoLocations: string[] = [
  ...photoData.locations.map((loc) => loc.location),
];
export const getPhotosByLocation: (location: string) => Photo[] = (
  location: string
) => {
  const locationData = photoData.locations.find(
    (loc) => loc.location === location
  );
  return locationData ? locationData.photos : [];
};

export const getPhotosByLocationIndex: (index: number) => Photo[] = (
  index: number
) => {
  const location = photoLocations[index] || photoLocations[0];
  return getPhotosByLocation(location);
};
