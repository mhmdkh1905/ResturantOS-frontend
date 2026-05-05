

export const getStatusString = (input, defaultStatus = "new") => {
  if (typeof input === "string") {
    return input.toLowerCase().trim();
  }

  if (typeof input !== "object" || input === null) {
    return defaultStatus.toLowerCase();
  }

 
  let current = input;
  if (current._id !== undefined && current.status !== undefined) {
    current = current.status;
  }

 
  const drill = (obj) => {
    if (typeof obj === "string") return obj.toLowerCase().trim();
    if (typeof obj !== "object" || obj === null) return null;

    if (obj.status && typeof obj.status === "string")
      return obj.status.toLowerCase().trim();
    if (obj.name && typeof obj.name === "string")
      return obj.name.toLowerCase().trim();

    
    const statusStr = drill(obj.status);
    if (statusStr) return statusStr;
    const nameStr = drill(obj.name);
    if (nameStr) return nameStr;

    return null;
  };

  const result = drill(current);
  return result || defaultStatus.toLowerCase().trim();
};
