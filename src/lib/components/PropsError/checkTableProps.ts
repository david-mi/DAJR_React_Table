/**
 * Checks if props passed to Table are valid
 * @returns error message if the check is incorrect
 */

export function checkTableProps({ columns, rows, classNames, colors }: any): Error | void {
  try {
    throwIfColumnsIsInvalid(columns)
    throwIfRowsIsInvalid({ columns, rows })
    throwIfClassNamesAreInvalid(classNames)
    throwIfColorsAreInvalid(colors)
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
  classNames: {
    notObject: "classNames props must be an object",
    notExistingPropertyName: (property: string) => `Property ${property} does not exist on className`,
    notString: (property: string) => `Value of classNames.${property} must be a string`
  },
  colors: {
    notObject: "colors props must be an object",
    notExistingPropertyName: (property: string) => `Property ${property} does not exist on colors`,
    notString: (property: string) => `Value of colors.${property} must be a string`
  }
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

/** Checks if classNames props passed to Table is valid */

function throwIfClassNamesAreInvalid(classNames: any) {
  if (classNames === undefined) return

  if (classNames.constructor !== Object) {
    throw new Error(errors.classNames.notObject)
  }

  const expectedClassNames = {
    container: "container",
    tableContainer: "tableContainer",
    table: "table",
    pageSelect: "select",
    search: "search",
    informations: "informations",
    navigation: "navigation",
    footer: "footer"
  }

  for (const key in classNames) {
    if (key in expectedClassNames === false) {
      throw new Error(errors.classNames.notExistingPropertyName(key))
    }

    if (typeof classNames[key] !== "string") {
      throw new Error(errors.classNames.notString(key))
    }
  }
}

/** Checks if colors props passed to Table is valid */

function throwIfColorsAreInvalid(colors: any) {
  if (colors === undefined) return

  if (colors.constructor !== Object) {
    throw new Error(errors.colors.notObject)
  }

  const expectedColors = {
    hover: "hover",
    button: "button",
    buttonCurrentPage: "buttonCurrentPage",
    buttonDisabled: "buttonDisabled",
    sortArrow: "sortArrow",
    sortArrowActive: "sortArrowActive",
    head: "head"
  }

  for (const key in colors) {
    if (key in expectedColors === false) {
      throw new Error(errors.colors.notExistingPropertyName(key))
    }

    if (typeof colors[key] !== "string") {
      throw new Error(errors.colors.notString(key))
    }
  }
}


