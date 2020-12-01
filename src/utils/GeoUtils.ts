export const detectLocation = function():Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
        const defaultSettings = {
            enableHighAccuracy: false,
            timeout: Infinity,
            maximumAge: 0,
          };
      
          if (!navigator || !navigator.geolocation) {
            console.log('error')
          }

          navigator.geolocation.getCurrentPosition(
            (coords: GeolocationPosition) => {
                resolve(coords)
            },
            (error: GeolocationPositionError) => {
                reject(error)
            },
            defaultSettings
          );
    })
  }