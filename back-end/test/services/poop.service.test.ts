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
const user2 = new User({
    userID: 2,
    username: 'test-user2',
    email: 'test-user2@email.com',
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
    user: user2,
    colorID: 15,
    title: 'test-poop-3',
    latitude: 45.454545,
    longitude: 45.454545,
});

let mockPoopDbGetAllPoops: jest.Mock;
let mockPoopDbGetPoopsByUser: jest.Mock;
let mockPoopDbGetPoopsFomUserAndFriendsByUser: jest.Mock;
let mockPoopDbGetPoopsForMapByUser: jest.Mock;
let mockPoopDbCreatePoop: jest.Mock;
let mockPoopDbGetPoopByID: jest.Mock;
let mockPoopDbDeletePoop: jest.Mock;

beforeEach(() => {
    mockPoopDbGetAllPoops = jest.fn();
    mockPoopDbGetPoopsByUser = jest.fn();
    mockPoopDbGetPoopsFomUserAndFriendsByUser = jest.fn();
    mockPoopDbGetPoopsForMapByUser = jest.fn();
    mockPoopDbCreatePoop = jest.fn();
    mockPoopDbGetPoopByID = jest.fn();
    mockPoopDbDeletePoop = jest.fn();
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
            user: { userID: 2, username: 'test-user2' },
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

    poopDb.getPoopsByUser = mockPoopDbGetPoopsByUser.mockReturnValue([poop1, poop2]);

    //when
    const response = await poopService.getPoopsByUser(1);

    //then
    expect(mockPoopDbGetPoopsByUser).toHaveBeenCalledTimes(1);
    expect(mockPoopDbGetPoopsByUser).toHaveBeenCalledWith({ userID: 1 });
    expect(response.length).toBe(2);
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

//#region GET POOPS FROM USER AND FRIENDS BY USER
test('given: a valid userID, when: getting poops from user and friends by user, then: poops from user and friends are returned', async () => {
    //given
    const dateTime = new Date();
    poop1.setDateTime(dateTime);
    poop2.setDateTime(dateTime);
    poop3.setDateTime(dateTime);

    poopDb.getPoopsFromUserAndFriendsByUser =
        mockPoopDbGetPoopsFomUserAndFriendsByUser.mockReturnValue([poop1, poop2, poop3]);

    //when
    const response = await poopService.getPoopsFromUserAndFriendsByUser(1);

    //then
    expect(mockPoopDbGetPoopsFomUserAndFriendsByUser).toHaveBeenCalledTimes(1);
    expect(mockPoopDbGetPoopsFomUserAndFriendsByUser).toHaveBeenCalledWith({ userID: 1 });
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
            isOwner: true,
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
            isOwner: true,
        },
        {
            poopID: 3,
            dateTime: dateTime,
            type: 3,
            size: 50,
            rating: 3.5,
            user: { userID: 2, username: 'test-user2' },
            colorID: 15,
            title: 'test-poop-3',
            latitude: 45.454545,
            longitude: 45.454545,
            isOwner: false,
        },
    ]);
});

test('given: an invalid userID, when: getting poops from user and friends by user, then: error is thrown', async () => {
    //given

    //when

    //then
    await expect(poopService.getPoopsFromUserAndFriendsByUser(-1)).rejects.toThrow(
        'UserID is required and must be a positive and whole number.'
    );
    await expect(poopService.getPoopsFromUserAndFriendsByUser(1.5)).rejects.toThrow(
        'UserID is required and must be a positive and whole number.'
    );
});
//#endregion

//#region GET POOPS FOR MAP BY USER
test('given: a valid userID, when: getting poops for map by user, then: poops for map are returned', async () => {
    //given
    const dateTime = new Date();
    poop1.setDateTime(dateTime);
    poop2.setDateTime(dateTime);
    poop3.setDateTime(dateTime);

    poopDb.getPoopsForMapByUser = mockPoopDbGetPoopsForMapByUser.mockReturnValue([poop1, poop2]);

    //when
    const response = await poopService.getPoopsForMapByUser(1);

    //then
    expect(mockPoopDbGetPoopsForMapByUser).toHaveBeenCalledTimes(1);
    expect(mockPoopDbGetPoopsForMapByUser).toHaveBeenCalledWith({ userID: 1 });
    expect(response.length).toBe(2);
    expect(response).toEqual([
        {
            poopID: 1,
            latitude: 45.454545,
            longitude: 45.454545,
        },
        {
            poopID: 2,
            latitude: 45.454545,
            longitude: 45.454545,
        },
    ]);
});

test('given: an invalid userID, when: getting poops for map by user, then: error is thrown', async () => {
    //given

    //when

    //then
    await expect(poopService.getPoopsForMapByUser(-1)).rejects.toThrow(
        'UserID is required and must be a positive and whole number.'
    );
    await expect(poopService.getPoopsForMapByUser(1.5)).rejects.toThrow(
        'UserID is required and must be a positive and whole number.'
    );
});
//#endregion

//#region CREATE
test('given: valid data, when: creating poop, then: poop is created with given data', async () => {
    //given
    const dateTime = new Date();
    const poopToCreate = new Poop({
        poopID: 0,
        dateTime: dateTime,
        type: 3,
        size: 50,
        rating: 3.5,
        user: undefined,
        colorID: null,
        title: null,
        latitude: null,
        longitude: null,
    });
    const createdPoop = new Poop({
        poopID: 0,
        dateTime: dateTime,
        type: 3,
        size: 50,
        rating: 3.5,
        user: user1,
        colorID: null,
        title: null,
        latitude: null,
        longitude: null,
    });
    poopDb.createPoop = mockPoopDbCreatePoop.mockReturnValue(createdPoop);

    //when
    const response = await poopService.createPoop(dateTime, 3, 50, 3.5, 1);

    //then
    expect(mockPoopDbCreatePoop).toHaveBeenCalledTimes(1);
    expect(mockPoopDbCreatePoop).toHaveBeenCalledWith(1, poopToCreate);
    expect(response).toEqual({
        poopID: 0,
        dateTime: dateTime,
        type: 3,
        size: 50,
        rating: 3.5,
        user: { userID: 1, username: 'test-user1' },
        colorID: null,
        title: null,
        latitude: null,
        longitude: null,
    });
});

test('given: an invalid userID, when: creating poop, then: error is thrown', async () => {
    //given

    //when

    //then
    await expect(poopService.createPoop(new Date(), 3, 50, 3.5, -1)).rejects.toThrow(
        'UserID is required and must be a positive and whole number.'
    );
    await expect(poopService.createPoop(new Date(), 3, 50, 3.5, 1.5)).rejects.toThrow(
        'UserID is required and must be a positive and whole number.'
    );
});
//#endregion

//#region DELETE
test('given: valid data, when: deleting poop, then: poop is deleted and message returned', async () => {
    //given
    const dateTime = new Date();
    poop1.setDateTime(dateTime);

    poopDb.getPoopByID = mockPoopDbGetPoopByID.mockReturnValue(poop1);
    poopDb.deletePoop = mockPoopDbDeletePoop.mockReturnValue(true);

    //when
    const response = await poopService.deletePoop(1, 1, 'USER');

    //then
    expect(mockPoopDbGetPoopByID).toHaveBeenCalledTimes(1);
    expect(mockPoopDbGetPoopByID).toHaveBeenCalledWith({ poopID: 1 });
    expect(mockPoopDbDeletePoop).toHaveBeenCalledTimes(1);
    expect(mockPoopDbDeletePoop).toHaveBeenCalledWith({ poopID: 1 });
    expect(response).toBe('Poop successfully deleted.');
});

test('given: an invalid userID, when: deleting poop, then: error is thrown', async () => {
    //given

    //when

    //then
    await expect(poopService.deletePoop(-1, 1, 'USER')).rejects.toThrow(
        'userID is required and must be a positive and whole number.'
    );
    await expect(poopService.deletePoop(1.5, 1, 'USER')).rejects.toThrow(
        'userID is required and must be a positive and whole number.'
    );
});

test('given: an invalid poopID, when: deleting poop, then: error is thrown', async () => {
    //given

    //when

    //then
    await expect(poopService.deletePoop(1, -1, 'USER')).rejects.toThrow(
        'poopID is required and must be a positive and whole number.'
    );
    await expect(poopService.deletePoop(1, 1.5, 'USER')).rejects.toThrow(
        'poopID is required and must be a positive and whole number.'
    );
});
//#endregion
