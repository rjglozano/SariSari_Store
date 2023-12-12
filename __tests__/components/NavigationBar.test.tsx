import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import NavigationBar from "@/components/NavigationBar";

describe("NavigationBar component", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render properly", () => {
    render(<NavigationBar />);

    const logo = screen.getByAltText("Sari-Sari Logo");
    expect(logo).toBeInTheDocument();

    const navLinks = screen.getAllByRole("link");
    expect(navLinks).toHaveLength(4); 

  });
});
