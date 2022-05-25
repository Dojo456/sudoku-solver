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
            return arr.some((element, index) => {
                if (element !== null) {
                    return arr.indexOf(element) !== index;
                } else {
                    return false;
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
    };

    const solveBoard = (board: Board): Board => {
        return board.fill(new Array<number>(9).fill(0));
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
