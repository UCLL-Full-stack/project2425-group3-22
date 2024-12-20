import { Stat } from '../../model/stat';
import { User } from '../../model/user';
import { UserStat } from '../../model/userStat';
import statDb from '../../repository/stat.db';
import statService from '../../service/stat.service';

//#region PREP
const stat1 = new Stat({
    statID: 1,
    statCode: 'S1',
    name: 'test-stat-1',
    description: 'this is test stat 1',
});
const stat2 = new Stat({
    statID: 2,
    statCode: 'S2',
    name: 'test-stat-2',
    description: 'this is test stat 2',
});
const stat3 = new Stat({
    statID: 3,
    statCode: 'S3',
    name: 'test-stat-3',
    description: 'this is test stat 3',
});

let mockStatDbGetAllStats: jest.Mock;
let mockStatDbGetStatByID: jest.Mock;
let mockStatDbGetStatByStatCode: jest.Mock;
let mockUserDbGetStatsByUser: jest.Mock;

beforeEach(() => {
    mockStatDbGetAllStats = jest.fn();
    mockStatDbGetStatByID = jest.fn();
    mockStatDbGetStatByStatCode = jest.fn();
    mockUserDbGetStatsByUser = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});
//#endregion

//#region GET ALL
test('given: at least one stat exists, when: getting all stats, then: all stats are returned', async () => {
    //given
    statDb.getAllStats = mockStatDbGetAllStats.mockReturnValue([stat1, stat2, stat3]);

    //when
    const response = await statService.getAllStats();

    //then
    expect(mockStatDbGetAllStats).toHaveBeenCalledTimes(1);
    expect(response.length).toBe(3);
    expect(response).toEqual([
        {
            statID: 1,
            statCode: 'S1',
            name: 'test-stat-1',
            description: 'this is test stat 1',
        },
        {
            statID: 2,
            statCode: 'S2',
            name: 'test-stat-2',
            description: 'this is test stat 2',
        },
        {
            statID: 3,
            statCode: 'S3',
            name: 'test-stat-3',
            description: 'this is test stat 3',
        },
    ]);
});

test('given: no stats exist, when: getting all stats, then: empty array is returned', async () => {
    //given
    statDb.getAllStats = mockStatDbGetAllStats.mockReturnValue(null);

    //when
    const response = await statService.getAllStats();

    //then
    expect(mockStatDbGetAllStats).toHaveBeenCalledTimes(1);
    expect(response.length).toBe(0);
    expect(response).toEqual([]);
});
//#endregion

//#region GET BY ID
test('given: a valid statID, when: getting stat by id, then: stat with given id is returned', async () => {
    //given
    statDb.getStatByID = mockStatDbGetStatByID.mockReturnValue(stat1);

    //when
    const response = await statService.getStatByID(1);

    //then
    expect(mockStatDbGetStatByID).toHaveBeenCalledTimes(1);
    expect(mockStatDbGetStatByID).toHaveBeenCalledWith({ statID: 1 });
    expect(response).toEqual({
        statID: 1,
        statCode: 'S1',
        name: 'test-stat-1',
        description: 'this is test stat 1',
    });
});

test('given: an invalid statID, when: getting stat by id, then: error is thrown', async () => {
    //given

    //when

    //then
    await expect(statService.getStatByID(-1)).rejects.toThrow(
        'statID is required and must be a positive whole number.'
    );
    await expect(statService.getStatByID(1.5)).rejects.toThrow(
        'statID is required and must be a positive whole number.'
    );
});
//#endregion

//#region GET BY CODE
test('given: a valid statCode, when: getting stat by statCode, then: stat with given code is returned', async () => {
    //given
    statDb.getStatByStatCode = mockStatDbGetStatByStatCode.mockReturnValue(stat1);

    //when
    const response = await statService.getStatByStatCode('S1');

    //then
    expect(mockStatDbGetStatByStatCode).toHaveBeenCalledTimes(1);
    expect(mockStatDbGetStatByStatCode).toHaveBeenCalledWith({
        statCode: 'S1',
    });
    expect(response).toEqual({
        statID: 1,
        statCode: 'S1',
        name: 'test-stat-1',
        description: 'this is test stat 1',
    });
});
//#endregion

//#region GET BY USER
test('given: a valid userID, when: getting stats by user, then: stats for given user are returned', async () => {
    //given
    const updatedAt = new Date();
    const user = new User({
        userID: 1,
        username: 'test-user1',
        email: 'test-user1@email.com',
        password: 'Test-pass!123',
        role: 'USER',
    });
    const userStat1 = new UserStat({
        statID: 1,
        userID: 1,
        stat: stat1,
        user: user,
        statValue: 13,
        updatedAt: updatedAt,
    });
    const userStat2 = new UserStat({
        statID: 2,
        userID: 1,
        stat: stat2,
        user: user,
        statValue: 13,
        updatedAt: updatedAt,
    });
    statDb.getStatsByUser = mockUserDbGetStatsByUser.mockReturnValue([userStat1, userStat2]);

    //when
    const response = await statService.getStatsByUser(1);

    //then
    expect(mockUserDbGetStatsByUser).toHaveBeenCalledTimes(1);
    expect(mockUserDbGetStatsByUser).toHaveBeenCalledWith({
        userID: 1,
    });
    expect(response).toEqual([
        {
            statID: 1,
            statCode: 'S1',
            name: 'test-stat-1',
            description: 'this is test stat 1',
            statValue: 13,
            updatedAt: updatedAt,
        },
        {
            statID: 2,
            statCode: 'S2',
            name: 'test-stat-2',
            description: 'this is test stat 2',
            statValue: 13,
            updatedAt: updatedAt,
        },
    ]);
});

test('given: an invalid userID, when: getting stat by user, then: error is thrown', async () => {
    //given

    //when

    //then
    await expect(statService.getStatsByUser(-1)).rejects.toThrow(
        'userID is required and must be a positive whole number.'
    );
    await expect(statService.getStatsByUser(1.5)).rejects.toThrow(
        'userID is required and must be a positive whole number.'
    );
});
//#endregion
