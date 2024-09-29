// nodeCreationScript.js

export const createNodesFromJson = (data) => {
    const controllerNodes = [];
    const triggerNodes = [];
    const actionNodes = [];
    
    data.forEach(flowStep => {
        ['FRIEND', 'ADVOCATE', 'MARKETING'].forEach(category => {
            if (flowStep[category]) {
                flowStep[category].forEach(controller => {
                    const flowStepName = flowStep.name;
                    const controllerId = controller.id || controller.controller_id;
                    const controllerName = controller.name;
                    const controllerTriggers = controller.triggers || [];
                    const controllerActions = controller.actions || [];
                    const controllerJourneyName = category;
                    const controllerIsEnabled = controller.enabled;
                    const controllerNode = {
                        id: controllerId,
                        position: { x: Math.random() * 800, y: Math.random() * 600 },
                        data: {
                            name: controllerName,
                            flow_name: flowStepName,
                            controller_id: controllerId,
                            journey_names: controllerJourneyName,
                            triggers: controllerTriggers,
                            actions: controllerActions,
                            enabled: controllerIsEnabled,
                        },
                        type: 'controller',
                    };
                    controllerNodes.push(controllerNode);

                    // Extract triggers
                    if (controller.triggers) {
                        controller.triggers.forEach(trigger => {
                            const triggerNode = {
                                id: trigger.trigger_id,
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
                                id: action.action_id,
                                position: { x: Math.random() * 800, y: Math.random() * 600 },
                                data: {
                                    label: action.action_type,
                                    event_name: action.event_name,
                                },
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