# david-mi react-table v3.0.0

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

## Types
```ts
interface Column<T> {
  title: string,
  accessor: T
}

type Row<T extends string> = {
  [key in T]: string | number
}

interface Props<T extends string> {
  columns: Column<T>[],
  rows: Row<T>[]
  classNames?: {
    container?: string
    tableContainer?: string
    table?: string
    select?: string
    search?: string
    informations?: string
    navigation?: string
  }
}
```

## CodeSandbox demos

### Javascript : [Link](https://codesandbox.io/p/sandbox/david-mi-react-table-js-example-z2wf75?file=%2Fsrc%2FApp.js%3A1%2C1)
### TypeScript : [Link](https://codesandbox.io/p/sandbox/david-mi-react-table-ts-example-ngj5wm?file=%2Fsrc%2FApp.tsx%3A11%2C20)

