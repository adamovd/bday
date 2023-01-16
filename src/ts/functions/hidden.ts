export function hidden() {
  const observer: IntersectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  });

  const hiddenElements = document.querySelectorAll(
    ".hidden__under, .hidden__right, .hidden__left"
  );
  hiddenElements.forEach((el) => observer.observe(el));
}
