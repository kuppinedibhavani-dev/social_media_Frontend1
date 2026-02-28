export const getAvatarColor = (name: string): string => {
  let hash = 0;

  // Generate a hash from the name
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Convert hash to a color hue
  const hue = Math.abs(hash % 360);

  // Use hue + fixed saturation + lightness
  return `hsl(${hue}, 70%, 50%)`;
};