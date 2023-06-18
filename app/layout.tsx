import { PuzzleProvider } from "@/contexts/puzzleContext";
import "./globals.css";

export const metadata = {
  title: "Sudoku",
  description: "Sudoku App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dracula">
      <PuzzleProvider>
        <body>{children}</body>
      </PuzzleProvider>
    </html>
  );
}
