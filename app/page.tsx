"use client";
import Link from "next/link";

import SudokuSection from "@/components/sudoku";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto">
        <SudokuSection />
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
