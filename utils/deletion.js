// Function to delete an activity by parentId from the main array or nested arrays
export const deleteActivity = (parentId, activities) => {
  // Recursive function to find and delete an activity
  const findAndDelete = (activities) => {
    for (let i = 0; i < activities.length; i++) {
      const activity = activities[i];

      // Direct match found in this level
      if (activity.id === parentId) {
        activities.splice(i, 1); // Remove
        return true;
      }

      if (activity.input) {
        // Check yesActivity
        if (activity.input.yesActivity && activity.input.yesActivity.length > 0) {
          let lastId = null;
          for (let j = 0; j < activity.input.yesActivity.length; j++) {
            if (activity.input.yesActivity[j].id === parentId) {
              activity.input.yesActivity.splice(j, 1);
              if (activity.input.yesActivity.length === 0) {
                activity.input.yesActivity.push({
                  id: "A7777",
                  name: "Yes Activities",
                  app: "yesActivity",
                  event: "yesActivity",
                  input: {},
                });
              }
              return true;
            }
            lastId = activity.input.yesActivity[j].id;
            // Deep nested check
            const result = findAndDelete([activity.input.yesActivity[j]]);
            if (result) return true;
          }
        }

        // Check noActivity
        if (activity.input.noActivity && activity.input.noActivity.length > 0) {
          let lastId = null;
          for (let j = 0; j < activity.input.noActivity.length; j++) {
            if (activity.input.noActivity[j].id === parentId) {
              activity.input.noActivity.splice(j, 1);
              if (activity.input.noActivity.length === 0) {
                activity.input.noActivity.push({
                  id: "A9999",
                  name: "No Activities",
                  app: "noActivity",
                  event: "noActivity",
                  input: {},
                });
              }
              return true;
            }
            lastId = activity.input.noActivity[j].id;
            const result = findAndDelete([activity.input.noActivity[j]]);
            if (result) return true;
          }
        }

        // Check generic activities
        if (activity.input.activities && activity.input.activities.length > 0) {
          for (let j = 0; j < activity.input.activities.length; j++) {
            if (activity.input.activities[j].id === parentId) {
              activity.input.activities.splice(j, 1);
              return true;
            }
            const result = findAndDelete([activity.input.activities[j]]);
            if (result) return true;
          }
        }
      }
    }
    return false;
  };

  // Kick off the recursive search
  const isDeleted = findAndDelete(activities);

  // If all root activities are deleted, inject a dummy starter
  if (isDeleted) {
    if (activities.length === 0) {
      activities.push({
        id: "A0000",
        name: "Start Activity",
        app: "start",
        event: "start",
        input: {},
      });
    }
    return activities;
  } else {
    return activities;
  }
};
