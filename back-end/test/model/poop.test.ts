import { Poop } from '../../model/poop';

test('given: valid values for poop, when: poop is created, then: poop is created with those values', () => {
    // given
    const dateTime = new Date();
    const poopData1 = {
        poopID: 1,
        dateTime,
        type: 3,
        size: 50,
        rating: 3.5,
        colorID: 15,
        title: 'Poop-Title',
        latitude: 45.454545,
        longitude: 45.454545,
    };
    const poopData2 = {
        poopID: 2,
        dateTime,
        type: 3,
        size: 50,
        rating: 3.5,
        colorID: null,
        title: null,
        latitude: null,
        longitude: null,
    };

    // when
    const poop1 = new Poop(poopData1);
    const poop2 = new Poop(poopData2);

    // then
    expect(poop1.getPoopID()).toBe(1);
    expect(poop1.getDateTime()).toEqual(dateTime);
    expect(poop1.getType()).toBe(3);
    expect(poop1.getSize()).toBe(50);
    expect(poop1.getRating()).toBe(3.5);
    expect(poop1.getUser()).toBe(undefined);
    expect(poop1.getColorID()).toBe(15);
    expect(poop1.getTitle()).toBe('Poop-Title');
    expect(poop1.getLatitude()).toBe(45.454545);
    expect(poop1.getLongitude()).toBe(45.454545);

    expect(poop2.getPoopID()).toBe(2);
    expect(poop2.getDateTime()).toEqual(dateTime);
    expect(poop2.getType()).toBe(3);
    expect(poop2.getSize()).toBe(50);
    expect(poop2.getRating()).toBe(3.5);
    expect(poop2.getUser()).toBe(undefined);
    expect(poop2.getColorID()).toBe(null);
    expect(poop2.getTitle()).toBe(null);
    expect(poop2.getLatitude()).toBe(null);
    expect(poop2.getLongitude()).toBe(null);
});

test('given: invalid type for poop, when: poop is created, then: error is thrown', () => {
    // given
    const dateTime = new Date();
    const poopData1 = {
        poopID: 1,
        dateTime,
        type: -3,
        size: 50,
        rating: 3.5,
        colorID: null,
        title: null,
        latitude: null,
        longitude: null,
    };
    const poopData2 = {
        poopID: 1,
        dateTime,
        type: 3.5,
        size: 50,
        rating: 3.5,
        colorID: null,
        title: null,
        latitude: null,
        longitude: null,
    };
    const poopData3 = {
        poopID: 1,
        dateTime,
        type: 30,
        size: 50,
        rating: 3.5,
        colorID: null,
        title: null,
        latitude: null,
        longitude: null,
    };

    // when

    // then
    expect(() => new Poop(poopData1)).toThrow('Type must be a whole number from 0 to 7.');
    expect(() => new Poop(poopData2)).toThrow('Type must be a whole number from 0 to 7.');
    expect(() => new Poop(poopData3)).toThrow('Type must be a whole number from 0 to 7.');
});

test('given: invalid size for poop, when: poop is created, then: error is thrown', () => {
    // given
    const dateTime = new Date();
    const poopData1 = {
        poopID: 1,
        dateTime,
        type: 3,
        size: -50,
        rating: 3.5,
        colorID: null,
        title: null,
        latitude: null,
        longitude: null,
    };
    const poopData2 = {
        poopID: 1,
        dateTime,
        type: 3,
        size: 50.5,
        rating: 3.5,
        colorID: null,
        title: null,
        latitude: null,
        longitude: null,
    };
    const poopData3 = {
        poopID: 1,
        dateTime,
        type: 3,
        size: 500,
        rating: 3.5,
        colorID: null,
        title: null,
        latitude: null,
        longitude: null,
    };

    // when

    // then
    expect(() => new Poop(poopData1)).toThrow('Size must be a whole number from 0 to 100.');
    expect(() => new Poop(poopData2)).toThrow('Size must be a whole number from 0 to 100.');
    expect(() => new Poop(poopData3)).toThrow('Size must be a whole number from 0 to 100.');
});

test('given: invalid rating for poop, when: poop is created, then: error is thrown', () => {
    // given
    const dateTime = new Date();
    const poopData1 = {
        poopID: 1,
        dateTime,
        type: 3,
        size: 50,
        rating: -3.5,
        colorID: null,
        title: null,
        latitude: null,
        longitude: null,
    };
    const poopData2 = {
        poopID: 1,
        dateTime,
        type: 3,
        size: 50,
        rating: 3.55,
        colorID: null,
        title: null,
        latitude: null,
        longitude: null,
    };
    const poopData3 = {
        poopID: 1,
        dateTime,
        type: 3,
        size: 50,
        rating: 35,
        colorID: null,
        title: null,
        latitude: null,
        longitude: null,
    };

    // when

    // then
    expect(() => new Poop(poopData1)).toThrow(
        'Rating must be a number from 0 to 5 (whole or ending in .5).'
    );
    expect(() => new Poop(poopData2)).toThrow(
        'Rating must be a number from 0 to 5 (whole or ending in .5).'
    );
    expect(() => new Poop(poopData3)).toThrow(
        'Rating must be a number from 0 to 5 (whole or ending in .5).'
    );
});

test('given: invalid colorID for poop, when: poop is created, then: error is thrown', () => {
    // given
    const dateTime = new Date();
    const poopData1 = {
        poopID: 1,
        dateTime,
        type: 3,
        size: 50,
        rating: 3.5,
        colorID: -15,
        title: null,
        latitude: null,
        longitude: null,
    };
    const poopData2 = {
        poopID: 1,
        dateTime,
        type: 3,
        size: 50,
        rating: 3.5,
        colorID: 1.5,
        title: null,
        latitude: null,
        longitude: null,
    };
    const poopData3 = {
        poopID: 1,
        dateTime,
        type: 3,
        size: 50,
        rating: 3.5,
        colorID: 150,
        title: null,
        latitude: null,
        longitude: null,
    };

    // when

    // then
    expect(() => new Poop(poopData1)).toThrow('ColorID must be a whole number from 0 to 15.');
    expect(() => new Poop(poopData2)).toThrow('ColorID must be a whole number from 0 to 15.');
    expect(() => new Poop(poopData3)).toThrow('ColorID must be a whole number from 0 to 15.');
});

test('given: invalid title for poop, when: poop is created, then: error is thrown', () => {
    // given
    const dateTime = new Date();
    const poopData1 = {
        poopID: 1,
        dateTime,
        type: 3,
        size: 50,
        rating: 3.5,
        colorID: null,
        title: 'Poop-Title'.repeat(15),
        latitude: null,
        longitude: null,
    };

    // when

    // then
    expect(() => new Poop(poopData1)).toThrow('Title cannot be longer than 100 characters.');
});

test('given: invalid latitude for poop, when: poop is created, then: error is thrown', () => {
    // given
    const dateTime = new Date();
    const poopData1 = {
        poopID: 1,
        dateTime,
        type: 3,
        size: 50,
        rating: 3.5,
        colorID: null,
        title: null,
        latitude: -100,
        longitude: null,
    };
    const poopData2 = {
        poopID: 1,
        dateTime,
        type: 3,
        size: 50,
        rating: 3.5,
        colorID: null,
        title: null,
        latitude: 100,
        longitude: null,
    };

    // when

    // then
    expect(() => new Poop(poopData1)).toThrow('Latitude must be a number between -90 and 90.');
    expect(() => new Poop(poopData2)).toThrow('Latitude must be a number between -90 and 90.');
});

test('given: invalid longitude for poop, when: poop is created, then: error is thrown', () => {
    // given
    const dateTime = new Date();
    const poopData1 = {
        poopID: 1,
        dateTime,
        type: 3,
        size: 50,
        rating: 3.5,
        colorID: null,
        title: null,
        latitude: null,
        longitude: -200,
    };
    const poopData2 = {
        poopID: 1,
        dateTime,
        type: 3,
        size: 50,
        rating: 3.5,
        colorID: null,
        title: null,
        latitude: null,
        longitude: 200,
    };

    // when

    // then
    expect(() => new Poop(poopData1)).toThrow('Longitude must be a number between -180 and 180.');
    expect(() => new Poop(poopData2)).toThrow('Longitude must be a number between -180 and 180.');
});
