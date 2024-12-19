import { Achievement } from '../../model/achievement';
import achievementDb from '../../repository/achievement.db';
import achivementService from '../../service/achievement.service';

//#region PREP
const achievement1 = new Achievement({
    achievementID: 1,
    achievementCode: 'A1',
    name: 'test-achievement-1',
    description: { english: 'this is test achievement 1' },
    levels: [1, 2, 3],
    levelsCriteria: [10, 20, 50],
    statID: 1,
});
const achievement2 = new Achievement({
    achievementID: 2,
    achievementCode: 'A2',
    name: 'test-achievement-2',
    description: { english: 'this is test achievement 2' },
    levels: [1, 2, 3],
    levelsCriteria: [10, 20, 50],
    statID: 1,
});
const achievement3 = new Achievement({
    achievementID: 3,
    achievementCode: 'A3',
    name: 'test-achievement-3',
    description: { english: 'this is test achievement 3' },
    levels: [1, 2, 3],
    levelsCriteria: [10, 20, 50],
    statID: 1,
});

let mockAchievementDbGetAllAchievements: jest.Mock;
let mockUserDbGetUserByID: jest.Mock;
let mockUserDbGetUserByAchivementCode: jest.Mock;
let mockUserDbGetUserByUser: jest.Mock;

beforeEach(() => {
    mockAchievementDbGetAllAchievements = jest.fn();
    mockUserDbGetUserByID = jest.fn();
    mockUserDbGetUserByAchivementCode = jest.fn();
    mockUserDbGetUserByUser = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});
//#endregion

//#region GET ALL
test('given: at least one achivement exists, when: getting all achievements, then: all achievements are returned', async () => {
    //given
    achievementDb.getAllAchievements = mockAchievementDbGetAllAchievements.mockReturnValue([
        achievement1,
        achievement2,
        achievement3,
    ]);

    //when
    const response = await achivementService.getAllAchievements();

    //then
    expect(mockAchievementDbGetAllAchievements).toHaveBeenCalledTimes(1);
    expect(response.length).toBe(3);
    expect(response).toEqual([
        {
            achievementID: 1,
            achievementCode: 'A1',
            name: 'test-achievement-1',
            description: { english: 'this is test achievement 1' },
            levels: [1, 2, 3],
            levelsCriteria: [10, 20, 50],
            statID: 1,
        },
        {
            achievementID: 2,
            achievementCode: 'A2',
            name: 'test-achievement-2',
            description: { english: 'this is test achievement 2' },
            levels: [1, 2, 3],
            levelsCriteria: [10, 20, 50],
            statID: 1,
        },
        {
            achievementID: 3,
            achievementCode: 'A3',
            name: 'test-achievement-3',
            description: { english: 'this is test achievement 3' },
            levels: [1, 2, 3],
            levelsCriteria: [10, 20, 50],
            statID: 1,
        },
    ]);
});

test('given: no achievements exist, when: getting all achievements, then: empty array is returned', async () => {
    //given
    achievementDb.getAllAchievements = mockAchievementDbGetAllAchievements.mockReturnValue(null);

    //when
    const response = await achivementService.getAllAchievements();

    //then
    expect(mockAchievementDbGetAllAchievements).toHaveBeenCalledTimes(1);
    expect(response.length).toBe(0);
    expect(response).toEqual([]);
});
//#endregion

//#region GET BY ID
test('given: a valid achievementID, when: getting achievement by id, then: achievement with given id is returned', async () => {
    //given
    achievementDb.getAchievementByID = mockUserDbGetUserByID.mockReturnValue(achievement1);

    //when
    const response = await achivementService.getAchievementByID(1);

    //then
    expect(mockUserDbGetUserByID).toHaveBeenCalledTimes(1);
    expect(mockUserDbGetUserByID).toHaveBeenCalledWith({ achievementID: 1 });
    expect(response).toEqual({
        achievementID: 1,
        achievementCode: 'A1',
        name: 'test-achievement-1',
        description: { english: 'this is test achievement 1' },
        levels: [1, 2, 3],
        levelsCriteria: [10, 20, 50],
        statID: 1,
    });
});

test('given: an invalid achievementID, when: getting achievement by id, then: error is thrown', async () => {
    //given

    //when

    //then
    await expect(achivementService.getAchievementByID(-1)).rejects.toThrow(
        'achievementID is required and must be a positive whole number.'
    );
    await expect(achivementService.getAchievementByID(1.5)).rejects.toThrow(
        'achievementID is required and must be a positive whole number.'
    );
});
//#endregion

//#region GET BY CODE
test('given: a valid achievementCode, when: getting achievement by achievementCode, then: achievement with given code is returned', async () => {
    //given
    achievementDb.getAchievementByAchievementCode =
        mockUserDbGetUserByAchivementCode.mockReturnValue(achievement1);

    //when
    const response = await achivementService.getAchievementByAchievementCode('A1');

    //then
    expect(mockUserDbGetUserByAchivementCode).toHaveBeenCalledTimes(1);
    expect(mockUserDbGetUserByAchivementCode).toHaveBeenCalledWith({
        achievementCode: 'A1',
    });
    expect(response).toEqual({
        achievementID: 1,
        achievementCode: 'A1',
        name: 'test-achievement-1',
        description: { english: 'this is test achievement 1' },
        levels: [1, 2, 3],
        levelsCriteria: [10, 20, 50],
        statID: 1,
    });
});
//#endregion

//#region GET BY USER
test('given: an invalid userID, when: getting achievement by user, then: error is thrown', async () => {
    //given

    //when

    //then
    await expect(achivementService.getAchievementsByUser(-1)).rejects.toThrow(
        'userID is required and must be a positive whole number.'
    );
    await expect(achivementService.getAchievementsByUser(1.5)).rejects.toThrow(
        'userID is required and must be a positive whole number.'
    );
});
//#endregion
