import { handleButtonClick } from "../buttonEventHandlers.js";
import { getOffset } from "../../config.js";

// JSDOM is imported.
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

describe("buttonEventHandlers", () => {
  beforeEach(() => {
    // A new instance of JSDOM is created for simulation.
    const dom = new JSDOM(`
        <div class="items-center gap-4 flex justify-center">
            <button
            id="previous-button"
            class="flex items-center justify-center px-3 h-8 ms-0 leading-tight bg-slate-300 hover:bg-slate-500 transition-colors rounded"
            >
                <svg
                id="previous-button"
                class="w-2.5 h-2.5 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
                >
                <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 1 1 5l4 4"
                />
                </svg>
            </button>

            <button
            id="next-button"
            class="flex items-center justify-center px-3 h-8 ms-0 leading-tight bg-slate-300 hover:bg-slate-500 transition-colors rounded"
            >
                <svg
                id="next-button"
                class="w-2.5 h-2.5 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
                >
                <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 9 4-4-4-4"
                />
                </svg>
            </button>
        </div>
        `);

    // Sets the global document object to be the jsdom document.
    global.document = dom.window.document;
  });

  afterEach(() => {
    // Cleans up the global document object after each test.
    global.document = undefined;
  });

  test("Go to the next page", () => {
    // Saves the currentOffset
    const currentOffset = getOffset();

    // Creates a fake event
    const event = { id: "next-button" };

    // Calls the function to the test.
    handleButtonClick(event);

    // Checks if newOffset increased by 20
    const newOffset = getOffset();
    expect(newOffset).toBe(currentOffset + 20);
  });

  test("Go to the previous page", () => {
    // Saves the currentOffset
    const currentOffset = getOffset();

    // Creates a fake event
    const event = { id: "previous-button" };

    // Calls the function to the test.
    handleButtonClick(event);

    // Checks if newOffset increased by 20
    const newOffset = getOffset();
    expect(newOffset).toBe(currentOffset - 20);
  });
});
