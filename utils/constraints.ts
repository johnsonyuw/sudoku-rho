import {
  RowsValidation,
  ColsValidation,
  BoxesValidation,
  DiagonalsValidation,
} from "./sudokuValidationFns";

export const constraintsList = [
  { name: "unique rows", value: true },
  { name: "unique columns", value: true },
  { name: "unique boxes", value: true },
  { name: "unique diagonals", value: false },
];

export function getConstraintValidationFn(name: string) {
  switch (name) {
    case "unique rows":
      return RowsValidation;
    case "unique columns":
      return ColsValidation;
    case "unique boxes":
      return BoxesValidation;
    case "unique diagonals":
      return DiagonalsValidation;
    default:
      throw new Error("Invalid constraint name");
  }
}
