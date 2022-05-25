import WorkerCode from "./worker";

export type Board = Row[];
export type Row = (number | null)[];

enum ReceivableMessageType {
    isValidBoard,
    solveBoard,
}
// A ReceivableMessage is a message that can be received by the main thread that created the WebWorker
type ReceivableMessage = {
    type: ReceivableMessageType;
    data: any;
};
function isReceivableMessage(message: any): message is ReceivableMessage {
    const as = message as SendableMessage;

    const validType =
        message.type !== undefined && message.type in ReceivableMessageType;

    return validType && as.data !== undefined;
}

enum SendableMessageType {
    isValidBoard,
    solveBoard,
}
// A ReceivableMessage is a message that can be sent by the main thread to a WebWorker
type SendableMessage = {
    type: SendableMessageType;
    data: any;
};

export function isValidBoard(board: Board): boolean {
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
}

interface WorkerInterface {
    sendMessage: (message: SendableMessage) => void;
    onMessage: (message: ReceivableMessage) => void;
}
class CustomWorker extends Worker implements WorkerInterface {
    onMessage: (message: ReceivableMessage) => void;

    constructor() {
        const code = WorkerCode.toString();
        const blob = new Blob([`(${code})()`]);
        super(URL.createObjectURL(blob));

        this.onMessage = () => {};
        this.onmessage = (ev) => {
            const message = ev.data;
            console.log("received message", ev);
            if (isReceivableMessage(message)) {
                this.onMessage(message);
            }
        };
    }

    sendMessage(message: SendableMessage) {
        this.postMessage(message);
    }
}

let globalWorker: WorkerInterface | null;

export interface Processor {
    isValidBoard(board: Board): Promise<boolean>;
    solveBoard(board: Board): Promise<Board>;
    onMessage?: (message: ReceivableMessage) => void;
}

export function getProcessor(
    this: any,
    onMessage?: (message: ReceivableMessage) => void
): Processor {
    if (!globalWorker || globalWorker === null) {
        globalWorker = new CustomWorker();
    }
    const worker = globalWorker;

    if (onMessage) {
        this.onMessage = onMessage;
    }

    const solveBoard = async (board: Board): Promise<Board> => {
        return new Promise<Board>((resolve, reject) => {
            worker.sendMessage({
                type: SendableMessageType.solveBoard,
                data: board,
            });

            worker.onMessage = (message) => {
                if (message.type === ReceivableMessageType.solveBoard) {
                    resolve(message.data);
                }
            };
        });
    };

    return {
        isValidBoard: async () => false,
        solveBoard: solveBoard,
    };
}
