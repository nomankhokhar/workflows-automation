"use client";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { DataContext } from "../useContext/contextApi";

const StartingWorkFlowForm = () => {
  const { setData } = useContext(DataContext);
  const [formData, setFormData] = useState({
    name: "",
    projectName: "",
    description: "",
    status: "",
    categories: [], // Array to hold selected categories
    version: "",
    inputes: [], // Empty array for dynamic inputs
    activities: [],
  });

  const router = useRouter();

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedInputes = [...formData.inputes];
    updatedInputes[index][name] = value;
    setFormData({ ...formData, inputes: updatedInputes });
  };

  const addInputField = () => {
    const newInput = { name: "", value: "", type: "text", isEditable: true };
    setFormData({ ...formData, inputes: [...formData.inputes, newInput] });
  };

  // Handle categories selection
  const handleCategoryChange = (e) => {
    const selectedCategories = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setFormData({ ...formData, categories: selectedCategories });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Generate random name and value for inputes (if necessary)
    const randomInput = {
      name: `randomInput${Math.floor(Math.random() * 1000)}`,
      value: `randomValue${Math.floor(Math.random() * 1000)}`,
      type: "text",
    };

    // Add random input to the inputes array
    setFormData({
      ...formData,
      inputes: [...formData.inputes, randomInput],
    });

    // Create the object to be returned after submission
    const formOutput = {
      id: "A1",
      name: formData.name || "sample-flow-control-workflow",
      projectName: formData.projectName || "testing",
      description: formData.description || "testing-email reminder package",
      status: formData.status || "Running",
      categories:
        formData.categories.length > 0 ? formData.categories : ["Kubernetes"],
      version: formData.version || "1",
      inputes: formData.inputes.map((input) => ({
        name: input.name,
        value: input.value,
        type: input.type,
      })),
      activities: [
        {
          id: "A2",
          name: "Add Activities",
          app: "start",
          event: "start",
          input: {},
        },
      ],
    };

    setData(formOutput);
    router.push("/workflow");
    setFormData({
      name: "",
      projectName: "",
      description: "",
      status: "",
      categories: [],
      version: "",
      inputes: [],
      activities: [],
    });
  };

  return (
    <div className="grid grid-cols-1 h-screen bg-gray-100">
      <div className="flex justify-center items-center w-full">
        <div className="w-full max-w-lg bg-white p-6 border-gray-300  overflow-y-auto max-h-screen">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Sample Flow Control Workflow Form
          </h2>

          {/* Static form fields */}
          <div className="grid grid-cols-1 md:grid-cols- gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Workflow Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="p-3 border border-gray-300 rounded-md w-full"
                placeholder="Enter workflow name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Name
              </label>
              <input
                type="text"
                value={formData.projectName}
                onChange={(e) =>
                  setFormData({ ...formData, projectName: e.target.value })
                }
                className="p-3 border border-gray-300 rounded-md w-full"
                placeholder="Enter project name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="p-3 border border-gray-300 rounded-md w-full"
                placeholder="Enter description"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <input
                type="text"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="p-3 border border-gray-300 rounded-md w-full"
                placeholder="Enter status"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Version
              </label>
              <input
                type="text"
                value={formData.version}
                onChange={(e) =>
                  setFormData({ ...formData, version: e.target.value })
                }
                className="p-3 border border-gray-300 rounded-md w-full"
                placeholder="Enter version"
              />
            </div>
          </div>

          {/* Categories dropdown */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categories
            </label>
            <select
              multiple
              value={formData.categories}
              onChange={handleCategoryChange}
              className="p-3 border border-gray-300 rounded-md w-full"
            >
              <option value="Kubernetes">Kubernetes</option>
              <option value="Azure">Azure</option>
              <option value="AWS">AWS</option>
              <option value="Google Cloud">Google Cloud</option>
              <option value="Slack">Slack</option>
              <option value="Gmail">Gmail</option>
            </select>
          </div>

          {/* Dynamic form fields for inputs */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Input Fields</h3>
            {formData.inputes.map((input, index) => (
              <div key={index} className="mb-4">
                {input.isEditable ? (
                  <>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      type={input.type}
                      name="name"
                      value={input.name}
                      onChange={(e) => handleInputChange(e, index)}
                      className="p-3 border border-gray-300 rounded-md w-full"
                      placeholder="Enter name"
                    />
                    <label className="block text-sm font-medium text-gray-700 mb-2 mt-4">
                      Value
                    </label>
                    <input
                      type={input.type}
                      name="value"
                      value={input.value}
                      onChange={(e) => handleInputChange(e, index)}
                      className="p-3 border border-gray-300 rounded-md w-full"
                      placeholder="Enter value"
                    />
                  </>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {input.name || `Input ${index + 1}`}
                    </label>
                    <input
                      type={input.type}
                      name="value"
                      value={input.value}
                      onChange={(e) => handleInputChange(e, index)}
                      className="p-3 border border-gray-300 rounded-md w-full"
                      placeholder={`Enter ${input.name || "name"}`}
                    />
                  </div>
                )}
              </div>
            ))}

            {/* Button to add more input fields */}
            <div className="flex justify-between">
              <button
                type="button"
                onClick={addInputField}
                className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700"
              >
                Add More Input Fields
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 w-full"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartingWorkFlowForm;
