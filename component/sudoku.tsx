import { chunk } from "underscore";

export default function SudokuBoard({ board }: { board: number[][] }) {
	return (
		<div className="grid aspect-square grid-cols content-center gap-4">
			{chunk(board, 3).map((rowChunk, x) => (
				<div key={x} className="flex gap-1 justify-center items-center flex-col">
					{
						rowChunk.map((row, i) => (
							<div className="grid grid-cols-3 gap-4" key={`${i}${x}`}>
								{chunk(row, 3).map((colChunk, j) => (
									<div className="flex gap-1 justify-center" key={`${i}${j}`}>
										{colChunk.map((value, k) => (
											<SudokuCell key={`${i}${j}${k}`} value={value} />
										))}
									</div>
								))}
							</div>
						))}
				</div>
			))}
		</div>
	);
}

function SudokuCell({ value = 0 }: { value: number }) {
	return (
		<button className="btn-ghost btn-circle btn bg-base-200 font-medium">
			<span className={value === 0 ? "invisible" : "visible"}>{value}</span>
		</button>
	);
}