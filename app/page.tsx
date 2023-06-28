"use client";
import Link from "next/link";

import SudokuSection from "@/components/sudoku/app";
import ConstraintDrowdown from "@/components/sudoku/constraints";
import SudokuActions from "@/components/sudoku/actions";

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
    <div className="flex-1">
      <Link className="btn-ghost btn text-xl normal-case" href="">
        Sudoku
      </Link>
    </div>
    <div className="flex-none">
      <ul className="menu menu-horizontal px-1">
        <li>
          <ConstraintDrowdown />
        </li>
        {/* <li>
          <SudokuActions />
        </li> */}
      </ul>
    </div>
  </div>
);
