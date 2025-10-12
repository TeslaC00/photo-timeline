import photosJson from "./photos.json";

interface Photo {
  id: string;
  name: string;
  description: string;
  alt: string;
  src: string;
  location: string;
}

export const photoData: Photo[] = photosJson;
export const photoLocation: String[] = [
  ...new Set(photosJson.map((photo) => photo.location)),
];
export const photosOfLocation: (location: string) => Photo[] = (
  location: string
) => {
  return photoData.filter(
    (photo, _index, _photoData) => photo.location === location
  );
};
