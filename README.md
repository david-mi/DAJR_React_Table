# david-mi react-table v2.5.1

## Description

A react package to create a table with integrated functionalities

## Functionalities
### Sorting data
When clicking on column heading, you can arrange data in 3 ways
- Sorting in ascending order
- Sorting in descending order
- Unsort (Will show unsorted data)
- Filter rows based on input search
- Handle pagination size with select menu
- View data Informations (pages entries, total filtered entries, total entries)
- Go to next page
- Go to previous page
- Go to page specified in page input

### Filtering data
When entering text on the search input, only rows that includes wrote texte in any fields will be displayed

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
    <Table columns={columns} rows={rows} />
  );
}
```

## Result
<img src="https://i.imgur.com/3Biz1Xb.gif" >

## Types
```ts
interface Column<T> {
  title: string,
  accessor: T
}

type Row<T extends string> = {
  [key in T]: string | number
}
```

