import { years } from "../models/years";

export function timeline(container: HTMLDivElement) {
  years.forEach((year) => {
    const yearContainer: HTMLDivElement = document.createElement("div");
    const yearTitle: HTMLParagraphElement = document.createElement("p");
    const yearImg: HTMLImageElement = document.createElement("img");
    const yearText: HTMLParagraphElement = document.createElement("p");

    yearContainer.classList.add("year");
    yearTitle.classList.add("hidden__under");
    yearTitle.classList.add("year__title");
    yearImg.classList.add("year__img");
    yearText.classList.add("year__text");

    yearTitle.innerHTML = year.year;
    yearImg.src = year.img;
    yearText.innerHTML = year.description;

    yearContainer.appendChild(yearTitle);
    yearContainer.appendChild(yearImg);
    yearContainer.appendChild(yearText);
    container.appendChild(yearContainer);
  });
}
