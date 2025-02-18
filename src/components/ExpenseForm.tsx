import { categories } from "../data/categories";
import DatePicker from "react-date-picker";
import "react-calendar/dist/Calendar.css";
import "react-date-picker/dist/DatePicker.css";
import { ChangeEvent, FormEvent, useState } from "react";
import { DraftExpense, Value } from "../types";
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";

export default function ExpenseForm() {
  const draftExpense = {
    amount: 0,
    name: "",
    category: "",
    date: new Date(),
  }
  const [expense, setExpense] = useState<DraftExpense>(draftExpense);

  const [error, setError] = useState("");

  const { dispatch } = useBudget();
  const handleChangeDate = (value: Value) => {
    setExpense({
      ...expense,
      date: value,
    });
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const isAmountField = ["amount"].includes(name);
    setExpense({
      ...expense,
      [name]: isAmountField ? Number(value) : value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.values(expense).includes("")) {
      setError("Todos los campos son obligatorios");
      return;
    } 

    dispatch({
      type: "add-expense",
      payload: { expense },
    });

    setExpense(draftExpense);
  };
  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
        Nuevo Gasto
      </legend>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <div className="flex flex-col gap-2">
        <label className="text-xl" htmlFor="name">
          Nombre Gasto:
        </label>
        <input
          type="text"
          id="name"
          placeholder="Agrega el nombre del gasto"
          className="bg-slate-100 p-2"
          name="name"
          onChange={handleChange}
          value = {expense.name}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xl" htmlFor="amount">
          Cantidad:
        </label>
        <input
          type="number"
          id="amount"
          placeholder="Agrega la cantidad del gasto: ej: 300.00"
          className="bg-slate-100 p-2"
          name="amount"
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xl" htmlFor="category">
          Categoria:
        </label>
        <select
          id="category"
          className="bg-slate-100 p-2"
          name="category"
          onChange={handleChange}
        >
          <option value="">-- Seleccione --</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xl">Fecha Gasto:</label>
        <DatePicker
          className="bg-slate-100 p-2 border-0"
          value={expense.date}
          onChange={handleChangeDate}
        />
      </div>

      <input
        type="submit"
        value="Agregar Gasto"
        className="bg-blue-600 w-full p-2 text-white uppercase font-bold rounded-lg"
      />
    </form>
  );
}
