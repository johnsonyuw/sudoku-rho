import {
  RowsValidation,
  ColsValidation,
  BoxesValidation,
  DiagonalsValidation,
} from "./sudokuValidationFns";

export enum constraintsEnum {
  uRows = "unique rows",
  uCols = "unique columns",
  uBoxes = "unique boxes",
  uDiags = "unique diagonals"
}
export const constraintsList: { name: constraintsEnum, value: boolean }[] = [
  { name: constraintsEnum.uRows, value: true },
  { name: constraintsEnum.uCols, value: true },
  { name: constraintsEnum.uBoxes, value: true },
  { name: constraintsEnum.uDiags, value: false },
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
