export default function capitalizeName(name: string) {
  if (typeof name === "string") {
    return name?.charAt(0).toUpperCase() + name.slice(1);
  }
  return "";
}
