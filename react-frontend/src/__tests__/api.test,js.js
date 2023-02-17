import {
    getAnonUser,
    getImageUrl,
    getFormatedTime,
    createRecipe,
    getRecipePage,
    getRecipe,
    postRecipe,
    putRecipe,
    deleteRecipe,
    getRatingsPage,
    getRatingById,
    getAverageRating,
    postRating,
    putRating,
    deleteRating,
    postImages,
    deleteImage,
    getUser,
    postUser,
    getUserRecipesPage,
    getUserImages,
    getUserById,
    getUserRecipesPageById, getUserImagesById
} from "../modules/api";
import 'jest-fetch-mock';
import {fetchMock} from "jest-fetch-mock";
import 'cross-fetch/polyfill';

describe('Helper functions', () => {
    describe('getAnonUser', () => {
        it('should return an object with the correct properties', () => {
            const id = '123';
            const result = getAnonUser(id);
            expect(result).toEqual({
                userId: id,
                username: 'Anonym',
                profilePictureId: null,
            });
        });
    });

    describe('getImageUrl', () => {
        it('should return the correct URL for an image with an id of 0', () => {
            const id = '0';
            const result = getImageUrl(id);
            expect(result).toEqual('/platzhalter.jpg');
        });

        it('should return the correct URL for an image with an id of 1', () => {
            const id = '1';
            const result = getImageUrl(id);
            expect(result).toEqual(`https://api.meal-tiger.knoepfle.dev/image/1`);
        });
    });

    describe('getFormatedTime', () => {
        it('should return "1 Minute" when passed 1', () => {
            const time = 1;
            const result = getFormatedTime(time);
            expect(result).toEqual('1 Minute');
        });

        it('should return "2 Minuten" when passed 2', () => {
            const time = 2;
            const result = getFormatedTime(time);
            expect(result).toEqual('2 Minuten');
        });

        it('should return "1:30 Stunde" when passed 90', () => {
            const time = 90;
            const result = getFormatedTime(time);
            expect(result).toEqual('1:30 Stunde');
        });

        it('should return "2 Stunden" when passed 120', () => {
            const time = 120;
            const result = getFormatedTime(time);
            expect(result).toEqual('2 Stunden');
        });
    });

    describe('createRecipe', () => {
        it('should return an object with the correct properties', () => {
            const recipe = {
                title: 'Test recipe',
                ingredients: ['ingredient 1', 'ingredient 2'],
                description: 'Test description',
                difficulty: 2,
                time: 60,
            };
            const result = createRecipe(recipe);
            expect(result).toEqual({
                title: recipe.title,
                ingredients: recipe.ingredients,
                description: recipe.description,
                difficulty: recipe.difficulty,
                rating: 3,
                time: recipe.time,
            });
        });
    });

    describe('getRecipePage', () => {
        it('should return data when passed valid parameters', async () => {
            const mockData = { recipes: [{ id: 1, title: 'Test Recipe' }] };
            global.fetch = jest.fn(() => Promise.resolve(new Response(JSON.stringify(mockData), { status: 200 })));

            const [data, error] = await getRecipePage({ q: 'chicken', sort: 'asc', size: 10, page: 0 });

            expect(data).toBeTruthy();
            expect(error).toBeFalsy();
        });

        it('should return an error when passed invalid parameters', async () => {
            const mockData = { recipes: [{ id: 1, title: 'Test Recipe' }] };
            global.fetch = jest.fn(() => Promise.resolve(new Response(JSON.stringify(mockData), { status: 404 })));

            const [data, error] = await getRecipePage({ q: 'abcd', sort: 'asc', size: -10, page: -1 });

            expect(data).toBeFalsy();
            expect(error).toBeTruthy();
        });
    });

    describe('getRecipe', () => {
        it('should return data when passed a valid ID', async () => {
            const mockData = { recipes: [{ id: 1, title: 'Test Recipe' }] };
            global.fetch = jest.fn(() => Promise.resolve(new Response(JSON.stringify(mockData), { status: 200 })));

            const [data, error] = await getRecipe(1);

            expect(data).toBeTruthy();
            expect(error).toBeFalsy();
        });

        it('should return an error when passed an invalid ID', async () => {
            const mockData = { recipes: [{ id: 1, title: 'Test Recipe' }] };
            global.fetch = jest.fn(() => Promise.resolve(new Response(JSON.stringify(mockData), { status: 404 })));
            const [data, error] = await getRecipe(-1);

            expect(data).toBeFalsy();
            expect(error).toBeTruthy();
        });
    });

    describe('postRecipe', () => {
        it('should return the ID of the created recipe', async () => {
            const recipe = {
                id: 2,
                title: 'Test Recipe',
                ingredients: ['ingredient1', 'ingredient2'],
                instructions: 'Test instructions'
            };
            global.fetch = jest.fn(() => Promise.resolve(new Response(JSON.stringify(recipe), { status: 200 })));
            const [id, error] = await postRecipe(recipe);

            expect(id).toBeDefined();
            expect(error).toBeNull();
        });
    });

    describe('putRecipe', () => {
        it('should return null if the recipe is updated successfully', async () => {
            const mockData = { recipes: [{ id: 1, title: 'Test Recipe' }] };
            global.fetch = jest.fn(() => Promise.resolve(new Response(JSON.stringify(mockData), { status: 200 })));
            const id = 1;
            const recipe = {
                title: 'Updated Test Recipe',
                ingredients: ['ingredient1', 'ingredient2'],
                instructions: 'Updated test instructions'
            };
            const error = await putRecipe(id, recipe);

            expect(error).toBeNull();
        });
    });

    describe('deleteRecipe', () => {
        it('should return null if the recipe is deleted successfully', async () => {
            const mockData = { recipes: [{ id: 1, title: 'Test Recipe' }] };
            global.fetch = jest.fn(() => Promise.resolve(new Response(JSON.stringify(mockData), { status: 200 })));
            const id = 1;
            const error = await deleteRecipe(id);

            expect(error).toBeNull();
        });
    });

    describe('getRatingsPage', () => {
        it('should return the ratings for a recipe', async () => {
            const mockData = {
                id: 1,
                title: 'Test Recipe',
                ratings: [{ id: 1, rating: 2 }]
            };
            global.fetch = jest.fn(() => Promise.resolve(new Response(JSON.stringify(mockData), { status: 200 })));

            const id = 1;
            const [data, error] = await getRatingsPage(id, {size: null, page: 0});

            expect(data).toBeDefined();
            expect(data.ratings).toBeDefined();
            expect(error).toBeNull();
        });

        it('should return an error if the recipe has no ratings', async () => {
            const mockData = {
                id: 1,
                title: 'Test Recipe',
                ratings: [{ id: 1, rating: null }]
            };
            global.fetch = jest.fn(() => Promise.resolve(new Response(JSON.stringify(mockData), { status: 404 })));

            const id = 2;
            const error = await getRatingsPage(id, {size: null, page: 0});

            expect(error).toBeDefined();
        });
    });

    describe('getRatingById', () => {
        it('should return the rating for a given ID', async () => {
            const mockData = { recipes: [{ id: 1, title: 'Test Recipe' }] };
            global.fetch = jest.fn(() => Promise.resolve(new Response(JSON.stringify(mockData), { status: 200 })));

            const id = 1;
            const [data, error] = await getRatingById(id);

            expect(data).toBeDefined();
            expect(error).toBeNull();
        });

        it('should return an error if the rating is not found', async () => {
            const mockData = { recipes: [{ id: 1, title: 'Test Recipe' }] };
            global.fetch = jest.fn(() => Promise.resolve(new Response(JSON.stringify(mockData), { status: 404 })));

            const id = 2;
            const [data, error] = await getRatingById(id);

            expect(error).toBeDefined();
            expect(data).toBeNull();
        });
    });

    describe('getAverageRating', () => {
        it('should return the average rating for a recipe', async () => {
            const mockData = {
                ratingValue: 2.5
            };
            global.fetch = jest.fn(() => Promise.resolve(new Response(JSON.stringify(mockData), { status: 200 })));

            const id = 1;
            const [data, error] = await getAverageRating(id);

            expect(data).toBeDefined();
            expect(error).toBeNull();
        });

        it('should return an error if the recipe is not found', async () => {
            const mockData = { recipes: [{ id: 1, title: 'Test Recipe' }] };
            global.fetch = jest.fn(() => Promise.resolve(new Response(JSON.stringify(mockData), { status: 404 })));

            const id = 2;
            const [data, error] = await getAverageRating(id);

            expect(error).toBeDefined();
            expect(data).toBeNull();
        });
    });

    describe('postRating', () => {
        it('should return a error if status is not ok', async () => {
            const mockData = { recipes: [{ id: 1, title: 'Test Recipe' }] };
            global.fetch = jest.fn(() => Promise.resolve(new Response(JSON.stringify(mockData), { status: 404 })));

            const error = await postRating(1, { rating: 4, comment: 'Test Comment' });

            expect(error).toBeDefined;
        });

        it('should post a rating and return error null if status is ok', async () => {
            const mockData = { recipes: [{ id: 1, title: 'Test Recipe' }] };
            global.fetch = jest.fn(() => Promise.resolve(new Response(JSON.stringify(mockData), { status: 200 })));

            const error = await postRating(1, { rating: 4, comment: 'Test Comment' });
            expect(error).toBe(null);
        });
    });

    describe('putRating', () => {
        it('should return no error with a valid rating and comment', async () => {
            const mockData = {
                rating: 4,
                message: 'Rating updated successfully'
            };
            global.fetch = jest.fn(() => Promise.resolve(new Response(JSON.stringify(mockData), { status: 200 })));

            const id = 1;
            const error = await putRating(id, { rating: -5, comment: 'Great recipe!' });

            expect(error).toBeNull();
        });

        it('should return an error if the rating is in the wrong format', async () => {
            const mockData = { message: 'Invalid rating format' };
            global.fetch = jest.fn(() => Promise.resolve(new Response(JSON.stringify(mockData), { status: 400 })));

            const id = 1;
            const error = await putRating(id, { rating: -5, comment: 'Great recipe!' });

            expect(error).toBeDefined();
        });
    });

    describe('deleteRating', () => {
        it('should return no error with a valid input', async () => {
            const mockData = {
                rating: 4,
                message: 'Rating updated successfully'
            };
            global.fetch = jest.fn(() => Promise.resolve(new Response(JSON.stringify(mockData), { status: 200 })));

            const id = 1;
            const error = await deleteRating(id);

            expect(error).toBeNull();
        });

        it('should return an error with a invalid input', async () => {
            const mockData = {
                rating: 4,
                message: 'Rating updated successfully'
            };
            global.fetch = jest.fn(() => Promise.resolve(new Response(JSON.stringify(mockData), { status: 404 })));

            const id = 1;
            const error = await deleteRating(id);

            expect(error).toBeDefined();
        });
    });

    describe('postImages', () => {
        it('should return data and no error', async () => {
            const mockData = {
                id: 1
            };
            global.fetch = jest.fn(() => Promise.resolve(new Response(JSON.stringify(mockData), { status: 200 })));

            const images = [new File([], 'test.jpg')];
            const [data, error] = await postImages(images);

            expect(data).toBeDefined;
            expect(error).toBeNull();
        });

        it('should return an error when the image format is not supported', async () => {
            global.fetch = jest.fn(() => Promise.resolve(new Response(null, { status: 400 })));

            const images = [new File([], 'test.jpg')];
            const [data, error] = await postImages(images);

            expect(data).toBeNull();
            expect(error).toBeDefined;
        });
    });

    describe('deleteImage', () => {
        it('should delete an image and return null error', async () => {
            const mockData = {
                rating: 4,
                message: 'Rating updated successfully'
            };
            global.fetch = jest.fn(() => Promise.resolve(new Response(JSON.stringify(mockData), {status: 200})));

            const id = '123';
            const error = await deleteImage(id);

            expect(error).toBeNull();
        });

        it('should return an error when the image is not found', async () => {
            global.fetch = jest.fn(() => Promise.resolve(new Response(null, {status: 404})));

            const id = '123';
            const error = await deleteImage(id);

            expect(error).toBeDefined;
        });
    });

    describe('getUser', () => {
        it('should return user data and an error', async () => {
            const mockData = {
                name: 'John Doe',
                email: 'johndoe@example.com'
            };
            global.fetch = jest.fn(() => Promise.resolve(new Response(JSON.stringify(mockData), {status: 200})));

            const [data, error] = await getUser();

            expect(data).toEqual(mockData);
            expect(error).toBeNull();
        });

        it('should return an error if no user is found', async () => {
            const mockData = {
                name: 'John Doe',
                email: 'johndoe@example.com'
            };
            global.fetch = jest.fn(() => Promise.resolve(new Response(JSON.stringify(mockData), {status: 404})));

            const error = await getUser();

            expect(error).toBeDefined();
        });
    });

    describe('postUser', () => {
        it('should post user data and return no error', async () => {
            const mockData = {
                username: 'John Doe',
                picture: 'https://example.com/john_doe.jpg'
            };
            global.fetch = jest.fn(() => Promise.resolve(new Response(JSON.stringify(mockData), {status: 200})));

            const error = await postUser(mockData);

            expect(error).toBeNull();
        });
    });

    describe('putUser', () => {
        it('should return no error if the request is successful', async () => {
            const mockData = {
                username: 'John Doe',
                picture: 'https://example.com/john_doe.jpg'
            };
            global.fetch = jest.fn(() => Promise.resolve(new Response(JSON.stringify(mockData), {status: 200})));

            const error = await postUser(mockData);

            expect(error).toBeNull();
        });

        it('should return an error if the request is not successful', async () => {
            const mockData = {
                username: 'John Doe',
                picture: 'https://example.com/john_doe.jpg'
            };
            global.fetch = jest.fn(() => Promise.resolve(new Response(JSON.stringify(mockData), {status: 500})));

            const error = await postUser(mockData);

            expect(error).toBeDefined();
        });
    });

    describe('getUserRecipePage', () => {
        it('should return data and no error when request is successful', async () => {
            global.fetch = jest.fn().mockResolvedValue({
                ok: true,
                json: () => Promise.resolve({ data: 'example data' })
            });

            const [data, error] = await getUserRecipesPage({ sort: 'asc', size: 10, page: 1 });
            expect(data).toEqual({ data: 'example data' });
            expect(error).toBeNull();
        });

        it('should return no data and an error when request is not successful', async () => {
            const mockData = {
                ok: true,
                json: () => Promise.resolve({ data: null })
            };
            global.fetch = jest.fn(() => Promise.resolve(new Response(JSON.stringify(mockData), {status: 500})));

            const [data, error] = await getUserRecipesPage({ sort: 'asc', size: 10, page: 1 });

            expect(data).toBeNull
            expect(error).toBeDefined();
        });
    });

    describe('getUserImages', () => {
        it('should return data and no error if successful', async () => {
            const mockData = [{id: 1, name: 'image1'}, {id: 2, name: 'image2'}];
            global.fetch = jest.fn(() => Promise.resolve(new Response(JSON.stringify(mockData), {status: 200})));

            const [data, error] = await getUserImages();

            expect(error).toBeNull;
            expect(data).toEqual(mockData);
        });

        it('should return no data and an error if unsuccessful', async () => {
            const mockData = [{id: 1, name: 'image1'}, {id: 2, name: 'image2'}];
            global.fetch = jest.fn(() => Promise.resolve(new Response(JSON.stringify(mockData), {status: 404})));

            const [data, error] = await getUserImages();

            expect(data).toBeNull;
            expect(error).toBeDefined;
        });
    });

    describe('getUserById', () => {
        it('should return user data and no error if successful', async () => {
            const id = 1;
            const mockData = {
                username: 'John Doe',
                picture: 'https://example.com/john_doe.jpg'
            };
            global.fetch = jest.fn(() => Promise.resolve(new Response(JSON.stringify(mockData), {status: 200})));

            const [data, error] = await getUserById(id);

            expect(data).toEqual({
                username: 'John Doe',
                picture: 'https://example.com/john_doe.jpg'
            });
            expect(error).toBeNull;
        });

        it('should return no user data and an error if unsuccessful', async () => {
            const id = 1;
            const mockData = {
                username: 'John Doe',
                picture: 'https://example.com/john_doe.jpg'
            };
            global.fetch = jest.fn(() => Promise.resolve(new Response(JSON.stringify(mockData), {status: 404})));

            const [data, error] = await getUserById(id);

            expect(data).toBeNull;
            expect(error).toBeDefined;
        });
    });

    describe('getUserRecipesPageById', () => {
        it('should return data and no error if successful', async () => {
            const mockData = {
                id: 1,
                name: 'John Doe'
            };
            global.fetch = jest.fn(() => Promise.resolve(new Response(JSON.stringify(mockData), {status: 200})));

            const [data, error] = await getUserRecipesPageById('1', {sort: '1', size: 1, page: 1});

            expect(data).toEqual({ id: 1, name: 'John Doe'});
            expect(error).toBeNull;
        });

        it('should return no data and an error if unsuccessful', async () => {
            const mockData = {
                id: 1,
                name: 'John Doe'
            };
            global.fetch = jest.fn(() => Promise.resolve(new Response(JSON.stringify(mockData), {status: 404})));

            const [data, error] = await getUserRecipesPageById('1', {sort: '1', size: 1, page: 1});

            expect(data).toBeNull;
            expect(error).toBeDefined;
        });
    });

    describe('getUserImagesById', () => {
        it('returns user images and no error if successfully', async () => {
            const mockData = {
                images: [{ id: '1', url: 'image1.jpg' }, { id: '2', url: 'image2.jpg' }]
            };
            global.fetch = jest.fn(() => Promise.resolve(new Response(JSON.stringify(mockData), {status: 200})));

            const [data, error] = await getUserImagesById('123');

            expect(error).toBeNull;
            expect(data).toEqual({ images: [{ id: '1', url: 'image1.jpg' }, { id: '2', url: 'image2.jpg' }] });
        });

        it('returns no user images and an error if unsuccessfully', async () => {
            const mockData = {
                images: [{ id: '1', url: 'image1.jpg' }, { id: '2', url: 'image2.jpg' }]
            };
            global.fetch = jest.fn(() => Promise.resolve(new Response(JSON.stringify(mockData), {status: 200})));

            const [data, error] = await getUserImagesById('123');

            expect(error).toBeDefined;
            expect(data).toBeNull;
        });
    })
});