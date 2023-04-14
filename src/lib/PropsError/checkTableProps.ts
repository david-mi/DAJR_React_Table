/**
 * Checks if props passed to Table are valid
 * @returns error message if the check is incorrect
 */

export function checkTableProps({ columns, rows }: any): Error | void {
  try {
    throwIfColumnsIsInvalid(columns)
    throwIfRowsIsInvalid({ columns, rows })
  } catch (error) {
    if (error instanceof Error)
      return error
  }
}

export const errors = {
  columns: {
    missing: "columns props is missing",
    notArray: "columns props must be an array",
    elements: {
      notObject: "columns elements must be of type: {title: string, accessor: string}",
      missingProperty: "Each columns objects must have a title and accessor property",
      incorrectValue: "title and accessor value must be string and not be empty"
    }

  },
  rows: {
    missing: "rows props is missing",
    notArray: "rows props must be an array",
    elements: {
      notObject: "rows elements must by of type {[key: string]: string | number}",
      missingProperty: (accessor: string) => `Property ${accessor} is missing from row`,
      incorrectValue: (rowProperty: string) => `${rowProperty} value must be a string or a number`
    }
  },
}

/** Checks if columns props passed to Table is valid */

function throwIfColumnsIsInvalid(columns: any[]) {
  if (columns === undefined) {
    throw new Error(errors.columns.missing)
  }

  if (Array.isArray(columns) === false) {
    throw new Error(errors.columns.notArray)
  }

  columns.forEach((column) => {
    if (column.constructor !== Object) {
      throw new Error(errors.columns.elements.notObject)
    }

    if (column.title === undefined || column.accessor === undefined) {
      throw new Error(errors.columns.elements.missingProperty)
    }

    if (
      typeof column.title !== "string" ||
      column.title === "" ||
      typeof column.accessor !== "string" ||
      column.accessor === ""
    ) {
      throw new Error(errors.columns.elements.incorrectValue)
    }
  });
}

/** Checks if rows props passed to Table is valid */

function throwIfRowsIsInvalid({ rows, columns }: { rows: any[], columns: any[] }) {
  if (rows === undefined) {
    throw new Error(errors.rows.missing)
  }

  if (Array.isArray(rows) === false) {
    throw new Error(errors.rows.notArray)
  }


  rows.forEach((row) => {
    if (row.constructor !== Object) {
      throw new Error(errors.rows.elements.notObject)
    }

    columns.forEach((column) => {
      if (row[column.accessor] === undefined) {
        throw new Error(errors.rows.elements.missingProperty(column.accessor))
      }
    })

    for (const key in row) {
      if (typeof row[key] !== "string" && typeof row[key] !== "number") {
        throw new Error(errors.rows.elements.incorrectValue(key))
      }
    }
  })
}

