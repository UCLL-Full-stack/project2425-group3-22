import { Poop } from '../../model/poop';
import { User } from '../../model/user';
import poopDb from '../../repository/poop.db';
import poopService from '../../service/poop.service';

//#region PREP
const user1 = new User({
    userID: 1,
    username: 'test-user1',
    email: 'test-user1@email.com',
    password: 'Test-pass!123',
    role: 'USER',
});

const poop1 = new Poop({
    poopID: 1,
    dateTime: new Date(),
    type: 3,
    size: 50,
    rating: 3.5,
    user: user1,
    colorID: 15,
    title: 'test-poop-1',
    latitude: 45.454545,
    longitude: 45.454545,
});
const poop2 = new Poop({
    poopID: 2,
    dateTime: new Date(),
    type: 3,
    size: 50,
    rating: 3.5,
    user: user1,
    colorID: 15,
    title: 'test-poop-2',
    latitude: 45.454545,
    longitude: 45.454545,
});
const poop3 = new Poop({
    poopID: 3,
    dateTime: new Date(),
    type: 3,
    size: 50,
    rating: 3.5,
    user: user1,
    colorID: 15,
    title: 'test-poop-3',
    latitude: 45.454545,
    longitude: 45.454545,
});

let mockPoopDbGetAllPoops: jest.Mock;
let mockPoopDbGetPoopsByUser: jest.Mock;

beforeEach(() => {
    mockPoopDbGetAllPoops = jest.fn();
    mockPoopDbGetPoopsByUser = jest.fn();

    mockPoopDbGetAllPoops = jest.fn();
    mockPoopDbGetAllPoops = jest.fn();
    mockPoopDbGetAllPoops = jest.fn();
    mockPoopDbGetAllPoops = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});
//#endregion

//#region GET ALL
test('given: at least one poop exists, when: getting all poops, then: all poops are returned', async () => {
    //given
    const dateTime = new Date();
    poop1.setDateTime(dateTime);
    poop2.setDateTime(dateTime);
    poop3.setDateTime(dateTime);

    poopDb.getAllPoops = mockPoopDbGetAllPoops.mockReturnValue([poop1, poop2, poop3]);

    //when
    const response = await poopService.getAllPoops();

    //then
    expect(mockPoopDbGetAllPoops).toHaveBeenCalledTimes(1);
    expect(response.length).toBe(3);
    expect(response).toEqual([
        {
            poopID: 1,
            dateTime: dateTime,
            type: 3,
            size: 50,
            rating: 3.5,
            user: { userID: 1, username: 'test-user1' },
            colorID: 15,
            title: 'test-poop-1',
            latitude: 45.454545,
            longitude: 45.454545,
        },
        {
            poopID: 2,
            dateTime: dateTime,
            type: 3,
            size: 50,
            rating: 3.5,
            user: { userID: 1, username: 'test-user1' },
            colorID: 15,
            title: 'test-poop-2',
            latitude: 45.454545,
            longitude: 45.454545,
        },
        {
            poopID: 3,
            dateTime: dateTime,
            type: 3,
            size: 50,
            rating: 3.5,
            user: { userID: 1, username: 'test-user1' },
            colorID: 15,
            title: 'test-poop-3',
            latitude: 45.454545,
            longitude: 45.454545,
        },
    ]);
});

test('given: no poops exist, when: getting all poops, then: empty array is returned', async () => {
    //given
    poopDb.getAllPoops = mockPoopDbGetAllPoops.mockReturnValue(null);

    //when
    const response = await poopService.getAllPoops();

    //then
    expect(mockPoopDbGetAllPoops).toHaveBeenCalledTimes(1);
    expect(response.length).toBe(0);
    expect(response).toEqual([]);
});
//#endregion

//#region GET BY USER
test('given: a valid userID, when: getting poops by user, then: poops with given user are returned', async () => {
    //given
    const dateTime = new Date();
    poop1.setDateTime(dateTime);
    poop2.setDateTime(dateTime);
    poop3.setDateTime(dateTime);

    poopDb.getPoopsByUser = mockPoopDbGetPoopsByUser.mockReturnValue([poop1, poop2, poop3]);

    //when
    const response = await poopService.getPoopsByUser(1);

    //then
    expect(mockPoopDbGetPoopsByUser).toHaveBeenCalledTimes(1);
    expect(mockPoopDbGetPoopsByUser).toHaveBeenCalledWith({ userID: 1 });
    expect(response.length).toBe(3);
    expect(response).toEqual([
        {
            poopID: 1,
            dateTime: dateTime,
            type: 3,
            size: 50,
            rating: 3.5,
            user: { userID: 1, username: 'test-user1' },
            colorID: 15,
            title: 'test-poop-1',
            latitude: 45.454545,
            longitude: 45.454545,
        },
        {
            poopID: 2,
            dateTime: dateTime,
            type: 3,
            size: 50,
            rating: 3.5,
            user: { userID: 1, username: 'test-user1' },
            colorID: 15,
            title: 'test-poop-2',
            latitude: 45.454545,
            longitude: 45.454545,
        },
        {
            poopID: 3,
            dateTime: dateTime,
            type: 3,
            size: 50,
            rating: 3.5,
            user: { userID: 1, username: 'test-user1' },
            colorID: 15,
            title: 'test-poop-3',
            latitude: 45.454545,
            longitude: 45.454545,
        },
    ]);
});

test('given: an invalid userID, when: getting poops by user, then: error is thrown', async () => {
    //given

    //when

    //then
    await expect(poopService.getPoopsByUser(-1)).rejects.toThrow(
        'UserID is required and must be a positive and whole number.'
    );
    await expect(poopService.getPoopsByUser(1.5)).rejects.toThrow(
        'UserID is required and must be a positive and whole number.'
    );
});
//#endregion
