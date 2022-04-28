#!/usr/bin/env node
import fetch from 'isomorphic-unfetch'

const userInput = process.argv.slice(2);

export const main = async (albumId) => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
        const body = await response.json();

        if (!body.length) {
            throw 'The input returned no albums.';
        }

        body.forEach(album => console.log(`[${album.id}] ${album.title}`));
    } catch (err) {
        console.log('Lookup failed! Make sure to enter a number.', err);
    }
};

main(userInput);
