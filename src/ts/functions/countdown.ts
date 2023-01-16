export function timer(header: HTMLElement) {
  const countdownContainer: HTMLDivElement = document.createElement("div");
  const showCountdown: HTMLParagraphElement = document.createElement("p");
  const countdownCake: HTMLParagraphElement = document.createElement("p");
  const countdownCakeTwo: HTMLParagraphElement = document.createElement("p");
  countdownContainer.classList.add("countdown");
  showCountdown.classList.add("countdown__timer");
  countdownCake.classList.add("countdown__cake");
  countdownCakeTwo.classList.add("countdown__cake");
  const bday: number = new Date("Jan 20, 2023 14:02:00").getTime();
  showCountdown.innerHTML = "";
  const countdown = setInterval(() => {
    let now: number = new Date().getTime();
    let difference = bday - now;

    const days: number = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours: number = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes: number = Math.floor(
      (difference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds: number = Math.floor((difference % (1000 * 60)) / 1000);
    countdownCake.innerHTML = "🎂";
    countdownCakeTwo.innerHTML = "🎂";
    showCountdown.innerHTML =
      days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

    countdownContainer.appendChild(countdownCake);
    countdownContainer.appendChild(showCountdown);
    countdownContainer.appendChild(countdownCakeTwo);
    header.appendChild(countdownContainer);
    if (difference < 0) {
      clearInterval(countdown);
      showCountdown.innerHTML = "GRATTIS PÅ FÖDELSEDAGEN!!";
    }
  }, 1000);
}
