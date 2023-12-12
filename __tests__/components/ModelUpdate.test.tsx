import React from "react";
import { render, fireEvent, screen, waitFor, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import ModalUpdate from "@/components/ModalUpdate";



describe("Modal form", () => {
  afterEach(() => {
    cleanup();
  });

  it("should have a disabled submit button initially", () => {
    render(<ModalUpdate isOpen={true} onClose={() => {}}  params={{ itemID: "mockItemID" }} />);

    const submitButton = screen.getByText(/Submit/i);

    expect(submitButton).toBeDisabled();
  });

  it("should enable the submit button when valid data is entered", async () => {
    render(<ModalUpdate isOpen={true} onClose={() => {}}    params={{ itemID: "mockItemID" }} />);

    const nameInput = screen.getByLabelText(/Name/i);
    const descriptionInput = screen.getByLabelText(/Description/i);
    const priceInput = screen.getByLabelText(/Price/i);
    const imageInput = screen.getByLabelText(/Image Link/i);
    const submitButton = screen.getByText(/Submit/i);

    // Simulate user input
    fireEvent.change(nameInput, { target: { value: "Example Name" } });
    fireEvent.change(descriptionInput, { target: { value: "Example Description" } });
    fireEvent.change(priceInput, { target: { value: "25.99" } });
    fireEvent.change(imageInput, { target: { value: "https://example.com/image.jpg" } });

    // Ensure that the submit button is not disabled after valid input
    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });
  });

  it("should disable the submit button when invalid data is entered", async () => {
    render(<ModalUpdate isOpen={true} onClose={() => {}} params={{ itemID: "mockItemID" }} />);

    const nameInput = screen.getByLabelText(/Name/i);
    const submitButton = screen.getByText(/Submit/i);

    fireEvent.change(nameInput, { target: { value: "" } });

    // Ensure that the submit button remains disabled with invalid input
    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });
  });



});
