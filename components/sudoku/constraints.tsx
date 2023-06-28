import usePuzzle from "@/contexts/puzzleContext";

// TODO: Make UI better
export default function ConstraintsInput() {
	const { constraints } = usePuzzle().state;
	return (
		<div className="join w-full flex-wrap justify-center gap-1 py-4">
			{
				constraints.map((_constraint, idx) => (
					<ConstraintButton key={idx} idx={idx} />
				))
			}
		</div>
	)
}

function ConstraintButton({ idx }: { idx: number }) {
	const { dispatch } = usePuzzle();
	const constraintName = usePuzzle().state.constraints[idx].name;
	const handleClick = () => {
		dispatch({ type: "TOGGLE_CONSTRAINT", payload: idx });
	}
	return (
		<button
			className={`btn-sm join-item btn sm:btn-md ${usePuzzle().state.constraints[idx].value ? "btn-accent" : "btn-ghost bg-base-200"}`}
			onClick={handleClick}
		>
			{constraintName}
		</button>
	)
}
