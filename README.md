# david-mi react-table v3.2.0

## Description

A react package to create a table with integrated functionalities

## Functionalities
### Sorting data
**When clicking on a column heading, you can arrange data in 3 ways**
- Sorting in ascending order
- Sorting in descending order
- Unsort (Will show unsorted data)

### Filtering data
**When entering text on the search input, only rows that includes wrote texte in any fields will be displayed**
- Sorting state is being kept after filtering

### Paginating data
**A pagination system is being used to navigate through the pages**
- Go to next page
- Go to previous page
- Go to page specified in page input

### Retrieving data information
**A section is made to display informations about the data being processed**
- You can visualize from where to where the data is being displayed in the current page
- When filtering data, you can see the size of filtered entries
- You can the the number of total entries, before processing

## Installation
```bash
npm i david-mi-react-table
```

## Usage
```js
import { Table } from "david-mi-react-table";

// you will need to prepare rows and columns data

/* Array of objets with each 2 properties  

- title is the column to be displayed in column header
- accessor will be its reference.
 It should be pointed by each rows Objects as a property name */

const columns = [
  {
    title: "Game",
    accessor: "game"
  },
  {
    title: "Note (/20)",
    accessor: "note"
  }
];

/* Array of objets with properties referencing every columns accessors
- Values can be a string or a number
*/

const rows = [
  { game: "Counter Strike: Source", note: 18 },
  { game: "ARK : Survival Evolved", note: 13.8 },
  { game: "Trials Fusion", note: 17 },
  { game: "Dungeon Defenders", note: 16.5 },
  { game: "Spider-Man", note: 15 },
  { game: "Borderlands", note: 17 },
  { game: "Borderlands 2", note: 18 },
  { game: "Borderland The Pre-Sequel !", note: 15 }
];

/* display Table component, passing columns and rows props */

function App() {
  return (
    <Table 
    columns={columns}
     rows={rows}
     classNames={{
      container: "table__container",
      navigation: "navigation__container"
     }}
      />
  );
}
```

## Props

| Props | type |Description | Required |
|--|--|--| -- |
| rows | Array<Row> | rows to display on table  | true |
| columns | Array<Column> | columns heads  | true |
| classNames | Object | custom class names to apply on table container and it's elements  | false |
| colors | Object | custom colors to apply on table  | false |

### Column
| Key name | Type | Description | Required |
|--|--|--|--|
| title | string | title to display on column head  | true |
| accessor | string | accessor to target the correct cells  | true |

```js
{ 
  /* title that will be displayed at column head*/
  title: "First name",
  /* reference to a row key */
  accessor: firstName
}
```

### Row

| Key name | Type | Description | Required |
|--|--|--|--|
| < key > | string or number | row value  | true |

```js
{ 
  /* row key with it's value */
  firstName: "David"
}
```

### classNames

| Key name                           | Type   | Description                              | Required |
|------------------------------------|--------|------------------------------------------| -- |
| container | string | main container               | false |
| tableContainer | string | table wrapper | false |
| table | string | table element | false |
| select | string | select page menu on top left| false |
| search | string | search menu on top right | false |
| informations | string | informations part on bottom left | false |
| navigation | string | navigation menu on bottom right | false |

### colors

| Key name                           | Type   | Description                              | Required |
|------------------------------------|--------|------------------------------------------| -- |
| hover | string | Table hover (heading, rows and buttons)               | false |
| button | string | Table buttons | false |
| buttonCurrentPage | string | Table button matching the current page number | false |
| buttonDisabled | string | Table disabled buttons | false |
| sortArrow | string | sorting arrows on heading | false |
| sortArrowActive | string | the arrow representing the direction of current sorted column, if chosen (asc or desc. )| false |
| head | string | table heading| false |

## Types
```ts
interface Column<T> {
  title: string,
  accessor: T
}

type Row<T extends string> = {
  [key in T]: string | number
}

interface ClassNames {
  container?: string
  tableContainer?: string
  table?: string
  select?: string
  search?: string
  informations?: string
  navigation?: string
}

interface Colors {
  hover?: string,
  button?: string
  buttonCurrentPage?: string
  buttonDisabled?: string
  sortArrow?: string
  sortArrowActive?: string
  head?: string
}

export interface TableProps<T extends string> {
  columns: Column<T>[],
  rows: Row<T>[]
  classNames?: ClassNames
  colors?: Colors
}
```

## CodeSandbox demos

### Javascript : [Link](https://codesandbox.io/p/sandbox/david-mi-react-table-js-example-z2wf75?file=%2Fsrc%2FApp.js%3A1%2C1)
### TypeScript : [Link](https://codesandbox.io/p/sandbox/david-mi-react-table-ts-example-ngj5wm?file=%2Fsrc%2FApp.tsx%3A11%2C20)

