const api_key = '0d015059df534415aa765ae8dae1e7b8'
const api_url = 'https://api.opencagedata.com/geocode/v1/geojson'

document.getElementById("submitter").addEventListener("click", function(event){
  const address = document.getElementById("address").value
  const r = `${api_url}?q=${encodeURIComponent(address)}&key=${encodeURIComponent(api_key)}&pretty=1`

  fetch(r)
    .then(res => res.json())
    .then(data => {
      let max = data.features[0]
      let maxIndex = 0
      for(let i=0; i<data.features.length; i++){
        if (data.features[i] > max){
            maxIndex = i
            max = data.features[i]
        }
      }
      const coords = data.features[maxIndex].geometry.coordinates
      const isInMap = isAddressInMap(coords)
      const markerIcon = L.icon({
        iconUrl: isInMap ? 'flood.png' : 'house.png',
        iconSize: [40, 40],
        iconAnchor: [20, 20]
      })
      const l_coords = [coords[1], coords[0]]
      L.marker(l_coords, {icon: markerIcon}).addTo(map)
      map.setView(l_coords, 30)
    })

  event.preventDefault()
});
