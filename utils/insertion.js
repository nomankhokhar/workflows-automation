// Recursive function to insert a new object after the specified parentId
export const insertAfter = (parentId, newObject, activities, start) => {
  // Recursive function to find the parent object and insert after it
  const findAndInsert = (activities) => {
    for (let i = 0; i < activities.length; i++) {
      // Check if the current activity matches the parentId
      if (activities[i].id === parentId && activities[i].event === start) {
        // Replace the current activity with the new object
        activities[i] = newObject;
        return true; // Successfully replaced
      } else if (activities[i].id === parentId) {
        // Insert the new object after the current activity
        activities.splice(i + 1, 0, newObject);
        return true; // Successfully inserted
      }

      // Recurse into nested activities if they exist
      if (activities[i].input && activities[i].input.activities) {
        const result = findAndInsert(activities[i].input.activities);
        if (result) return true; // Successfully inserted in nested activities
      }

      // Recurse into yesActivity if it exists
      if (activities[i].input && activities[i].input.yesActivity) {
        const result = findAndInsert(activities[i].input.yesActivity);
        if (result) return true; // Successfully inserted in yesActivity
      }

      // Recurse into noActivity if it exists
      if (activities[i].input && activities[i].input.noActivity) {
        const result = findAndInsert(activities[i].input.noActivity);
        if (result) return true; // Successfully inserted in noActivity
      }
    }
    return false; // Parent not found
  };

  // Call the recursive function to modify the activities array
  const isInserted = findAndInsert(activities);
  return isInserted ? activities : null; // Return updated activities if inserted, or null if not found
};
