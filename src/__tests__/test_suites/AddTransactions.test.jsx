import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../../components/App";

test("adds a new transaction to the frontend", async () => {
  global.fetch = vi
    .fn()
    .mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: () => Promise.resolve([]),
    })
    .mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: () =>
        Promise.resolve({
          id: 1,
          date: "2024-05-14",
          description: "Coffee",
          category: "Food",
          amount: "5.25",
        }),
    });

  render(<App />);

  fireEvent.change(document.querySelector('input[name="date"]'), {
    target: { value: "2024-05-14" },
  });

  fireEvent.change(screen.getByPlaceholderText("Description"), {
    target: { value: "Coffee" },
  });

  fireEvent.change(screen.getByPlaceholderText("Category"), {
    target: { value: "Food" },
  });

  fireEvent.change(screen.getByPlaceholderText("Amount"), {
    target: { value: "5.25" },
  });

  fireEvent.submit(document.querySelector("form"));

  expect(await screen.findByText("Coffee")).toBeInTheDocument();
  expect(screen.getByText("Food")).toBeInTheDocument();
  expect(screen.getByText("5.25")).toBeInTheDocument();
});

test("calls POST request when adding a transaction", async () => {
  global.fetch = vi
    .fn()
    .mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: () => Promise.resolve([]),
    })
    .mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: () =>
        Promise.resolve({
          id: 1,
          date: "2024-05-14",
          description: "Coffee",
          category: "Food",
          amount: "5.25",
        }),
    });

  render(<App />);

  fireEvent.change(document.querySelector('input[name="date"]'), {
    target: { value: "2024-05-14" },
  });

  fireEvent.change(screen.getByPlaceholderText("Description"), {
    target: { value: "Coffee" },
  });

  fireEvent.change(screen.getByPlaceholderText("Category"), {
    target: { value: "Food" },
  });

  fireEvent.change(screen.getByPlaceholderText("Amount"), {
    target: { value: "5.25" },
  });

  fireEvent.submit(document.querySelector("form"));

  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:6001/transactions",
      expect.objectContaining({
        method: "POST",
      })
    );
  });
});