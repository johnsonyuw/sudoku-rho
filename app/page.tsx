"use client";
import Link from "next/link";
import { useState } from "react";

import SudokuBoard from "@/components/sudoku";
import getSudokuEmptyBoard from "@/utils/getSudokuBoard";
import InputArea from "@/components/inputarea";

export default function Home() {
  const [sudokuInput, setSudokuInput] = useState<number[][]>(
    getSudokuEmptyBoard()
  );
  return (
    <>
      <Navbar />
      <main className="container mx-auto">
        <SudokuBoard board={sudokuInput} />
        <InputArea data={sudokuInput} setter={setSudokuInput} />
      </main>
    </>
  );
}

const Navbar: React.FC = () => (
  <div className="navbar bg-base-300">
    <Link className="btn-ghost btn text-xl normal-case" href="">
      Sudoku
    </Link>
  </div>
);
