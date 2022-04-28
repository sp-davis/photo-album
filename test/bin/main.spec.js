
import fetch from 'isomorphic-unfetch';

jest.mock('isomorphic-unfetch');

describe('main', () => {
    let givenArg,
        expectedFetchQuery,
        givenBody,
        log;

    beforeEach(() => {
        givenArg = chance.d12();
        process.argv[2] = givenArg;
        givenBody = [{
            id: chance.natural(),
            albumId: givenArg,
            title: chance.sentence(),
            url: chance.string(),
            thumbnailUrl: chance.string(),
        }];
        expectedFetchQuery = `https://jsonplaceholder.typicode.com/photos?albumId=${givenArg}`;

        log = jest.spyOn(console, "log").mockImplementation(() => {});
    });

    afterEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    });

    describe('when the user input is a valid number', () => {
        beforeEach(() => {
            fetch.mockResolvedValue({
                json() {
                    return Promise.resolve(givenBody);
                }
            });

            jest.isolateModules(() => {
                require('../../bin/main');
            });
        });

        it('should fetch jsonplaceholder with the given arg', () => {
            expect(fetch).toHaveBeenCalledTimes(1);
            expect(fetch).toHaveBeenCalledWith(expectedFetchQuery);
        });

        it('should log out the album id and title', () => {
            expect(log).toHaveBeenCalledTimes(1);
            expect(log).toHaveBeenCalledWith(`[${givenBody[0].id}] ${givenBody[0].title}`);
        });
    });

    describe('when the user input returns no albums', () => {
        beforeEach(() => {
            fetch.mockResolvedValue({
                json() {
                    return Promise.resolve([]);
                }
            });

            jest.isolateModules(() => {
                require('../../bin/main');
            });
        });

        it('should fetch jsonplaceholder with the given arg', () => {
            expect(fetch).toHaveBeenCalledTimes(1);
            expect(fetch).toHaveBeenCalledWith(expectedFetchQuery);
        });

        it('should throw an error', () => {
            expect(log).toHaveBeenCalledTimes(1);
            expect(log).toHaveBeenCalledWith('Lookup failed! Make sure to enter a number.', 'The input returned no albums.');
        });

    });

    describe('when the lookup errors', () => {
        let testError;

        beforeEach(() => {
            testError = new Error('Test Error');
            fetch.mockResolvedValue({
                json() {
                    return Promise.reject(testError);
                }
            });

            jest.isolateModules(() => {
                require('../../bin/main');
            });
        });

        it('should fetch jsonplaceholder with the given arg', () => {
            expect(fetch).toHaveBeenCalledTimes(1);
            expect(fetch).toHaveBeenCalledWith(expectedFetchQuery);
        });

        it('should throw an error', () => {
            expect(log).toHaveBeenCalledTimes(1);
            expect(log).toHaveBeenCalledWith('Lookup failed! Make sure to enter a number.', testError);
        });
    });
});
