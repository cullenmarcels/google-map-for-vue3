<script setup lang="ts">
import {GoogleMap, GoogleMarker} from '../src'
import GoogleAdvanceMarker from "@/components/GoogleAdvanceMarker.vue";
</script>

<template>
  <div class="google-map">
    <GoogleMap
        api-key="AIzaSyDGNKJhUV9bRrKH_4SeyCf4hr3KJa6_xd4"
        map-id="867abe83a2101fad"
        :center="{ lat: 25.033964, lng: 121.564468 }"
        :zoom="12"
        @map-click="(e) => console.log('地图点击', e.latLng?.toJSON())"
        @zoom-change="(z) => console.log('缩放等级', z)"
        @ready="(map) => console.log('地图已准备好', map)">
      <GoogleAdvanceMarker :position="{ lat: 25.033964, lng: 121.564468 }"/>
    </GoogleMap>
  </div>
</template>
<style scoped>
.google-map {
  display: block;
  width: 720px;
  height: 360px;
  margin: 40px auto;
}
</style>
