const display = document.getElementById("display");
const buttons = document.querySelector(".buttons");
let expression = "";

buttons.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;

    if (button.dataset.action === "clear") {
        expression = "";
        display.value = "0";
        return;
    }

    if (button.dataset.action === "delete") {
        expression = expression.slice(0, -1);
        display.value = expression || "0";
        return;
    }

    if (button.dataset.action === "calculate") {
        if (!expression || !/^[0-9+*/.() -]+$/.test(expression)) return;
        try {
            const result = Function(
                '"use strict"; return (' + expression + ')'
            )();

            if (!Number.isFinite(result)) {
                throw new Error("Invalid result");
            }

            expression = String(Number(result.toFixed(10)));
            display.value = expression;
        } catch {
            display.value = "Error";
            expression = "";
        }
        return;
    }

    const value = button.dataset.value;
    if (!value) return;
    if (display.value === "Error") expression = "";
    expression += value;
    display.value = expression;
});