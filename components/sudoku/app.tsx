"use client";
import { BoardProvider } from "@/contexts/boardContext";
import SudokuBoard from "./board";
import SudokuInputs from "./inputs";

export default function SudokuSection() {
  return (
    <BoardProvider>
      <section>
        <SudokuBoard />
        <SudokuInputs />
      </section>
    </BoardProvider>
  );
}
