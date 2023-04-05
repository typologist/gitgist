import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import GistList from "./GistList";

let fetchGists;
jest.mock("./GistList", () => ({
  ...jest.requireActual("./GistList"),
  fetchGists: jest.fn(),
}));

describe("GistList component", () => {
  it("renders without raising any errors", () => {
    render(<GistList />);
  });

  it("fetches gists on initial render", () => {
    render(<GistList />);
    expect(fetchGists).toHaveBeenCalledWith(1);
  });

  describe("search", () => {
    it("fetches gists belonging to the user entered on the search input, when clicking on the search button", () => {
      const searchInput = screen.getByLabelText("Enter a username");
      const searchButton = screen.getByText("Search");

      const defaultPage = 1;
      const username = "foo";
      fireEvent.change(searchInput, { target: { value: username } });
      fireEvent.click(searchButton);

      expect(fetchGists).toHaveBeenCalledWith(defaultPage, username);
    });

    it("fetches gists belonging to the user entered on the search input, when pressing the Enter key", () => {
      const searchInput = screen.getByLabelText("Enter a username");

      const defaultPage = 1;
      const username = "foo";
      fireEvent.change(searchInput, { target: { value: username } });
      fireEvent.keyDown(searchInput, { key: "Enter", code: 13 });

      expect(fetchGists).toHaveBeenCalledWith(defaultPage, username);
    });

    it("resets pagination to the first page when performing a search", () => {
      const nextButton = screen.getByText("Next Page");
      fireEvent.click(nextButton);

      // We're now on page 2. Let's search to reset this.
      const searchInput = screen.getByLabelText("Enter a username");
      const defaultPage = 1;
      const username = "foo";
      fireEvent.change(searchInput, { target: { value: username } });
      fireEvent.keyDown(searchInput, { key: "Enter", code: 13 });

      expect(fetchGists).toHaveBeenCalledWith(defaultPage, username);
    });
  });

  it("fetches gists with updated page number on Next Page button click", () => {
    const nextButton = screen.getByText("Next Page");
    fireEvent.click(nextButton);

    expect(fetchGists).toHaveBeenCalledWith(2);
  });

  it("fetches gists with updated page number on Previous Page button click", () => {
    // Go to the next page first, so we can come back.
    const nextButton = screen.getByText("Next Page");
    fireEvent.click(nextButton);

    const previousButton = screen.getByText("Previous Page");
    fireEvent.click(previousButton);

    expect(fetchGists).toHaveBeenCalledWith(1);
  });
});
