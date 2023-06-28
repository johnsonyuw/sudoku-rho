import usePuzzle from "@/contexts/puzzleContext";

export default function ConstraintDrowdown() {
  return (
    <details className="dropdown-end dropdown">
      <summary>Constraints</summary>
      {/* <ul className="p-2 bg-base-100"> */}
      <ul className="dropdown-content menu rounded-box z-[1] w-60 bg-base-300 p-2 shadow">
        {usePuzzle().state.constraints.map((_, idx) => (
          <ConstraintButton key={idx} idx={idx} />
        ))}
      </ul>
    </details>
  );
}

function ConstraintButton({ idx }: { idx: number }) {
  const { dispatch } = usePuzzle();
  const { name, value } = usePuzzle().state.constraints[idx];
  return (
    <li>
      <div className="block">
        <label className="flex cursor-pointer justify-between">
          <span className="label-text capitalize">{name}</span>
          <input
            type="checkbox"
            className="toggle-secondary toggle"
            onClick={() =>
              dispatch({ type: "TOGGLE_CONSTRAINT", payload: idx })
            }
            checked={value}
          />
        </label>
      </div>
    </li>
  );
}
