import db from "#db/client";

/** @returns the employee created according to the provided details */
export async function createEmployee({ name, birthday, salary }) {
  const SQL = `
  INSERT INTO employees (name, birthday, salary)
  VALUES($1, $2, $3) RETURNING *
  `;
  const {
    rows: [employees],
  } = await db.query(SQL, [name, birthday, salary]);
  return employees;
}

// === Part 2 ===

/** @returns all employees */
export async function getEmployees() {
  const SQL = `
      SELECT * FROM employees
      `;
  const { rows } = await db.query(SQL);
  return rows;
}

/**
 * @returns the employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function getEmployee(id) {
  const SQL = `
      SELECT * FROM employees
      where id = $1
      `;
  const { rows } = await db.query(SQL, [id]);
  return rows[0];
}

/**
 * @returns the updated employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function updateEmployee({ id, name, birthday, salary }) {
  const SQL = `
      UPDATE employees
      SET
      dog_name = $2
      breed = $3
      WHERE id = $1
      RETURNING *
      `;
  const { rows } = db.query(SQL, [id]);
  return rows[0];
}

/**
 * @returns the deleted employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function deleteEmployee(id) {
  const SQL = `
  DELETE FROM employees 
  WHERE id = $1
  `;
  const { rows } = db.query(SQL, [id]);
  return rows;
}
