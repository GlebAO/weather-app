export const getCurrentPosition = function ({enableHighAccuracy = false, timeout = 0, maximumAge = Infinity} = {}): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {

    if (!navigator || !navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'))
    }

    navigator.geolocation.getCurrentPosition(
      (coords: GeolocationPosition) => {
        resolve(coords)
      },
      (error: GeolocationPositionError) => {
        reject(error)
      },
      {enableHighAccuracy, timeout, maximumAge}
    );
  })
}