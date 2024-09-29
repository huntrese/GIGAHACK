<script setup>

const props = defineProps([
    "triggerName",
    "triggerPhase",
    "eventNames",
    "eventType",
    "triggerType",
]);

const triggerName = props.triggerName || "Trigger";
const triggerPhase = props.triggerPhase || "Phase";
const eventNames = props.eventNames || ["Event"];
const eventType = props.eventType || "Unspecified";
const triggerType = props.triggerType || "Unspecified";

const triggerSettings = {
    backgroundColor: "#F6FFF8",
    borderColor: "#0B7A23",    
    color:"#0B7A23",
}

</script>


<template>
  <div
    :class="['trigger-node']"
    :style="{ backgroundColor: triggerSettings.backgroundColor, color: triggerSettings.color, borderColor: triggerSettings.borderColor }"
  >
    <span>{{ triggerName }}</span>

  </div>
</template>


<style scoped>
.trigger-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  border-radius: 50px;
  border: 2px solid;
  margin: 10px;
}
</style>