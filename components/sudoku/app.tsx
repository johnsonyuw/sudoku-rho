"use client";
import { BoardProvider } from "@/contexts/boardContext";
import SudokuActions from "./actions";
import SudokuBoard from "./board";
import SudokuInputs from "./inputs";
import ConstraintsInput from "./constraints";

export default function SudokuSection() {
  return (
    <BoardProvider>
      <section>
        <SudokuBoard />
        <SudokuInputs />
        <SudokuActions />
      </section>
    </BoardProvider>
  );
}
