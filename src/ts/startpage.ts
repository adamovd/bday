import { timer } from "./functions/countdown";
import { countdownToRebus, emoji } from "./functions/emoji";
import { headerLogo } from "./functions/header";
import { hidden } from "./functions/hidden";
import { countdownToMapGame, mapGame } from "./functions/mapGame";
import { timeline } from "./functions/timeline";
export function startpage() {
  const header: HTMLElement = document.createElement("header");
  const main: HTMLElement = document.createElement("main");
  const startpageContainer: HTMLDivElement = document.createElement("div");
  startpageContainer.classList.add("startpage");
  main.appendChild(startpageContainer);
  document.body.appendChild(header);
  document.body.appendChild(main);
  headerLogo(header);
  timer(header);
  timeline(startpageContainer);
  countdownToRebus(startpageContainer);
  hidden();
}
