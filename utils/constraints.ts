import {
  RowsValidation,
  ColsValidation,
  BoxesValidation,
  DiagonalsValidation,
} from "./sudokuValidationFns";

export const constraintsList = [
  { name: "rowUnique", value: true },
  { name: "colUnique", value: true },
  { name: "boxUnique", value: true },
  { name: "diagonalUnique", value: false },
];

export function getConstraintValidationFn(name: string) {
  switch (name) {
    case "rowUnique":
      return RowsValidation;
    case "colUnique":
      return ColsValidation;
    case "boxUnique":
      return BoxesValidation;
    case "diagonalUnique":
      return DiagonalsValidation;
    default:
      throw new Error("Invalid constraint name");
  }
}
