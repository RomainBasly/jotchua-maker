export function defineMaxScreenWidth() {
  const screenWidth = window.screen.width;
  let maxSize;

  if (screenWidth < 320) {
    maxSize = 280;
  } else if (screenWidth < 360) {
    maxSize = 300;
  } else if (screenWidth < 400) {
    maxSize = 360;
  } else if (screenWidth < 600) {
    maxSize = 400;
  } else {
    maxSize = 500;
  }

  return Math.min(maxSize, 500);
}
export function defineMaxScreenHeight() {
  const screenWidth = window.screen.height;
  let maxSize;

  if (screenWidth < 600) {
    maxSize = 300;
  } else if (screenWidth < 800) {
    maxSize = 325;
  } else if (screenWidth < 900) {
    maxSize = 350;
  } else {
    maxSize = 450;
  }

  return Math.min(maxSize, 450);
}
