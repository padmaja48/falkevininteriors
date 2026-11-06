export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatIndex(n: number): string {
  return String(n).padStart(2, "0");
}
