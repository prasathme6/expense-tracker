import { useEffect, useState } from "react";
import "./App.css";

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

  // Get all expenses
  const getExpenses = async () => {

    try {

      const response = await fetch(
        "http://localhost:8080/api/all"
      );

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
        "http://localhost:8080/api/all",
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
        `http://localhost:8080/api/del/${id}`,
        {
          method: "DELETE"
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete");
      }

      alert("Expense deleted!");

      getExpenses();

      // Refresh category result if a category is selected
      if (category) {
        searchCategory();
      }

    } catch (error) {

      console.error(error);

      alert("Failed to delete expense");

    }
  };


  // Search category
  const searchCategory = async () => {

    if (!category.trim()) {

      alert("Please enter a category");

      return;
    }

    try {

      const response = await fetch(
        `http://localhost:8080/api/cat?cat=${encodeURIComponent(category)}`
      );

      if (!response.ok) {
        throw new Error("Failed to get category");
      }

      const data = await response.json();

      setCategoryExpenses(data.expenses);
      setCategoryTotal(data.totalExpense);

    } catch (error) {

      console.error(error);

      alert("Failed to get category expenses");

    }
  };

  // Load expenses when page opens
  useEffect(() => {

    getExpenses();

  }, []);


  return (

    <div className="container">

      <h1>Expense Tracker</h1>


      {/* Add Expense */}

      <div className="card">

        <h2>Add Expense</h2>

        <form onSubmit={addExpense}>

          <input
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) =>
              setForm({
                ...form,
                amount: e.target.value
              })
            }
            required
          />


          <input
            type="text"
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value
              })
            }
            required
          />


          <input
            type="text"
            placeholder="Category"
            value={form.category}
            onChange={(e) =>
              setForm({
                ...form,
                category: e.target.value
              })
            }
            required
          />


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

            <option value="UPI">
              UPI
            </option>

            <option value="Cash">
              Cash
            </option>

            <option value="Card">
              Card
            </option>

          </select>


          <button type="submit">
            Add Expense
          </button>

        </form>

      </div>


      {/* Category Search */}

      <div className="card">

        <h2>Search By Category</h2>

        <div className="category-search">

          <input
            type="text"
            placeholder="Enter category e.g. travel"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          />

          <button onClick={searchCategory}>
            Search
          </button>

        </div>


        {categoryExpenses.length > 0 && (

          <div>

            <h3>
              Category: {category}
            </h3>

            <h2>
              Total Expense: ₹{categoryTotal}
            </h2>


            <table>

              <thead>

                <tr>
                  <th>ID</th>
                  <th>Amount</th>
                  <th>Description</th>
                  <th>Date</th>
                  <th>Payment</th>
                </tr>

              </thead>


              <tbody>

                {categoryExpenses.map((expense) => (

                  <tr key={expense.id}>

                    <td>{expense.id}</td>

                    <td>
                      ₹{expense.amount}
                    </td>

                    <td>
                      {expense.description}
                    </td>

                    <td>
                      {expense.date}
                    </td>

                    <td>
                      {expense.paymentMethod}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>


      {/* All Expenses */}

      <div className="card">

        <h2>All Expenses</h2>

        <table>

          <thead>

            <tr>
              <th>ID</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Category</th>
              <th>Date</th>
              <th>Payment</th>
              <th>Action</th>
            </tr>

          </thead>


          <tbody>

            {expenses.map((expense) => (

              <tr key={expense.id}>

                <td>
                  {expense.id}
                </td>

                <td>
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

                <td>
                  {expense.paymentMethod}
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

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );
}

export default App;