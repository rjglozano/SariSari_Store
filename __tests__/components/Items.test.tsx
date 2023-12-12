import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import Items from "@/components/Items"; // Update the import path as needed

describe("Items component", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render properly", async () => {
    // Mock the data that the component fetches
    const mockItems = [
      {
        id: "1",
        name: "Item 1",
        description: "Description 1",
        price: "10.00",
        image: "item1.jpg",
      },
      {
        id: "2",
        name: "Item 2",
        description: "Description 2",
        price: "20.00",
        image: "item2.jpg",
      },
    ];

    // Mock the fetch function to return the mock data
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockItems),
    } as unknown as Response);

    render(<Items />);

    // Use assertions to check if the rendered content is correct
    // You can customize these assertions based on your component structure
    const itemNames = await screen.findAllByText(/Item \d/);
    expect(itemNames).toHaveLength(2);

    const viewDetailsButtons = screen.getAllByText("View Details");
    expect(viewDetailsButtons).toHaveLength(2);

    // Clean up the mock to ensure it doesn't affect other tests
    (global.fetch as jest.Mock).mockRestore();
  });
});
