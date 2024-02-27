export function clamp(num: number, lower?: number, upper?: number) {
  if (num === num) {
    if (upper !== undefined) {
      num = num <= upper ? num : upper
    }
    if (lower !== undefined) {
      num = num >= lower ? num : lower
    }
  }
  return num
}

function loadImage(url: string, callback: (this: GlobalEventHandlers, ev: Event) => void) {
  const img = new Image()
  img.crossOrigin = 'anonymous'
  img.src = url
  img.onload = callback
  return img
}

export function loadImages(urls: string[], callback: (images: HTMLImageElement[]) => void) {
  const images: HTMLImageElement[] = []
  let imagesToLoad = urls.length

  // Called each time an image finished loading.
  const onImageLoad = function () {
    imagesToLoad -= 1
    // If all the images are loaded call the callback.
    if (imagesToLoad === 0) {
      callback(images)
    }
  }

  for (let i = 0; i < urls.length; i++) {
    const img = loadImage(urls[i], onImageLoad)
    images.push(img)
  }
}
