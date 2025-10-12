import photosJson from "./photos.json";

export interface Photo {
  id: string;
  filename: string;
  location: string;
  description: string;
  alt: string;
  src: string;
}

export const photoData: Photo[] = photosJson;
export const photoLocations: string[] = [
  ...new Set(photosJson.map((photo) => photo.location)),
];
export const getPhotosByLocation: (location: string) => Photo[] = (
  location: string
) => {
  return photoData.filter((photo) => photo.location === location);
};
