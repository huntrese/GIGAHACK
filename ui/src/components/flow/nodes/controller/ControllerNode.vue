<script setup>
import ExpandableActionButton from '../actions/ExpandableActionButton.vue';
import ExpandableTriggerButton from '../trigger/ExpandableTriggerButton.vue';
import { Position, Handle } from '@vue-flow/core';
import TriggerNode from '../trigger/TriggerNode.vue';

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps(['name','controller_id', 'journey_names', 'controller_type', 'triggers', 'actions', 'enabled', 'flow_name']);

console.log(props);

const controllerType = props.controller_type || "CONTROLLER";
const controllerJourney = props.journey_names || "ADVOCATE";
const name = props.name ;
const controller_id = props.controller_id;
const triggers = props.triggers || [];
const actions = props.actions || [];
const enabled = props.enabled || false;


console.log(controllerType, controllerJourney, name,controller_id);

const controllerSettings = {
  ADVOCATE: {
    backgroundColor: '#EBD3F7',
    borderColor: '#C084FC',
    color: 'black',
  },
  FRIEND: {
    backgroundColor: '#BEE7F8',
    borderColor: '#2B6CB0',
    color: 'black',
  },
  MARKETING: {
    backgroundColor: '#E9830B',
    borderColor: '#F6AD55',
    color: 'white',
  },
  controllerType: {
    CONTROLLER: {
      icon: '⚙️',
    },
    FRONTEND_CONTROLLER: {
      icon: '🖥️',
    },
  },
  enabled: {
    true: '✅',
    false: '❌',
  },
};

const backgroundColor = controllerSettings[controllerJourney].backgroundColor;
const borderColor = controllerSettings[controllerJourney].borderColor;
const icon = controllerSettings.controllerType[controllerType].icon;
const label = name || 'Controller';
const color = controllerSettings[controllerJourney].color;
const isEnabled = controllerSettings.enabled[enabled];
</script>

<template>
  <div class="controller-node-container">
    <div
      class="controller-node"
      :style="{ backgroundColor: backgroundColor, color: color, borderColor: borderColor }"
    >
      <span>{{ icon }}</span>
      <span>{{ isEnabled }}</span>
      <span>{{ label }}</span>
      <ExpandableActionButton :actionNodes="actions" />
    </div>
    

    <ExpandableTriggerButton :triggerNodes="triggers" />


    <!-- {{ actions }} -->

  </div>
</template>


<style scoped>
.controller-node-container {
  display: inline-flex;
  flex-direction: row-reverse; /* Align the trigger button below the controller */
  align-items: center;
  justify-content: center;
}

.controller-node {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  padding: 10px;
  border: 1px solid;
  cursor: pointer;
  white-space: nowrap;
}

.trigger-button {
  margin-right: 80px; /* Space between controller and trigger button */
}

</style>
