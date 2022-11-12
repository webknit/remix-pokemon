const pokeApiUrl = 'https://pokeapi.co/api/v2';

export type Pokemon = {
    readonly name: string;
    readonly url: string;
}

export type SinglePokemon = {
    weight: number
    height: number
    abilities: Array<{ability: {name: string, url: string}, is_hidden: boolean, slot: number}>
}

export async function getAllPokemon(): Promise<Array<Pokemon>> {

    const request: Response = await fetch(`${pokeApiUrl}/pokemon/?limit=151`);
    const data: {
        count: number,
        next: string | null, 
        previous: string | null,
        results: Array<Pokemon>
    } = await request.json();
    const pokemon: Array<Pokemon> = await data.results;

    return pokemon;

}

export async function getSinglePokemon(id: string): Promise<SinglePokemon> {

    const request: Response = await fetch(`${pokeApiUrl}/pokemon/${id}/`);
    const {weight, height, abilities}: SinglePokemon = await request.json();
    const singlePoke: SinglePokemon = {
        weight, height, abilities
    }

    return singlePoke;

}