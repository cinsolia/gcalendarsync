// GAS envirionment for local Node
const gasLocal = require("gas-local");

// Load all google app scripts
const gas = gasLocal.require("./gasp");

describe("Create an index to locate data column positions", () => {
  describe("verify the event fields and column labels table property defaults to expected values", () => {
    test.each([
      ["title", "Title"],
      ["description", "Description"],
      ["location", "Location"],
      ["starttime", "Start Time"],
      ["endtime", "End Time"],
      ["guests", "Guests"],
      ["color", "Color"],
      ["id", "Id"]
    ])("Event Field: '%s', Column Label: '%s'", (name, value) =>
      expect(gas.titleRowMap[name]).toBe(value)
    );
  });
  describe("Primary cases: Multiple header columns create index map in correct order", () => {
    test.each([
      [
        "First, middle, last in table",
        "Title,Guests,Start Time,Id",
        "title,guests,starttime,id"
      ],
      [
        "First five in table",
        "Title,Description,Location,Start Time,End Time",
        "title,description,location,starttime,endtime"
      ],
      [
        "Out of order from table",
        "Start Time,Description,Title",
        "starttime,description,title"
      ]
    ])(
      "Description: '%s', Labels: '%s', Fields: '%s'",
      (testDescription, labels, fields) => {
        expect(gas.createIdxMap(toArray(labels))).toEqual(toArray(fields));
      }
    );
  });
  describe("Edge cases", () => {
    test.each([
      ["first", "Title", "title"],
      ["middle", "Guests", "guests"],
      ["last", "Id", "id"]
    ])("when given a single header column, creates index map for single field: %s", (eachDesc, headerLabel, headerMap) => {
      expect(gas.createIdxMap([headerLabel])).toEqual([headerMap]);
    });
    test("when given an empty header column list, creates empty index map", () => {
      expect(gas.createIdxMap([])).toEqual([]);
    });
  });
});

describe("Create an event object from row data", () => {
  describe("when given only row data and column locations, creates an event object with given fields and data", () => {
    const reformatEventTest = (values, columnLocations, result) => {
      expect(gas.reformatEvent(values, columnLocations, null)).toEqual(result);
    };
    test("with generic data", () => {
      const rowValues = ["value1", "value2", "value3"];
      const columnLocations = ["prop1", "prop2", "prop3"];
      const result = { prop1: "value1", prop2: "value2", prop3: "value3" };
      reformatEventTest(rowValues, columnLocations, result);
    });
    test("with more realistic data", () => {
      const result = {
        title: "Event Title",
        description: "Event description text",
        location: "Event location",
        starttime: Date(),
        endtime: Date(),
        guests: "Event guest list",
        color: "Color number",
        id: "ID guid XXXX"
      };
      const fromResult = objectToPropertiesAndValuesArrays(result);
      // { values: ['Event Title', 'Event desc...', ...], properties: ['title', 'description', ...] }
      reformatEventTest(fromResult.values, fromResult.properties, result);
    });
  });

  describe("when given only missing columns, creates event object with missing fields and empty data values", () => {
    const reformatEventTest = (missingColumns, result) => {
      expect(gas.reformatEvent([], null, missingColumns)).toEqual(result);
    };
    test("with generic data", () => {
      const missingColumns = ["prop1", "prop2", "prop3"];
      const result = {
        prop1: "",
        prop2: "",
        prop3: ""
      };
      reformatEventTest(missingColumns, result);
    });
  });

  describe("when given all inputs, creates event object with all fields and data", () => {
    const reformatEventTest = (values, columnLocations, missingColumns, result) => {
      expect(gas.reformatEvent(values, columnLocations, missingColumns)).toEqual(
        result
      );
    };
    test("with generic data", () => {
      const values = ["value1", "value2", "value3"];
      const columnLocations = ["prop1", "prop2", "prop3"];
      const missingColumns = ["prop4", "prop5"];
      const result = {
        prop1: "value1",
        prop2: "value2",
        prop3: "value3",
        prop4: "",
        prop5: ""
      };
      reformatEventTest(values, columnLocations, missingColumns, result);
    });
  });
});

describe("Create row data object from GAS event", () => {
    test("", () => {

    })
});

function objectToPropertiesAndValuesArrays(obj) {
  const fieldsValues = Object.entries(obj); // [ ['prop1', 'value1'], ['prop2', 'value2'], ...]
  const properties = fieldsValues.reduce((fields, fieldValue) => {
    return fields.concat(fieldValue[0]);
  }, []); // ['prop1', 'prop2', ...]
  const values = fieldsValues.reduce((values, fieldValue) => {
    return values.concat(fieldValue[1]);
  }, []); // ['value1', 'value2', ...]
  return { properties, values };
}

function toArray(values) {
  return values.split(",");
}
