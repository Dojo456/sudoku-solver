export class Square {
    spaces: number[][];

    constructor(spaces: number[][]) {
        this.spaces = spaces;
    }

    toString(): string {
        return this.spaces.map((row) => row.join(" ")).join("\n");
    }
}

export class Board {
    squares: Square[][];

    constructor(squares: Square[][]) {
        this.squares = squares;
    }

    toString(): string {
        console.table(
            this.squares.map((row) => row.map((square) => square.toString()))
        );

        return "";
    }
}
