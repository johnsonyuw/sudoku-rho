export default function SudokuActions() {
  return (
    <details className="dropdown-end dropdown">
      <summary>Actions</summary>
      <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 gap-1">
        <li><SolveBtn /></li>
        <li><ResetBtn /></li>
      </ul>
    </details>
  );
}

function SolveBtn() {
  return <button className="btn btn-block btn-sm content-center btn-primary">Solve</button>
}

function ResetBtn() {
  return <button className="btn btn-block btn-sm content-center btn-error">Reset</button>
}

