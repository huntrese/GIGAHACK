<script setup>
import { BaseEdge, getBezierPath } from '@vue-flow/core';
import { computed, ref } from 'vue';

// Define props for the ControllerEdge component
const props = defineProps({
  id: { type: String, required: true },
  sourceX: { type: Number, required: true },
  sourceY: { type: Number, required: true },
  targetX: { type: Number, required: true },
  targetY: { type: Number, required: true },
  sourcePosition: { type: String, required: true },
  targetPosition: { type: String, required: true },
  markerStart: { type: String, default: 'arrowclosed' },
  color: { type: String, default: '#000' },
});

// Reactive property for hover state
const isHovered = ref(false);

// Calculate the bezier path for the edge
const path = computed(() => {
  return getBezierPath({
    sourceX: props.sourceX,
    sourceY: props.sourceY,
    targetX: props.targetX,
    targetY: props.targetY,
    sourcePosition: props.sourcePosition,
    targetPosition: props.targetPosition,
  });
});

// Dynamic edge styles including hover effect
const edgeStyle = computed(() => ({
  stroke: isHovered.value ? '#ff0000' : props.color, // Change color on hover
  strokeWidth: '2',
}));

</script>

<template>
  <BaseEdge
    :id="props.id"
    :path="path"
    :marker-end="props.markerEnd"
    :style="edgeStyle"
    @mouseover="isHovered = true"
    @mouseleave="isHovered = false"
  />
</template>
