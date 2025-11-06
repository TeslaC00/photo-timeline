import Viewport from "./viewport";

/*
Website with a cool design of showing my japan trips photos in a timeline of areas instead of 
years where each timeline event(year) is an area and that area has a core image on it and a lot 
smaller scattered images of that area around it which glows up when you hover over them and when 
you click on them they appear on the screen with a fancy animation. and you can scroll the 
timeline for different locations.

Plan:
Have a lot images in backgorund with black effect covering them and hiding them, can only see the 
images around center and have to use mouse to see other which has a glow effect to show images 
underneath. The images if are a lot and not fit in screen then will be like a chart or map where 
window is like a view port and images world is a lot big and use your mouse drag to move around.
When you move around the center image is removed and you can see the web of images without it. Then 
when you click on any image it will come up on the screen with some animation and effect focused and 
when you unfocus it is removed with some animation or effect and look at the images again.
Have a button to go back to timeline where the center image comes back and you can see it again.
If you scroll you will get pass the current timeline into the next one with other images slowly 
showing themselves in center, the images not around center load later and will have same dark effect.
Each timeline is of different location with photos of different areas as supplied by google photos 
or drive.
Images appear in a brick like grid pattern with a little glow or shiny border around with black and 
dark backgorund on the page.
Maybe make the image in the center bigger by default in timeline or zoom out and when you click else 
or click on next image an animation to make it small and fit then the other image is shown.

Stats:
Background Image width - 120px (looks good)
Centre/Main Image width - ?
*/

// TODO: Feature convert timeline to radial dial from linear timeline
// TODO: Feature the grid cell size - it does not expand dynamically based on screen size and causes
//       issue when filling images when factors are not good
// TODO: Feature add zoom for world grid with mouse wheel by adding scale in style and modify the css cell dimension variables
/**
 * It shows as a small bubble like dot and when we hover it open up from left to right with animation
 * then we can select and choose the location we want to see or scroll to go to next location
 */

function App() {
  // return <BrickGrid length={24} />;
  return <Viewport />;
}

export default App;
