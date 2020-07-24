(() => {
  const simulateKeydown = (el, keyCode) => {
    const keyboardEvent = new KeyboardEvent("keydown", {
      bubbles: true,
      cancelable: true,
      keyCode,
    });
    return el.dispatchEvent(keyboardEvent);
  };

  const generate = () => {
    const headingList = [...document.querySelectorAll("h3[name], h4[name]")];

    return headingList
      .filter(
        (headingTag) =>
          !headingTag.classList.contains("graf--title") &&
          !headingTag.classList.contains("graf--subtitle")
      )
      .map((headingTag) => {
        let bullet;
        switch (headingTag.tagName.toLowerCase()) {
          case "h1":
          case "h2":
          case "h3":
            bullet = `·`;
            break;
          case "h4":
            bullet = `  ∘`;
            break;
        }

        return `${bullet} <a href="#${headingTag.getAttribute(
          "name"
        )}" title="${headingTag.textContent}">${headingTag.textContent}</a>`;
      });
  };

  const inject = () => {
    const tooltipToggleMenu = document.querySelector(
      "[data-action=inline-menu]"
    );
    const tooltip = document.querySelector(".inlineTooltip");
    const tooltipMenu = document.querySelector(".inlineTooltip-menu");
    const addEmbedButton = document.querySelector(
      ".inlineTooltip-menu [title='Add an embed']"
    );

    if (!tooltip || !tooltipToggleMenu || !tooltipMenu || !addEmbedButton) {
      return;
    }

    tooltip.style.width = "auto";

    const toCButton = document.querySelector("[data-action='inline-menu-toc']");
    if (toCButton) {
      return;
    }

    const handleAddToCClick = (e) => {
      const container = document.querySelector(".is-selected");
      tooltipToggleMenu.click();

      container.innerHTML = generate().join("<br/>");

      setTimeout(() => {
        simulateKeydown(container, 13);
      }, 0);
    };

    const addToCButton = addEmbedButton.cloneNode(true);

    const title = "Add a Table of Contents";
    addToCButton.setAttribute("title", title);
    addToCButton.setAttribute("aria-label", title);
    addToCButton.setAttribute("data-action", "inline-menu-toc");
    addToCButton.setAttribute(
      "data-action-value",
      "Generate a table of contents"
    );
    addToCButton.setAttribute("data-default-value", "Table of contents");
    addToCButton.innerHTML = "⋮";
    addToCButton.addEventListener("click", handleAddToCClick);

    tooltipMenu.appendChild(addToCButton);
  };

  setInterval(inject, 500);
})();
