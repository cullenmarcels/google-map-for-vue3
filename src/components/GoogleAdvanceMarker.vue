<template>
  <div v-if="marker"></div>
</template>

<script setup lang="ts">
import {ref, onMounted, onBeforeUnmount, watch, inject, type Ref} from "vue";
import type {Position} from "@/types/google-map.js";

interface Props {
  position: Position;
  draggable?: boolean;
  zIndex?: number;
  title?: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "click", event: google.maps.MapMouseEvent): void;
  (e: "dragend", position: google.maps.LatLngLiteral): void;
}>();

const map = inject<Ref<google.maps.Map | null>>("googleMap");
const marker = ref<google.maps.marker.AdvancedMarkerElement | null>(null);

onMounted(async () => {
  if (!map?.value) {
    console.error("Google Map instance not found");
    return;
  }

  if (!window.google || !google.maps.importLibrary) {
    console.error("Google Maps JS API not loaded yet.");
    return;
  }

  const {AdvancedMarkerElement} = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

  marker.value = new AdvancedMarkerElement({
    map: map.value,
    position: props.position,
    title: props.title ?? "",
  });

  marker.value.addListener("click", (e: google.maps.MapMouseEvent) => {
    emit("click", e);
  });
  marker.value.addListener("dragend", () => {
    if (marker.value?.position) {
      emit("dragend", marker.value.position as google.maps.LatLngLiteral);
    }
  });
});

watch(
    () => props.position,
    (newPos) => {
      if (marker.value) marker.value.position = newPos;
    }
);

watch(
    () => props.draggable,
    (val) => {
      if (marker.value) marker.value.gmpDraggable = !!val;
    }
);

watch(
    () => props.zIndex,
    (val) => {
      if (marker.value) marker.value.zIndex = val ?? 0;
    }
);

onBeforeUnmount(() => {
  if (marker.value) marker.value.map = null;
});
</script>
