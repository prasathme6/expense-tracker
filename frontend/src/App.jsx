import { useEffect, useState } from "react";
import "./App.css";

const categories = [
  "travel",
  "food",
  "bills",
  "clothes",
  "shopping",
  "entertainment",
  "health",
  "education",
  "other"
];

const paymentMethods = [
  "UPI",
  "cash",
  "card",
  "net banking",
  "other"
];

function App() {
  const [expenses, setExpenses] = useState([]);

  const [form, setForm] = useState({
    amount: "",
    description: "",
    category: "",
    date: "",
    paymentMethod: ""
  });

  const [category, setCategory] = useState("");
  const [categoryExpenses, setCategoryExpenses] = useState([]);
  const [categoryTotal, setCategoryTotal] = useState(0);

  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentExpenses, setPaymentExpenses] = useState([]);
  const [paymentTotal, setPaymentTotal] = useState(0);

  // Get all expenses
  const getExpenses = async () => {
    try {
      const response = await fetch(
        "/api/all"
      );

      if (!response.ok) {
        throw new Error("Failed to get expenses");
      }

      const data = await response.json();

      setExpenses(data);
    } catch (error) {
      console.error("Error getting expenses:", error);
    }
  };

  // Add expense
  const addExpense = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "/api/all",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            amount: Number(form.amount),
            description: form.description,
            category: form.category,
            date: form.date,
            paymentMethod: form.paymentMethod
          })
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add expense");
      }

      alert("Expense added successfully!");

      setForm({
        amount: "",
        description: "",
        category: "",
        date: "",
        paymentMethod: ""
      });

      getExpenses();

    } catch (error) {
      console.error(error);
      alert("Failed to add expense");
    }
  };

  // Delete expense
  const deleteExpense = async (id) => {
    try {
      const response = await fetch(
        `/api/del/${id}`,
        {
          method: "DELETE"
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete");
      }

      alert("Expense deleted!");

      getExpenses();

      if (category) {
        searchCategory();
      }

      if (paymentMethod) {
        searchPaymentMethod();
      }

    } catch (error) {
      console.error(error);
      alert("Failed to delete expense");
    }
  };

  // Search by category
  const searchCategory = async () => {
    if (!category) {
      alert("Please select a category");
      return;
    }

    try {
      const response = await fetch(
        `/api/cat?cat=${encodeURIComponent(category)}`
      );

      if (!response.ok) {
        throw new Error("Failed to get category expenses");
      }

      const data = await response.json();

      setCategoryExpenses(data.expenses);
      setCategoryTotal(data.totalExpense);

    } catch (error) {
      console.error(error);
      alert("Failed to get category expenses");
    }
  };

  // Search by payment method
  const searchPaymentMethod = async () => {
    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }

    try {
      const response = await fetch(
        `/api/pay?pay=${encodeURIComponent(paymentMethod)}`
      );

      if (!response.ok) {
        throw new Error("Failed to get payment method expenses");
      }

      const data = await response.json();

      setPaymentExpenses(data.expenses);
      setPaymentTotal(data.totalExpense);

    } catch (error) {
      console.error(error);
      alert("Failed to get payment method expenses");
    }
  };

  // Load all expenses when page opens
  useEffect(() => {
    getExpenses();
  }, []);

  return (
    <div className="container">

      {/* Header */}
      <div className="header">
        <h1>Expense Tracker</h1>
        <p>Manage and track your daily expenses</p>
      </div>


      {/* Add Expense */}
      <div className="card">

        <h2>Add Expense</h2>

        <form onSubmit={addExpense} className="expense-form">

          <div className="form-group">
            <label>Amount</label>

            <input
              type="number"
              placeholder="Enter amount"
              min="1"
              value={form.amount}
              onChange={(e) =>
                setForm({
                  ...form,
                  amount: e.target.value
                })
              }
              required
            />
          </div>


          <div className="form-group">
            <label>Description</label>

            <input
              type="text"
              placeholder="Enter description"
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value
                })
              }
              required
            />
          </div>


          <div className="form-group">
            <label>Category</label>

            <select
              value={form.category}
              onChange={(e) =>
                setForm({
                  ...form,
                  category: e.target.value
                })
              }
              required
            >
              <option value="">
                Select Category
              </option>

              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>


          <div className="form-group">
            <label>Date</label>

            <input
              type="date"
              value={form.date}
              onChange={(e) =>
                setForm({
                  ...form,
                  date: e.target.value
                })
              }
              required
            />
          </div>


          <div className="form-group">
            <label>Payment Method</label>

            <select
              value={form.paymentMethod}
              onChange={(e) =>
                setForm({
                  ...form,
                  paymentMethod: e.target.value
                })
              }
              required
            >
              <option value="">
                Select Payment Method
              </option>

              {paymentMethods.map((method) => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </select>
          </div>


          <div className="form-button">
            <button type="submit">
              + Add Expense
            </button>
          </div>

        </form>

      </div>


      {/* Search Section */}
      <div className="search-grid">

        {/* Category Search */}
        <div className="card search-card">

          <h2>Search by Category</h2>

          <div className="search-box">

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
            >
              <option value="">
                Select Category
              </option>

              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <button onClick={searchCategory}>
              Search
            </button>

          </div>

        </div>


        {/* Payment Search */}
        <div className="card search-card">

          <h2>Search by Payment Method</h2>

          <div className="search-box">

            <select
              value={paymentMethod}
              onChange={(e) =>
                setPaymentMethod(e.target.value)
              }
            >
              <option value="">
                Select Payment Method
              </option>

              {paymentMethods.map((method) => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </select>

            <button onClick={searchPaymentMethod}>
              Search
            </button>

          </div>

        </div>

      </div>


      {/* Category Result */}
      {category && categoryExpenses.length > 0 && (

        <div className="card result-card">

          <div className="result-header">

            <div>
              <h2>Category Expenses</h2>

              <p>
                Showing expenses for{" "}
                <strong>{category}</strong>
              </p>
            </div>

            <div className="total-box">
              <span>Total Expense</span>
              <strong>₹{categoryTotal}</strong>
            </div>

          </div>


          <div className="table-container">

            <table>

              <thead>
                <tr>
                  <th>ID</th>
                  <th>Amount</th>
                  <th>Description</th>
                  <th>Date</th>
                  <th>Payment Method</th>
                </tr>
              </thead>

              <tbody>

                {categoryExpenses.map((expense) => (

                  <tr key={expense.id}>

                    <td>{expense.id}</td>

                    <td className="amount">
                      ₹{expense.amount}
                    </td>

                    <td>
                      {expense.description}
                    </td>

                    <td>
                      {expense.date}
                    </td>

                    <td>
                      <span className="badge">
                        {expense.paymentMethod}
                      </span>
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      )}


      {/* Payment Method Result */}
      {paymentMethod && paymentExpenses.length > 0 && (

        <div className="card result-card">

          <div className="result-header">

            <div>
              <h2>Payment Method Expenses</h2>

              <p>
                Showing expenses paid using{" "}
                <strong>{paymentMethod}</strong>
              </p>
            </div>

            <div className="total-box">
              <span>Total Expense</span>
              <strong>₹{paymentTotal}</strong>
            </div>

          </div>


          <div className="table-container">

            <table>

              <thead>
                <tr>
                  <th>ID</th>
                  <th>Amount</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>

                {paymentExpenses.map((expense) => (

                  <tr key={expense.id}>

                    <td>{expense.id}</td>

                    <td className="amount">
                      ₹{expense.amount}
                    </td>

                    <td>
                      {expense.description}
                    </td>

                    <td>
                      {expense.category}
                    </td>

                    <td>
                      {expense.date}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      )}


      {/* All Expenses */}
      <div className="card">

        <div className="section-header">

          <div>
            <h2>All Expenses</h2>
            <p>
              All your recorded expenses
            </p>
          </div>

          <div className="expense-count">
            {expenses.length} Expenses
          </div>

        </div>


        <div className="table-container">

          <table>

            <thead>

              <tr>
                <th>ID</th>
                <th>Amount</th>
                <th>Description</th>
                <th>Category</th>
                <th>Date</th>
                <th>Payment Method</th>
                <th>Action</th>
              </tr>

            </thead>


            <tbody>

              {expenses.length === 0 ? (

                <tr>
                  <td
                    colSpan="7"
                    className="empty"
                  >
                    No expenses found
                  </td>
                </tr>

              ) : (

                expenses.map((expense) => (

                  <tr key={expense.id}>

                    <td>
                      {expense.id}
                    </td>

                    <td className="amount">
                      ₹{expense.amount}
                    </td>

                    <td>
                      {expense.description}
                    </td>

                    <td>
                      <span className="category-badge">
                        {expense.category}
                      </span>
                    </td>

                    <td>
                      {expense.date}
                    </td>

                    <td>
                      <span className="badge">
                        {expense.paymentMethod}
                      </span>
                    </td>

                    <td>

                      <button
                        className="delete"
                        onClick={() =>
                          deleteExpense(expense.id)
                        }
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default App;