import usePuzzle from "@/contexts/puzzleContext";

export default function SudokuActions() {
  return (
    <details className="dropdown-end dropdown">
      <summary>Actions</summary>
      <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 gap-1">
        <li><PuzzleCreationModeCheckbox /></li>
        <li><SolveBtn /></li>
        <li><ResetBtn /></li>
      </ul>
    </details>
  );
}

function PuzzleCreationModeCheckbox() {
  const { dispatch, state: { puzzleCreatingMode } } = usePuzzle();
  return <div className="block">
    <label className="flex cursor-pointer justify-between">
      <span className="label-text capitalize">Create Puzzle</span>
      <input
        type="checkbox"
        className="toggle-secondary toggle"
        checked={puzzleCreatingMode}
        onChange={() => dispatch({ type: "TOGGLE_PUZZLE_CREATION_MODE" })}
      />
    </label>
  </div>
}

function SolveBtn() {
  return <button className="btn btn-block btn-sm content-center btn-primary">Solve</button>
}

function ResetBtn() {
  return <button className="btn btn-block btn-sm content-center btn-error">Reset</button>
}

