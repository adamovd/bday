export function headerLogo(header: HTMLElement) {
  const headerContainer: HTMLDivElement = document.createElement("div");
  const headerLogo: HTMLImageElement = document.createElement("img");
  headerContainer.classList.add("header");
  headerLogo.classList.add("header__logo");

  headerLogo.src = "https://i.ibb.co/zx5TcJG/j30-logo.gif";
  headerLogo.alt = "Jeja Logo";

  headerContainer.appendChild(headerLogo);
  header.appendChild(headerContainer);
}
