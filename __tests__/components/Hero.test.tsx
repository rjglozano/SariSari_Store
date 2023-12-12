import React from "react";
import { render, screen, cleanup } from "@testing-library/react";

import "@testing-library/jest-dom";
import Hero from "@/components/Hero";

describe("Dashboard page", () => {
afterEach(() => {
        cleanup();
    });
    
  it("should render properly", () => {
    render(<Hero />);

    const header = screen.getByRole("heading");
    const headerText = "Sari-Sari Store";
    expect(header).toHaveTextContent(headerText);
  });
});
