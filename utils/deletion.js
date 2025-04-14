// Function to delete an activity by parentId from the main array or nested arrays
export const deleteActivity = (parentId, activities) => {
  // Recursive function to find and delete an activity in the main array or nested yesActivity/noActivity arrays
  const findAndDelete = (activities) => {
    for (let i = 0; i < activities.length; i++) {
      // Check if the current activity matches the parentId (main activities array)
      if (activities[i].id === parentId) {
        activities.splice(i, 1); // Remove the activity from the array
        if (activities.length === 0) {
          activities.push({
            id: "A2",
            name: "Add Activities",
            app: "start",
            event: "start",
            input: {},
          });
        }
        return true; // Successfully deleted
      }

      // If the current activity has nested activities (yesActivity or noActivity), recurse into them
      if (activities[i].input) {
        if (activities[i].input.yesActivity) {
          // Look for the parentId in yesActivity array
          const yesIndex = activities[i].input.yesActivity.findIndex(
            (activity) => activity.id === parentId
          );
          if (yesIndex !== -1) {
            activities[i].input.yesActivity.splice(yesIndex, 1); // Remove the activity from yesActivity
            return true; // Successfully deleted
          }
        }

        if (activities[i].input.noActivity) {
          // Look for the parentId in noActivity array
          const noIndex = activities[i].input.noActivity.findIndex(
            (activity) => activity.id === parentId
          );
          if (noIndex !== -1) {
            activities[i].input.noActivity.splice(noIndex, 1); // Remove the activity from noActivity
            return true; // Successfully deleted
          }
        }

        // If there are other nested activities, recurse further
        if (activities[i].input.activities) {
          const result = findAndDelete(activities[i].input.activities);
          if (result) {
            return true; // Successfully deleted in nested activities
          }
        }
      }
    }
    return false; // Activity not found
  };

  // Call the recursive function to modify the activities array
  const isDeleted = findAndDelete(activities);
  return isDeleted ? activities : null; // Return updated activities if deleted, or null if not found
};
