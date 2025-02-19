import AmountDisplay from "./AmountDisplay";
import { useBudget } from "../hooks/useBudget";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
export default function BudgetTracker() {
  const { state, totalExpenses, totalAvailable, dispatch } = useBudget();
  const percentage = +((totalExpenses / state.budget) * 100).toFixed(2);
  const color = percentage === 100 ? "#dc2626" : "#3b82f6";
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center">
        <CircularProgressbar
          value={percentage}
          text={`${percentage}% gastado`}
          styles={buildStyles({
            pathColor: color,
            textColor: color,
            trailColor: "#f5f5f5",
            textSize: 8,
          })}
        />
      </div>
      <div className="flex flex-col justify-center items-center gap-8">
        <button
          type="button"
          className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg"
          onClick={() => dispatch({ type: "reset" })}
        >
          Borrar datos de App
        </button>

        <AmountDisplay label="Presupuesto" amount={state.budget} />

        <AmountDisplay label="Disponible" amount={totalAvailable} />

        <AmountDisplay label="Gastado" amount={totalExpenses} />
      </div>
    </div>
  );
}
