<script setup lang="ts">
import { ref, shallowRef, onMounted, provide, watch } from 'vue'
import { useGoogleMapLoader } from '@/composables/useGoogleMapLoader.ts'
import type {Position} from "@/types/google-map.js";

const props = withDefaults(defineProps<{
  apiKey: string
  mapId: string
  center: Position
  zoom?: number
  draggable?: boolean
}>(), {
  zoom: 12,
  draggable: true
})
const isMapReady = ref(false);

// 定义 emits
const emit = defineEmits<{
  (e: 'map-click', event: google.maps.MapMouseEvent): void
  (e: 'zoom-change', zoom: number): void
  (e: 'ready', map: google.maps.Map): void
}>()

// 绑定 DOM
const mapElement = ref<HTMLDivElement | null>(null)

// 保存地图实例
const map = shallowRef<google.maps.Map>()

// provide 给子组件使用
provide('GoogleMap', map)

onMounted(async () => {
  await useGoogleMapLoader(props.apiKey)

  if (mapElement.value) {
    map.value = new google.maps.Map(mapElement.value, {
      center: props.center,
      mapId: props.mapId,
      zoom: props.zoom,
      draggable: props.draggable,
    })

    // 地图事件绑定
    map.value.addListener('click', (e: google.maps.MapMouseEvent) => {
      emit('map-click', e)
    })
    map.value.addListener('zoom_changed', () => {
      emit('zoom-change', map.value!.getZoom()!)
    })

    emit('ready', map.value)

    isMapReady.value = true;
  }
})

// 监听 props.center / props.zoom 改变
watch(() => props.center, (newVal) => {
  if (map.value) map.value.setCenter(newVal)
}, { deep: true })

watch(() => props.zoom, (newVal) => {
  if (map.value && newVal !== undefined) map.value.setZoom(newVal)
})
</script>

<template>
  <div ref="mapElement" class="google-map"></div>
  <slot v-if="isMapReady" />
</template>

<style scoped>
.google-map {
  width: 100%;
  height: 100%;
}
</style>