import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import AboutPage from "@/components/AboutPage";

describe("AboutPage component", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render properly", () => {
    render(<AboutPage />);

    // Replace the following line with the appropriate query for your heading element
    const header = screen.getByRole("heading", { name: /About Our Sari-Sari Store/i });
    const firstParagraph = screen.getByText(/Welcome to our Sari-Sari store/i);

    // You can add more queries based on the specific content of your component

    expect(header).toBeInTheDocument();
    expect(firstParagraph).toBeInTheDocument();
  });
});
