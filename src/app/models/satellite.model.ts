export interface Satellite {
    id:    string;
    param: Param;
    val:   number;
    ts:    number;
}

export interface Param {
    name:      string;
    node:      number;
    satellite: number;
    table:     number;
}