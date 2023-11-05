import DeleteIcon from "../icons/DeleteIcon";
import { Column, Id } from "../types/Column";

interface Props {
	column: Column;
	deleteColumn: (id: Id) => void;
}

const ColumnContainer = ({ column, deleteColumn }: Props) => {
	return (
		<div className="bg-colBg w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col">
			{/* Title */}
			<div className="bg-mainBg text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-colBg border-4 flex items-center justify-between">
				<div className="flex gap-4">
					<div className="flex justify-center items-center bg-colBg px-2 py-1 text-sm rounded-full">
						0
					</div>
					{column.title}
				</div>
				<button
					className="stroke-gray-500 hover:stroke-white hover:bg-colBg rounded px-2 py-2"
					onClick={() => deleteColumn(column.id)}
				>
					<DeleteIcon />
				</button>
			</div>

			{/* Bookmarks */}
			<div className=""></div>

			{/* Footer */}
		</div>
	);
};

export default ColumnContainer;
