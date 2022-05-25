export type Board = Row[];

type Row = (number | null)[];

export function isValidBoard(board: Board): boolean {
    const hasDuplicates = (arr: Row): boolean => {
        return arr.some((element, index) => {
            if (element !== null) {
                return arr.indexOf(element) !== index;
            }
        });
    };

    for (let i = 0; i < 9; i++) {
        const thisRow: Row = [];
        const thisColumn: Row = [];
        const thisBlock: Row = [];

        // to traverse by block, convert to base three
        // for outer blocks, increment x by 3 * first digit and increment y by 3 * second digit
        // for inner blocks, just convert j to base three and use first digit as x and second as y

        const firstDigit = Math.floor(i / 3);
        const secondDigit = i % 3;

        for (let j = 0; j < 9; j++) {
            const horizontal = board[i][j];
            const vertical = board[j][i];

            const x = Math.floor(j / 3);
            const y = j % 3;
            const block = board[x + firstDigit * 3][y + secondDigit * 3];

            thisRow.push(horizontal);
            thisColumn.push(vertical);
            thisBlock.push(block);
        }

        if (
            hasDuplicates(thisRow) ||
            hasDuplicates(thisColumn) ||
            hasDuplicates(thisBlock)
        ) {
            return false;
        }
    }

    return true;
}
