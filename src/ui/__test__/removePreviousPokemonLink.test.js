import { removePreviousPokemonList } from "../removePreviousPokemonList.js";

// JSDOM is imported.
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

describe("removePreviousPokemonList", () => {
  beforeEach(() => {
    // A new instance of JSDOM is created for simulation.
    const dom = new JSDOM(`
      <html>
        <body>
          <ul>
            <li>Pikachu</li>
            <li>Bulbasaur</li>
            <li>Charmander</li>
          </ul>
        </body>
      </html>
    `);

    // Sets the global document object to be the jsdom document.
    global.document = dom.window.document;
  });

  afterEach(() => {
    // Cleans up the global document object after each test.
    global.document = undefined;
  });

  test("Elimina todos los elementos <li>", () => {
    // Calls the function you want to test.
    removePreviousPokemonList();

    // Checks if all <li> elements were removed.
    expect(document.querySelectorAll("li").length).toBe(0);
  });
});
