# Photo Album
This command line app was built for a technical showcase for Lean TECHniques. It is designed to take a number and query an external api `(https://jsonplaceholder.typicode.com/photos)`. With the response it logs to the console the photo ids and titles from the selected album.

## Installation
*This assumes that you are able to run node apps on your machine.*

To install, run:
- `npm install`
- `npm install -g .`

## Running the application
To use the app simply run `photo-album` with the number of the album you want to select.

example: `>photo-album 2` will return a list of album ids and titles for the album with an Id of 2.
