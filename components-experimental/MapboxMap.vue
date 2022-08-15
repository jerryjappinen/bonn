<script>
import 'mapbox-gl/dist/mapbox-gl.css'

export default {

  props: {

    accessToken: {
      type: String,
      required: true
    },

    lon: {
      type: Number,
      required: true
    },

    lat: {
      type: Number,
      required: true
    },

    mapStyle: {
      type: String,
      required: false
    },

    zoom: {
      type: Number,
      default: 13
    }

  },

  data () {
    return {
      map: null,
      marker: null
    }
  },

  computed: {

    coordinates () {
      return [this.lon, this.lat]
    }

  },

  mounted () {
    this.mountMap()
  },

  beforeDestroy () {
    this.removeMap()
  },

  methods: {

    // NOTE: don't call this server-side
    mountMap () {
      const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js')

      mapboxgl.accessToken = this.accessToken

      // Initialize the map
      this.map = new mapboxgl.Map({
        container: this._uid + '-map',
        style: this.mapStyle,
        center: this.coordinates,
        zoom: this.zoom,
        pitch: 65,
        minZoom: 5,
        maxZoom: 20,
        attributionControl: false
      })

      if (this.map) {
        this.marker = new mapboxgl.Marker({
          color: 'white'
        })
          .setLngLat(this.coordinates)
          .addTo(this.map)
      }

    },

    removeMap () {

      if (this.marker) {
        this.marker.remove()
      }

      if (this.map) {
        this.map.remove()
      }

    }

  }

}
</script>

<template>
  <div class="c-mapbox-map">
    <div
      :id="_uid + '-map'"
      ref="mapContainer"
      class="c-mapbox-map-container"
    />
  </div>
</template>

<style lang="scss">

.c-mapbox-map,
.c-mapbox-map-container {
  width: 100%;
  height: 100%;
}

</style>
