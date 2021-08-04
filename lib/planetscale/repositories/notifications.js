import planetscaleDatabase from "../planetscale";

const TABLE_NAME = "notifications";

const get = async () => {
  const [rows] = await planetscaleDatabase.query(`
    SELECT * FROM ${TABLE_NAME};
  `);

  return rows;
};

const getById = async id => {
  const [rows] = await planetscaleDatabase.query(
    `
        SELECT * FROM ${TABLE_NAME}
        WHERE id = ?;
    `,
    [id]
  );

  return rows?.[0];
};

const getByTypeAndValue = async (type, value) => {
  const [rows] = await planetscaleDatabase.query(
    `
          SELECT * FROM ${TABLE_NAME}
          WHERE type = ? AND value = ?;
      `,
    [type, value]
  );

  return rows?.[0];
};

const insert = async (type, value) => {
  const [insert] = await planetscaleDatabase.query(
    `
        INSERT INTO ${TABLE_NAME} (type, value)
        VALUES (?, ?);
      `,
    [type, value]
  );

  return insert;
};

const planetscaleTableNotifications = {
  get,
  getById,
  getByTypeAndValue,
  insert
};

export default planetscaleTableNotifications;
