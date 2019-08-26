export class IBooks {
    public id: number;
    public bookName: string;
    public author: string;
    public isFavourite: boolean;

    constructor(
        _id: number,
        _bookName: string,
        _author: string,
        _isFavourite: boolean
    ) {
        this.id = _id;
        this.bookName = _bookName;
        this.author = _author;
        this.isFavourite = _isFavourite;
    }
}