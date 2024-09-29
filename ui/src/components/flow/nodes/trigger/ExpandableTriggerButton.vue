<template>
  <div
    :class="['trigger-node']"
    :style="{ backgroundColor: triggerSettings.backgroundColor, color: triggerSettings.color, borderColor: triggerSettings.borderColor }" 
    class="explodable-trigger">

    <div @click="explodeTriggers" class="trigger-button">
      Triggers ({{ triggerNodes.length }})
    </div>
    
    <div v-if="exploded" @click="explodeTriggers" class="close-button">
      x
    </div>
    
    <div v-if="exploded" class="trigger-nodes-container">
      <div v-for="trigger in triggerNodes" :key="trigger.trigger_id" class="trigger-node-item">
        {{ trigger.trigger_name }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  triggerNodes: Array,
  addTriggerNodes: Function,
});

const triggerSettings = {
  backgroundColor: "#F6FFF8",
  borderColor: "#0B7A23",    
  color:"#0B7A23",
}

const exploded = ref(false);

const explodeTriggers = () => {
  if (props.triggerNodes.length > 0) {
    exploded.value = !exploded.value;
  }
};
</script>

<style scoped>
.explodable-trigger {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  border-radius: 50px;
  border: 2px solid;
  margin: 10px;
  position: relative;
}

.trigger-button {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 20px;
  color: #0B7A23;
}

.trigger-nodes-container {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  width: 50px;
  height: 50px;
  margin-top: 20px;
}

/* Styling for individual trigger nodes */
.trigger-node-item {
  background-color: #E0F7E0; 
  border: 1px solid #0B7A23;
  border-radius: 50%; 
  width: 60px; 
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
}

/* Positions for exploded trigger nodes */
.trigger-node-item:nth-child(1) { top: -85px; left: 50%; transform: translateX(-50%); }
.trigger-node-item:nth-child(2) { top: 50%; left: -90px; transform: translateY(-50%); }
.trigger-node-item:nth-child(3) { top: 50%; right: -90px; transform: translateY(-50%); }
.trigger-node-item:nth-child(4) { bottom: -85px; left: 50%; transform: translateX(-50%); }
</style>