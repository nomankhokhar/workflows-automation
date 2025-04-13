export const workflowForms = {
  core: {
    name: "core",
    events: [
      {
        name: "LoopEvent",
        formFields: [
          {
            order: 1,
            name: "items",
            type: "text",
            placeholder: "Enter items",
            dependOn: 1,
            validation: {
              required: true,
            },
          },
        ],
      },
      {
        name: "IfConditionEvent",
        formFields: [
          {
            order: 1,
            name: "leftValue",
            type: "text",
            placeholder: "Enter left value",
            dependOn: 0,
            validation: {
              required: true,
            },
          },
          {
            order: 2,
            name: "rightValue",
            type: "text",
            placeholder: "Enter right value",
            dependOn: 0,
            validation: {
              required: true,
            },
          },
          {
            order: 3,
            name: "conditionalOperator",
            type: "text",
            placeholder: "Enter condition",
            dependOn: 0,
            validation: {
              required: true,
            },
          },
          {
            order: 4,
            name: "chainOperator",
            type: "text",
            placeholder: "Enter chain",
            dependOn: 0,
            validation: {
              required: false,
            },
          },
        ],
      },
      {
        name: "TemporarySaveEvent",
        formFields: [
          {
            order: 1,
            name: "source",
            type: "text",
            placeholder: "Enter source",
            dependOn: 0,
            validation: {
              required: true,
            },
          },
        ],
      },
      {
        name: "TransformationEvent",
        formFields: [
          {
            order: 1,
            name: "source",
            type: "text",
            placeholder: "Enter source",
            dependOn: 0,
            validation: {
              required: true,
            },
          },
          {
            order: 2,
            name: "transformationField",
            type: "jsonEditor",
            placeholder: "Enter transformation query",
            dependOn: 1,
            validation: {
              required: true,
            },
          },
        ],
      },
    ],
  },
  cloudManagedKubernetes: {
    name: "cloudManagedKubernetes",
    events: [
      {
        name: "Shutdown",
        formFields: [
          {
            order: 1,
            name: "clusterName",
            type: "text",
            placeholder: "Enter cluster name",
            dependOn: 0,
            validation: {
              required: true,
            },
          },
        ],
      },
      {
        name: "Start",
        formFields: [
          {
            order: 1,
            name: "clusterName",
            type: "text",
            placeholder: "Enter cluster name",
            dependOn: 0,
            validation: {
              required: true,
            },
          },
        ],
      },
      {
        name: "NodePool Scale Up",
        formFields: [
          {
            order: 1,
            name: "nodePoolName",
            type: "text",
            placeholder: "Enter node pool name",
            dependOn: 0,
            validation: {
              required: true,
            },
          },
        ],
      },
      {
        name: "NodePool Scale Down",
        formFields: [
          {
            order: 1,
            name: "nodePoolName",
            type: "text",
            placeholder: "Enter node pool name",
            dependOn: 0,
            validation: {
              required: true,
            },
          },
        ],
      },
      {
        name: "All Cluster List",
        formFields: [
          {
            order: 1,
            name: "description",
            type: "text",
            placeholder: "Enter description",
            dependOn: 0,
            validation: {
              required: true,
            },
          },
        ],
      },
    ],
  },
  azureCostManagement: {
    name: "azureCostManagement",
    events: [
      {
        name: "PriceCalculateEvent",
        formFields: [
          {
            order: 1,
            name: "resourceName",
            type: "text",
            placeholder: "Enter resource name",
            dependOn: 0,
            validation: {
              required: true,
            },
          },
          {
            order: 2,
            name: "costDescription",
            type: "text",
            placeholder: "Enter cost description",
            dependOn: 0,
            validation: {
              required: true,
            },
          },
        ],
      },
    ],
  },
  amazonCostManagement: {
    name: "amazonCostManagement",
    events: [
      {
        name: "PriceCalculateEvent",
        formFields: [
          {
            order: 1,
            name: "resourceName",
            type: "text",
            placeholder: "Enter resource name",
            dependOn: 0,
            validation: {
              required: true,
            },
          },
          {
            order: 2,
            name: "costDescription",
            type: "text",
            placeholder: "Enter cost description",
            dependOn: 0,
            validation: {
              required: true,
            },
          },
        ],
      },
    ],
  },
  googleCostManagement: {
    name: "googleCostManagement",
    events: [
      {
        name: "PriceCalculateEvent",
        formFields: [
          {
            order: 1,
            name: "resourceName",
            type: "text",
            placeholder: "Enter resource name",
            dependOn: 0,
            validation: {
              required: true,
            },
          },
          {
            order: 2,
            name: "costDescription",
            type: "text",
            placeholder: "Enter cost description",
            dependOn: 0,
            validation: {
              required: true,
            },
          },
        ],
      },
    ],
  },
  slack: {
    name: "slack",
    events: [
      {
        name: "SlackMessageEvent",
        formFields: [
          {
            order: 1,
            name: "channelName",
            type: "text",
            placeholder: "Enter Slack channel name",
            dependOn: 0,
            validation: {
              required: true,
            },
          },
          {
            order: 2,
            name: "message",
            type: "text",
            placeholder: "Enter message",
            dependOn: 0,
            validation: {
              required: true,
            },
          },
        ],
      },
      {
        name: "SlackInteractionEvent",
        formFields: [
          {
            order: 1,
            name: "interactionType",
            type: "text",
            placeholder: "Enter interaction type",
            dependOn: 0,
            validation: {
              required: true,
            },
          },
        ],
      },
    ],
  },
  gmail: {
    name: "gmail",
    events: [
      {
        name: "NewEmailEvent",
        formFields: [
          {
            order: 1,
            name: "emailSubject",
            type: "text",
            placeholder: "Enter email subject",
            dependOn: 0,
            validation: {
              required: true,
            },
          },
          {
            order: 2,
            name: "emailBody",
            type: "text",
            placeholder: "Enter email body",
            dependOn: 0,
            validation: {
              required: true,
            },
          },
        ],
      },
    ],
  },
};
