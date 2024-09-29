<script setup>
import { ref, onMounted } from 'vue';
import { VueFlow } from '@vue-flow/core';
import { Background } from '@vue-flow/background';
import { Controls } from '@vue-flow/controls';
import { MiniMap } from '@vue-flow/minimap';
import FlowStep from './nodes/fllowSteps/FlowStep.vue';
import json from './res/hierarchy.json';
import '@vue-flow/core/dist/style.css';

const jsonData = json;

// Function to create nodes from JSON data using polar coordinates with noise
const createNodesFromJson = (data) => {
  const flowNodes = [];
  const radius = 1000; // Set a fixed radius for the circular layout
  const angleInterval = (2 * Math.PI) / data.length; // Calculate angle interval based on the number of nodes
  const noiseFactor = 20; // Set a noise factor for random offset

  data.forEach((flowStep, index) => {
    const flowStepName = flowStep.name;

    // Extract controllers belonging to the current flow
    const controllers = [];
    ['FRIEND', 'ADVOCATE', 'MARKETING'].forEach(category => {
      if (flowStep[category]) {
        controllers.push(...flowStep[category].map(controller => ({
          name: controller.name,
          controller_id: controller.controller_id,
          journey_names: category,
          triggers: controller.triggers,
          actions: controller.actions,
          enabled: controller.enabled,
        })));
      }
    });

    // Calculate position using polar coordinates
    const angle = angleInterval * index; // Get the angle for the current node
    const x = radius * Math.cos(angle) + (Math.random() * noiseFactor - noiseFactor / 2); // Add noise to x
    const y = radius * Math.sin(angle) + (Math.random() * noiseFactor - noiseFactor / 2); // Add noise to y

    // Create a flow node (rectangle)
    const flowNode = {
      id: `flow-${flowStepName}`,
      position: { x, y },  // Use calculated position with noise
      data: { name: flowStepName, controllers },
      type: 'flowstep',
    };
    flowNodes.push(flowNode);
  });

  return { flowNodes };
};

const nodes = ref([]);
const edges = ref([]);

onMounted(() => {
  const { flowNodes } = createNodesFromJson(jsonData);
  nodes.value = [...flowNodes];
});
</script>

<template class="w-full">
  <VueFlow :nodes="nodes" fit-view-on-init elevate-edges-on-select>
    <MiniMap />
    <Controls position="top-left" />
    <Background />

    <!-- Flow Step Node -->
    <template #node-flowstep="flowNodes">
      <FlowStep v-bind="flowNodes.data" />
    </template>
  </VueFlow>
</template>
