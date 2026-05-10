export const getStatusString = (input, defaultStatus = "new") => {
  if (typeof input === "string") return input.toLowerCase().trim();
  return defaultStatus.toLowerCase();
};
