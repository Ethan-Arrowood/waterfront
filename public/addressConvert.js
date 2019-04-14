const api_key = '0d015059df534415aa765ae8dae1e7b8'
const api_url = 'https://api.opencagedata.com/geocode/v1/geojson'

document.getElementById("submitter").addEventListener("click", function(event){
  const address = document.getElementById("address").value
  const r = `${api_url}?q=${encodeURIComponent(address)}&key=${encodeURIComponent(api_key)}&pretty=1`
  var divElement1 = document.querySelector("#floodDiv-9in");
  var classValues1 = divElement1.classList.replace("main", "hide");
  var divElement2 = document.querySelector("#floodDiv-21in");
  var classValues2 = divElement2.classList.replace("main", "hide");
  var divElement3 = document.querySelector("#floodDiv-36in");
  var classValues3 = divElement3.classList.replace("main", "hide");
  var divElement4 = document.querySelector("#noFloodDiv");
  var classValues4 = divElement4.classList.replace("main", "hide");
  fetch(r)
    .then(res => res.json())
    .then(data => {
      let max = data.features[0].properties.confidence
      let maxIndex = 0
      for(let i=0; i<data.features.length; i++){
        console.log(data.features[i].properties.confidence)
        if (data.features[i].properties.confidence > max){
            maxIndex = i
            max = data.features[i].properties.confidence
        }
      }
      const coords = data.features[maxIndex].geometry.coordinates
      const isInMap = isAddressInMap(coords)
      const markerIcon = L.icon({
        iconUrl: (isInMap >= 0) ? '/images/flood.png' : '/images/house.png',
        iconSize: [40, 40],
        iconAnchor: [20, 20]
      })
      if(isInMap == 0){
        var divElement = document.querySelector("#floodDiv-9in");
        var classValues = divElement.classList.replace("hide", "main");
        
      }
      else if (isInMap == 1){
        var divElement = document.querySelector("#floodDiv-21in");
        var classValues = divElement.classList.replace("hide", "main");
        
      }
      else if (isInMap == 2){
        var divElement = document.querySelector("#floodDiv-36in");
        var classValues = divElement.classList.replace("hide", "main");
      }
      else{
        var divElement = document.querySelector("#noFloodDiv");
        var classValues = divElement.classList.replace("hide", "main");
      }
      const l_coords = [coords[1], coords[0]]
      L.marker(l_coords, {icon: markerIcon}).addTo(map)
      map.setView(l_coords, 30)
    })

  event.preventDefault()
});
