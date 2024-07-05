export const getCurrentTime = () => {
  const date = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return date;
};
