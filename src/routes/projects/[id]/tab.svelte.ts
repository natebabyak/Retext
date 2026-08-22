export type Tab = "ai" | "comments" | "files" | "search" | "sourceControl";

let tab = $state<Tab | null>(null);

export function getTab() {
  return tab;
}

export function setTab(newTab: Tab) {
  tab = newTab;
}
