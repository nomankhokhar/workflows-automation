"use client";
import { workflowForms } from "@/app/forms/form";
import { insertAfter } from "@/utils/insertion";
import React, { useContext, useState } from "react";
import { DataContext } from "../useContext/contextApi";

const NodeForm = ({ id, start, setIsSheetOpen }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("");
  const [formData, setFormData] = useState({});
  const { data, setData } = useContext(DataContext);
  // Handle form data change
  const handleChange = (e, eventName, fieldName) => {
    setFormData({
      ...formData,
      [eventName]: {
        ...formData[eventName],
        [fieldName]: e.target.value,
      },
    });
  };

  // Handle category selection from the dropdown
  const handleCategorySelect = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedEvent(""); // Reset event when category changes
  };

  // Handle event selection for the selected category
  const handleEventSelect = (e) => {
    setSelectedEvent(e.target.value);
  };

  // Generate form fields for the selected event
  const generateFormFields = (category, eventName) => {
    const selectedEvent = category.events.find(
      (item) => item.name === eventName
    );
    if (!selectedEvent) return null;

    return selectedEvent.formFields.map((field, idx) => {
      // Check if this field depends on another field
      const dependsOnField = formData[eventName]?.[field.dependOn];

      if (field.dependOn && !dependsOnField) {
        // If the field depends on another, we should hide it until the condition is met
        return null;
      }

      return (
        <div key={idx} className="my-4">
          <label className="block text-sm font-medium text-black">
            {field.placeholder}
          </label>
          <input
            type={field.type}
            name={field.name}
            value={formData[eventName]?.[field.name] || ""}
            onChange={(e) => handleChange(e, eventName, field.name)}
            className="mt-2 p-2 border border-gray-300 text-black rounded-md w-full"
            placeholder={field.placeholder}
          />
        </div>
      );
    });
  };

  const generateUniqueId = () => {
    // Check if the counter exists in sessionStorage
    let uniqueIdCounter = parseInt(
      sessionStorage.getItem("uniqueIdCounter"),
      10 // Use base 10 (decimal) for parsing
    );

    // If it doesn't exist, initialize it (starting from 2 as you want it to start from A2)
    if (isNaN(uniqueIdCounter)) {
      uniqueIdCounter = 2; // Start from 2 if not found or invalid
    } else {
      uniqueIdCounter += 1; // Start the ID counter from 2
    }

    // Generate the unique ID
    const id = `A${uniqueIdCounter}`;

    // Save the updated counter back to sessionStorage
    sessionStorage.setItem("uniqueIdCounter", uniqueIdCounter.toString());

    // Return the generated ID
    return id;
  };

  // Generate the corresponding JSON based on the selected category and event
  const generateJSON = () => {
    if (!selectedCategory || !selectedEvent) return {};

    const category = workflowForms[selectedCategory];
    const event = category.events.find((e) => e.name === selectedEvent);

    switch (event.name) {
      case "TransformationEvent":
        return {
          id: generateUniqueId(),
          name: "Transforming the data into certain",
          app: "Slack",
          event: event.name,
          input: {},
        };
      case "IfConditionEvent":
        const id = generateUniqueId();
        const yeId = generateUniqueId();
        const noId = generateUniqueId();

        return {
          id: id,
          app: "Slack",
          event: event.name,
          input: {
            conditions: [],
            yesActivity: [
              {
                id: yeId,
                name: "Add yesActivity",
                app: "yesActivity",
                event: "yesActivity",
                input: {},
              },
            ],
            noActivity: [
              {
                id: noId,
                name: "Add noActivity",
                app: "noActivity",
                event: "noActivity",
                input: {},
              },
            ],
          },
          name: "Checking nodepool status",
        };
      case "TemporarySaveEvent":
        return {
          id: generateUniqueId(),
          name: "Getting nodepool {{input.nodePoolName}} detail",
          app: "Slack",
          event: event.name,
          input: {},
        };
      case "LoopEvent":
        return {
          id: generateUniqueId(),
          name: "LoopEvent",
          app: "Slack",
          event: event.name,
          input: {
            items: "{{activity.A1.output}}",
            activities: [
              {
                id: generateUniqueId(),
                name: "Add LoopActivities",
                app: "yesActivity",
                event: "yesActivity",
                input: {},
              },
            ],
          },
        };
      default:
        return {
          id: generateUniqueId(),
          name: "Getting nodepool list",
          app: "Slack",
          event: event.name,
          input: {
            cloudServiceProvider: "{{input.cloudServiceProvider}}",
            clusterName: "{{input.clusterName}}",
            nodePoolName: "{{input.nodePoolName}}",
            secretRef: "{{input.secretRef}}",
          },
        };
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const generatedJSON = generateJSON();

    const updatedData = insertAfter(id, generatedJSON, data?.activities, start);
    setData((prev) => {
      return {
        ...prev,
        activities: updatedData,
      };
    });
    setIsSheetOpen(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-6 border border-gray-300 rounded-lg shadow-lg">
        {/* Dropdown for selecting category */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-black mb-4 text-center">
            Select Category
          </h2>
          <select
            value={selectedCategory}
            onChange={handleCategorySelect}
            className="p-3 bg-blue-600 text-white rounded-md w-full"
          >
            <option value="">--Select Category--</option>
            {Object.keys(workflowForms).map((category) => (
              <option key={category} value={category}>
                {workflowForms[category].name}
              </option>
            ))}
          </select>
        </div>

        {/* If a category is selected, display the corresponding events */}
        {selectedCategory && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-black mb-4 text-center">
              Select Event
            </h3>
            <select
              value={selectedEvent}
              onChange={handleEventSelect}
              className="p-3 bg-blue-600 text-white rounded-md w-full"
            >
              <option value="">--Select Event--</option>
              {workflowForms[selectedCategory].events.map((event) => (
                <option key={event.name} value={event.name}>
                  {event.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* If an event is selected, display the corresponding form fields */}
        {selectedCategory && selectedEvent && (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-black text-center">
              {selectedEvent} Form
            </h3>
            <form onSubmit={handleSubmit}>
              {/* Display form fields for the selected event */}
              {generateFormFields(
                workflowForms[selectedCategory],
                selectedEvent
              )}
              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  className="p-3 bg-green-600 text-white rounded-md hover:bg-green-700 w-full"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default NodeForm;
