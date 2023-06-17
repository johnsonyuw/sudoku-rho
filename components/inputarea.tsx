import getSudokuEmptyBoard from "@/utils/getSudokuBoard";
import { Dispatch, SetStateAction, useState, ChangeEvent } from "react";

export default function InputArea({ data,
	setter,
}: {
	data: number[][];
	setter: Dispatch<SetStateAction<number[][]>>;
}) {
	// setting values
	const [value, setValue] = useState(data.map((e) => e.join("")).join(""));
	// creating validations
	enum validations {
		success = "textarea-success",
		warning = "textarea-warning",
		error = "textarea-error",
	}
	const [validation, setValidation] = useState<validations>(
		validations.success
	);
	// setting validations
	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		const newVal = e.target.value;
		setValue(newVal);
		if (/\D/.test(newVal)) return setValidation(validations.error);

		if (newVal.length !== 81) setValidation(validations.warning);
		else setValidation(validations.success);

		// TODO: Combine these two lines into one
		const newData = newVal
			.split("")
			.map((e) => parseInt(e))
			.reduce((acc, cur, i) => {
				acc[Math.floor(i / 9)][i % 9] = cur;
				return acc;
			}, getSudokuEmptyBoard());
		setter(newData);
	};

	return (
		<div>
			<textarea
				maxLength={81}
				value={value}
				rows={3}
				onChange={handleChange}
				className={"textarea-bordered textarea w-full " + validation}
			></textarea>
		</div>
	);
}