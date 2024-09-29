<script setup>
import ControllerNode from '../controller/ControllerNode.vue';

const props = defineProps(['name', 'controllers']);

const flowSettings = {
  backgroundColor: "#FFFFF",
  borderColor: "#D12121",
  color: "black",
};
</script>

<template>
  <div
    class="flow-step-node"
    :style="{ backgroundColor: flowSettings.backgroundColor, color: flowSettings.color, borderColor: flowSettings.borderColor }"
  >
    <!-- Flow Name -->
    <span class="flow-step-title">{{ name }}</span>

    <!-- Grid Container for controllers -->
    <div class="controller-wrapper">
      <!-- Render all controllers inside this flow step -->
      <ControllerNode
        v-for="controller in controllers"
        :key="controller.controller_id"
        v-bind="controller"
      />
    </div>
  </div>
</template>

<style scoped>
.flow-step-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 10px;
  border: 2px solid;
  margin: 20px;
  width: fit-content;
  /* max-width: 100%; */
  /* box-sizing: border-box; */
}

.flow-step-title {
  font-weight: bold;
  margin-bottom: 10px;
}

.controller-wrapper {

  gap: 20px; /* Customize spacing between controllers */
  padding: 10px;
  width: 100%; /* Take up full width of the parent */
  max-width: 1000px; /* Limit the maximum width of the container */
  box-sizing: border-box;
}
</style>
