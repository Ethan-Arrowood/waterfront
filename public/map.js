const map = L.map('map').setView([42.36, -71.06], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZXRoYW5hcnJvd29vZCIsImEiOiJjanVmdzdlMWgwaXI0NDNwa29ldTZhY2N3In0.PyFUAgcasA_CSfRRF8R02A', {
  maxZoom: 18,
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
    '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  id: 'mapbox.light'
}).addTo(map)

const geoJsonLayers = []
const geoJsonDataObj = [
  {
    url: '/data/9inch_Sea_Level_Rise_High_Tide.geojson',
    color: '#8BD3E6'
  },
  {
    url: '/data/21inch_Sea_Level_Rise_High_Tide.geojson',
    color: '#0082BA'
  },
  {
    url: '/data/36inch_Sea_Level_Rise_High_Tide.geojson',
    color: '#004F71'
  }
]

const geoJsonBoston = {
  url: '/data/City_of_Boston_Boundary.geojson',
  color: '#3f3f3f'
}

async function fetchData (dataObj) {
  await fetch(dataObj['url'])
    .then(res => res.json())
    .then(data => {
      const layer = L.geoJSON(data['features'], {style: {color: dataObj['color']}})
      geoJsonLayers.push(layer)
      layer.addTo(map)
    })
}

async function fetchAllGeoJson () {
  try {
    await fetchData(geoJsonDataObj[0])
    await fetchData(geoJsonDataObj[1])
    await fetchData(geoJsonDataObj[2])
    await fetchData(geoJsonBoston)
  } catch (err) {
    console.error(err)
  }
}

fetchAllGeoJson()

const legend = L.control({ position: 'topright' })
legend.onAdd = map => {
  const div = L.DomUtil.create('div', 'infoLegend')
  div.innerHTML += '<p style="color: #8BD3E6"><span style="font-size: 1.2rem">■</span> 9"</p>'
  div.innerHTML += '<p style="color: #0082BA"><span style="font-size: 1.2rem">■</span> 21"</p>'
  div.innerHTML += '<p style="color: #004F71"><span style="font-size: 1.2rem">■</span> 36"</p>'
  return div
}
legend.addTo(map)

// leafletPip.bassackwards = true
function isAddressInMap(point) {
  var isInMap = -1
  for(let i = geoJsonLayers.length-2; i >= 0; i--){
    const polys = leafletPip.pointInLayer(point, geoJsonLayers[i])
    console.log(polys)
    if (polys.length > 0) isInMap = i
  }
  return isInMap
}
