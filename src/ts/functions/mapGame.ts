import { MapItem } from "../models/MapItem";
import { mapItems } from "../models/maps";
import { timeline } from "./timeline";

export function countdownToMapGame(container: HTMLDivElement) {
  const countdownForMapGame: HTMLDivElement = document.createElement("div");
  const countdownForMapGameTitle: HTMLParagraphElement =
    document.createElement("p");
  const showcountdownForMapGame: HTMLParagraphElement =
    document.createElement("p");
  countdownForMapGame.classList.add("mapcountdown");
  countdownForMapGameTitle.classList.add("mapcountdown__title");
  showcountdownForMapGame.classList.add("mapcountdown__timer");
  countdownForMapGameTitle.innerHTML =
    "🎉</br>Dagens tredje överraskning startar om: ";

  const date: number = new Date("Jan 20, 2023 12:00:00").getTime();
  const countdown = setInterval(() => {
    let now: number = new Date().getTime();
    let difference = date - now;

    const days: number = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours: number = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes: number = Math.floor(
      (difference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds: number = Math.floor((difference % (1000 * 60)) / 1000);

    showcountdownForMapGame.innerHTML =
      hours + "h " + minutes + "m " + seconds + "s ";

    countdownForMapGame.appendChild(countdownForMapGameTitle);
    countdownForMapGame.appendChild(showcountdownForMapGame);
    container.appendChild(countdownForMapGame);

    if (difference < 0) {
      clearInterval(countdown);
      countdownForMapGame.innerHTML = "";
      mapGame(container);
    }
  }, 1000);
}

export function mapGame(container: HTMLDivElement) {
  let newMaps: MapItem[] = JSON.parse(localStorage.getItem("maps") || "[]");
  const mapText: HTMLParagraphElement = document.createElement("p");
  mapText.classList.add("startpage__text");
  mapText.innerHTML = "🕵🏻‍♀️Var är detta?🕵🏻‍♀️";
  container.appendChild(mapText);
  newMaps.push(mapItems[0]);
  displayMaps(newMaps, container);
}

export function displayMaps(maps: MapItem[], mapContainer: HTMLDivElement) {
  for (let i = 0; i < maps.length; i++) {
    mapContainer.innerHTML = "";
    const mapForm: HTMLFormElement = document.createElement("form");
    const mapTitle: HTMLParagraphElement = document.createElement("p");
    const mapImg: HTMLImageElement = document.createElement("img");
    const mapGuess: HTMLInputElement = document.createElement("input");
    const mapBtn: HTMLButtonElement = document.createElement("button");
    const mapResult: HTMLParagraphElement = document.createElement("p");

    mapForm.classList.add("map");
    mapTitle.classList.add("map__title");
    mapImg.classList.add("map__img");
    mapGuess.classList.add("map__guess");
    mapBtn.classList.add("map__btn");
    mapResult.classList.add("map__result");
    mapGuess.type = "text";
    mapGuess.placeholder = "Skriv din gissning här:";
    mapBtn.type = "submit";

    mapTitle.innerHTML = "Vilken stad är det här?";
    mapImg.src = maps[i].img;
    mapBtn.innerHTML = "Gissa";

    mapForm.appendChild(mapTitle);
    mapForm.appendChild(mapImg);
    mapForm.appendChild(mapGuess);
    mapForm.appendChild(mapBtn);
    mapForm.appendChild(mapResult);
    mapContainer.appendChild(mapForm);

    mapForm.addEventListener("submit", (event: SubmitEvent) => {
      event.preventDefault();
      if (mapGuess.value.toLowerCase() === maps[i].name) {
        mapResult.innerHTML = "Du gissade rätt";
        maps.push(mapItems[i++]);
        displayMaps(maps, mapContainer);
        if (maps[i].name === "kalmar") {
          timeline(mapContainer);
        }
      } else {
        mapResult.innerHTML = "Försök igen";
      }

      mapGuess.value = "";
    });
  }
}
