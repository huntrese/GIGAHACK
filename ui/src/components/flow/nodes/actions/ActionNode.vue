<script setup>
import { ref, computed } from 'vue';

const props = defineProps(['actionNodes', 'expanded']);

const displayName = "Actions"; // Display name for the expandable section

// Local state to manage expansion
const isExpanded = ref(props.expanded);

const actionSettings = {
    backgroundColor: "#AD2B81",
    borderColor: "#AD2B81",
    color: "#FFFFFF",
};

// Computed property to get the count of action nodes
const actionCount = computed(() => props.actionNodes.length);

// Method to toggle expansion state
const toggleExpansion = () => {
  isExpanded.value = !isExpanded.value;
};
</script>

<template>
    <div
        :class="['action-node']"
        :style="{ backgroundColor: actionSettings.backgroundColor, color: actionSettings.color, borderColor: actionSettings.borderColor }"
        @click="toggleExpansion"
    >
        <span>{{ displayName }} ({{ actionCount }})</span>
        <div v-if="isExpanded">
            <ul>
                <li v-for="(node, index) in actionNodes" :key="index">
                    {{ node.data.label }} <!-- Display the action node names -->
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
