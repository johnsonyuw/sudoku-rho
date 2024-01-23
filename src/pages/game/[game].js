import { useRouter } from "next/router";
import Link from "next/link";

import SudokuSection from "@/components/sudoku/app";
import ConstraintDrowdown from "@/components/sudoku/constraints";
import SudokuActions from "@/components/sudoku/actions";
import usePuzzle from "@/contexts/puzzleContext";
import RootLayout from "@/app/layout"
import { useEffect } from "react";

export default function Home() {
    const router = useRouter();
    const { game } = router.query;
    console.log(game);
    const { state: { puzzleCreatingMode } } = usePuzzle();
    // Register service worker
    useEffect(() => {
        if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
        navigator.serviceWorker.register("/sw.js")
        }
    })
    return (
        <div
        data-theme={puzzleCreatingMode ? 'bumblebee' : 'dracula'}
        className="min-h-screen"
        >
        <Navbar />
        <main className="container mx-auto">
            <SudokuSection />
        </main>
        </div>
    );
}

const Navbar = () => (
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
        <li>
          <SudokuActions />
        </li>
      </ul>
    </div>
  </div>
);
