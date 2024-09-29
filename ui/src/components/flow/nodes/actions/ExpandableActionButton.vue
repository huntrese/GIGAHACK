<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  actionNodes: Array,
});

const isExpanded = ref(false);

const toggleExpansion = () => {
  isExpanded.value = !isExpanded.value;
};

const actionSettings = {
    backgroundColor: "#AD2B81",
    borderColor: "#AD2B81",
    color: "#FFFFFF",
};

const actionCount = computed(() => props.actionNodes.length);
</script>

<template>
    
  <div 
  :class="['action-node']"
    :style="{ backgroundColor: actionSettings.backgroundColor, color: actionSettings.color, borderColor: actionSettings.borderColor }"
    @click="toggleExpansion">
    
    <span>Actions ({{ actionCount }})</span>
    <div v-if="isExpanded">
      <ul>
        <li v-for="(node, index) in actionNodes" :key="node.id">
          {{ node.event_name }} <!-- Display the action node names -->
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.action-node {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: auto; /* Adjust height based on content */
    border-radius: 10px;
    border: 2px solid;
    margin: 10px;
    cursor: pointer; /* Indicate clickable */
}
</style>

