"use client";
import Link from "next/link";
import { useState } from "react";

import SudokuBoard from "@/components/sudoku";
import getDefaultSudokuBoard from "@/utils/getSudokuBoard";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto">
        <SudokuBoard />
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
