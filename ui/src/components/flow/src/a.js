const json = require('../res/hierarchy.json');

// Simulated JSON structure (you will replace this with the actual fetch logic)
const jsonData = json;

// Function to create nodes from JSON data
const createNodesFromJson = (data) => {
    const controllerNodes = [];
    const triggerNodes = [];
    const actionNodes = [];

    data.forEach(flowStep => {
    // Handle all categories: FRIEND, ADVOCATE, MARKETING
    ['FRIEND', 'ADVOCATE', 'MARKETING'].forEach(category => {
        if (flowStep[category]) {
            flowStep[category].forEach(controller => {
              console.log(flowStep[category]);
                const controllerNode = {
                    id: controller.controller_id,
                    name: controller.name,
                    triggers: controller.triggers,
                    actions: controller.actions,
                    journey_names: category,
                    
                    position: { x: Math.random() * 800, y: Math.random() * 600 }, // Random position
                    data: {
                        label: controller.name,
                        triggers: controller.triggers,
                        actions: controller.actions,
                    },
                    type: 'controller',
                };
                controllerNodes.push(controllerNode);

                // Extract triggers
                if (controller.triggers) {
                    controller.triggers.forEach(trigger => {
                        const triggerNode = {
                            trigger_id: trigger.trigger_id,
                            position: { x: Math.random() * 800, y: Math.random() * 600 },
                            data: {
                                label: trigger.trigger_name,
                                trigger_phase: trigger.trigger_phase,
                                trigger_type: trigger.trigger_type,
                            },
                            type: 'trigger',
                        };
                        triggerNodes.push(triggerNode);
                    });
                }

                // Extract actions
                if (controller.actions) {
                    controller.actions.forEach(action => {
                        const actionNode = {
                            action_id: action.action_id,
                            position: { x: Math.random() * 800, y: Math.random() * 600 },
                            data: {
                                label: action.action_type,
                            },
                            event_name: action.event_name,
                            type: 'action',
                        };
                        actionNodes.push(actionNode);
                    });
                }
            });
        }
    });
});

    return { controllerNodes, triggerNodes, actionNodes };
};

// Create nodes from JSON data
const { controllerNodes, triggerNodes, actionNodes } = createNodesFromJson(jsonData);
console.log(triggerNodes);