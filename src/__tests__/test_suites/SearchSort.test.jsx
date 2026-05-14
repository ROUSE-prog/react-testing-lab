import { render, screen, fireEvent } from "@testing-library/react";
import App from "../../components/App";

const mockTransactions = [
  {
    id: 1,
    date: "2019-12-01",
    description: "Paycheck from Bob's Burgers",
    category: "Income",
    amount: 1000,
  },
  {
    id: 2,
    date: "2019-12-02",
    description: "Fancy Coffee",
    category: "Food",
    amount: -5.5,
  },
  {
    id: 3,
    date: "2019-12-03",
    description: "Rent",
    category: "Housing",
    amount: -950,
  },
];

test("filters transactions based on search input", async () => {
  global.setFetchResponse(mockTransactions);

  render(<App />);

  expect(
    await screen.findByText("Paycheck from Bob's Burgers")
  ).toBeInTheDocument();

  fireEvent.change(
    screen.getByPlaceholderText(/search your recent transactions/i),
    {
      target: { value: "coffee" },
    }
  );

  expect(screen.getByText("Fancy Coffee")).toBeInTheDocument();
  expect(screen.queryByText("Rent")).not.toBeInTheDocument();
  expect(
    screen.queryByText("Paycheck from Bob's Burgers")
  ).not.toBeInTheDocument();
});

test("sorts transactions by category", async () => {
  global.setFetchResponse(mockTransactions);

  render(<App />);

  expect(
    await screen.findByText("Paycheck from Bob's Burgers")
  ).toBeInTheDocument();

  fireEvent.change(screen.getByRole("combobox"), {
    target: { value: "category" },
  });

  const rows = screen.getAllByRole("row");

  expect(rows[1]).toHaveTextContent("Food");
  expect(rows[2]).toHaveTextContent("Housing");
  expect(rows[3]).toHaveTextContent("Income");
});