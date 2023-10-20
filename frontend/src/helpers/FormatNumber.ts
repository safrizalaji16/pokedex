export default function formatNumber(num: number) {
  return `#${String(num).padStart(3, "0")}`;
}
