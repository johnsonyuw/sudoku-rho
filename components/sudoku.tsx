"use client";
import usePuzzle from "@/contexts/puzzleContext";
import { chunk } from "underscore";

export default function SudokuSection() {
  return (
    <section>
      <SudokuBoard />
    </section>
  );
}

function SudokuBoard() {
  const board = usePuzzle().state.sudoku;
  return (
    <div className="grid aspect-square content-center gap-4">
      {chunk(board, 3).map((rowChunk, x) => (
        <div
          key={x}
          className="flex flex-col items-center justify-center gap-1"
        >
          {rowChunk.map((row, i) => (
            <div className="grid grid-cols-3 gap-4" key={`${i}${x}`}>
              {chunk(row, 3).map((colChunk, y) => (
                <div className="flex justify-center gap-1" key={`${i}${y}`}>
                  {colChunk.map((value, j) => (
                    <SudokuCell
                      key={`${i}${y}${j}`}
                      value={value}
                      idx={[x * 3 + i, y * 3 + j]}
                    />
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

function SudokuCell({
  value = 0,
  idx,
}: {
  value: number;
  idx: [number, number];
}) {
  return (
    <>
      <button
        className="btn-ghost btn bg-base-200 font-medium"
        onFocus={() => console.log(idx)}
      >
        <span className={value === 0 ? "invisible" : "visible"}>{value}</span>
      </button>
    </>
  );
}
