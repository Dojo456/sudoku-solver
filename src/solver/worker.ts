// eslint-disable-next-line import/no-anonymous-default-export
export default function () {
    type Board = Row[];
    type Row = (number | null)[];

    enum ReceivableMessageType {
        isValidBoard,
        solveBoard,
    }
    // A ReceivableMessage is a message that can be received by the main thread that created the WebWorker
    type ReceivableMessage = {
        type: ReceivableMessageType;
        data: any;
    };

    enum SendableMessageType {
        isValidBoard,
        solveBoard,
    }
    // A ReceivableMessage is a message that can be sent by the main thread to a WebWorker
    type SendableMessage = {
        type: SendableMessageType;
        data: any;
    };
    function isSendableMessage(message: any): message is SendableMessage {
        const as = message as SendableMessage;

        const validType =
            message.type !== undefined && message.type in SendableMessageType;

        return validType && as.data !== undefined;
    }

    const isValidBoard = (board: Board): boolean => {
        const hasDuplicates = (arr: Row): boolean => {
            const filtered = arr.filter(Number) as number[];

            return new Set(filtered).size !== filtered.length;
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
    };

    const solveBoard = (board: Board): Board => {
        // simple way to deep copy an object
        const b = JSON.parse(JSON.stringify(board));

        // @ts-ignore it's recursive lol
        const recurseSolve = (index: number): boolean => {
            if (index === 81) {
                return true;
            }

            const row = Math.floor(index / 9);
            const col = index % 9;

            const current = b[row][col];

            if (current === null) {
                let hasValid = false;

                for (let i = 1; i < 10; i++) {
                    b[row][col] = i;

                    if (isValidBoard(b)) {
                        hasValid = recurseSolve(index + 1);
                        if (hasValid) {
                            break;
                        }
                    }
                }

                if (!hasValid) {
                    b[row][col] = null;
                }

                return hasValid;
            } else {
                return recurseSolve(index + 1);
            }
        };
        recurseSolve(0);

        return b;
    };

    const handleMessage = (rawMessage: any): ReceivableMessage | Error => {
        if (isSendableMessage(rawMessage)) {
            const message = rawMessage as SendableMessage;

            switch (message.type) {
                case SendableMessageType.isValidBoard:
                    return {
                        type: ReceivableMessageType.isValidBoard,
                        data: isValidBoard(message.data),
                    };
                case SendableMessageType.solveBoard:
                    return {
                        type: ReceivableMessageType.solveBoard,
                        data: solveBoard(message.data),
                    };
                default:
                    return new Error("unknown message type");
            }
        } else {
            return new Error("could not properly receive message");
        }
    };

    // eslint-disable-next-line no-restricted-globals
    self.onmessage = (rawMessage) => {
        postMessage("yes");
        // a little wrapper function that allows me to write handleMessage like normal function
        postMessage(handleMessage(rawMessage.data));
    };
}
