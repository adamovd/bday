import { Rebus } from "../models/Rebus";
import { rebuses } from "../models/rebuses";
import { countdownToMapGame } from "./mapGame";

export function countdownToRebus(container: HTMLDivElement) {
  const countdownForRebus: HTMLDivElement = document.createElement("div");
  const countdownForRebusTitle: HTMLParagraphElement =
    document.createElement("p");
  const showCountdownForRebus: HTMLParagraphElement =
    document.createElement("p");
  countdownForRebus.classList.add("rebuscountdown");
  countdownForRebusTitle.classList.add("rebuscountdown__title");
  showCountdownForRebus.classList.add("rebuscountdown__timer");
  countdownForRebusTitle.innerHTML =
    "🎉</br>Dagens andra överraskning startar om: ";

  const date: number = new Date("Jan 20, 2023 10:00:00").getTime();
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

    showCountdownForRebus.innerHTML =
      hours + "h " + minutes + "m " + seconds + "s ";

    countdownForRebus.appendChild(countdownForRebusTitle);
    countdownForRebus.appendChild(showCountdownForRebus);
    container.appendChild(countdownForRebus);

    if (difference < 0) {
      clearInterval(countdown);
      countdownForRebus.innerHTML = "";
      emoji(container);
    }
  }, 1000);
}
export function emoji(container: HTMLDivElement) {
  let rebus: Rebus[] = JSON.parse(localStorage.getItem("rebus") || "[]");
  const rebusText: HTMLParagraphElement = document.createElement("p");
  rebusText.classList.add("rebus__text");
  rebusText.innerHTML = "🕵🏻‍♀️Rebus🕵🏻‍♀️";
  container.appendChild(rebusText);
  rebus.push(rebuses[0]);

  displayRebus(rebus, container);
}

export function displayRebus(rebus: Rebus[], rebusContainer: HTMLDivElement) {
  let finishedRebusGame: boolean = false;
  for (let i = 0; i < rebus.length; i++) {
    rebusContainer.innerHTML = "";
    const rebusForm: HTMLFormElement = document.createElement("form");
    const rebusTitle: HTMLParagraphElement = document.createElement("p");
    const rebusImg: HTMLParagraphElement = document.createElement("p");
    const rebusGuess: HTMLInputElement = document.createElement("input");
    const rebusBtn: HTMLButtonElement = document.createElement("button");
    const rebusResult: HTMLParagraphElement = document.createElement("p");

    rebusForm.classList.add("rebus");
    rebusTitle.classList.add("rebus__title");
    rebusImg.classList.add("rebus__img");
    rebusGuess.classList.add("rebus__guess");
    rebusBtn.classList.add("rebus__btn");
    rebusResult.classList.add("rebus__result");
    rebusGuess.type = "text";
    rebusGuess.placeholder = "Skriv din gissning här:";
    rebusBtn.type = "submit";

    rebusTitle.innerHTML = rebus[i].title;
    rebusImg.innerHTML = rebus[i].img;
    rebusBtn.innerHTML = "Gissa";

    rebusForm.appendChild(rebusTitle);
    rebusForm.appendChild(rebusImg);
    rebusForm.appendChild(rebusGuess);
    rebusForm.appendChild(rebusBtn);
    rebusForm.appendChild(rebusResult);
    rebusContainer.appendChild(rebusForm);

    rebusForm.addEventListener("submit", (event: SubmitEvent) => {
      event.preventDefault();

      if (rebuses[i] === rebuses[0]) {
        if (rebusGuess.value.toLowerCase() === "127 hours") {
          rebusResult.innerHTML = "Du gissade rätt";
          rebus[i].done = true;
          rebus.push(rebuses[1]);

          displayRebus(rebus, rebusContainer);
        } else {
          rebusResult.innerHTML = "Försök igen";
        }
      }
      if (rebuses[i] === rebuses[1]) {
        if (rebusGuess.value.toLowerCase() === "house") {
          rebusResult.innerHTML = "Du gissade rätt";
          rebus[i].done = true;
          rebus.push(rebuses[2]);

          displayRebus(rebus, rebusContainer);
        } else {
          rebusResult.innerHTML = "Försök igen";
        }
      }
      if (rebuses[i] === rebuses[2]) {
        if (rebusGuess.value.toLowerCase() == "moby dick") {
          rebusResult.innerHTML = "Du gissade rätt";
          rebus[i].done = true;
          rebus.push(rebuses[3]);

          displayRebus(rebus, rebusContainer);
        } else {
          rebusResult.innerHTML = "Försök igen";
        }
      }
      if (rebuses[i] === rebuses[3]) {
        if (rebusGuess.value.toLowerCase() == "gordon ramsey") {
          rebusResult.innerHTML = "Du gissade rätt";
          rebus[i].done = true;
          finishedRebusGame = true;
          localStorage.setItem(
            "finishedRebusGame",
            JSON.stringify(finishedRebusGame)
          );
          countdownToMapGame(rebusContainer);
          rebusContainer.removeChild(rebusForm);
        } else {
          rebusResult.innerHTML = "Försök igen";
        }
      }

      rebusGuess.value = "";
    });
  }
}
