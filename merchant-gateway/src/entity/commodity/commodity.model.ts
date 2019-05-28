export class Commodity {
    constructor(
        public id?: string,
        public name?: string,
        public description?: string,
        public tags?: string[],
        public isPublished?: boolean
    ) { }
}