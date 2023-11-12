# david-mi react-table v3.3.0

## Description

A react package to create a table with integrated functionalities

## Functionalities
### Sorting data
**When clicking on a column heading, you can arrange data in 3 ways**
- Sorting in ascending order
- Sorting in descending order
- default (non sorted, like it was originally)

### Filtering data
**When writing text on the search input, only rows who have cells that includes written will be displayed**
- Sorting state is being kept after filtering

### Paginating data
**A pagination system is being used to navigate through the pages and limiting amount of displayed data on the screen**
- Go to next page
- Go to previous page
- Go to page specified by button (if there is a lot of data, limiting amount of displayed page buttons)
- Go to page specified in "Go to" input

### Retrieving data information
**A section is made on the bottom left to display informations about the data being processed**
- You can visualize the entries range of the current page (**Example :** *Showing 41 to 50 of 500 entries*)
- You can see the number of total entries, ignoring filtering

## Installation
```bash
npm i david-mi-react-table
```

## Example
```js
import "david-mi-react-table/style.css";
import { Table } from "david-mi-react-table";

const columns = [
  { title: "Title", accessor: "title" },
  { title: "Rating (/20)", accessor: "rating" },
];

const rows = [
  { title: "ARK: Survival Evolved", rating: 12 },
  { title: "Trials Fusion", rating: 17 },
  { title: "Counter-Strike: Source", rating: 18 },
  { title: "Dungeon Defenders", rating: 16 },
  { title: "Trials Evolution Gold Edition", rating: 18 },
  { title: "Borderlands 2", rating: 18 },
  { title: "Portal 2", rating: 19 },
  { title: "Deep Rock Galactic", rating: 15 },
  { title: "Counter-Strike 2", rating: 15 },
  { title: "Borderlands GOTY", rating: 13.5 },
  { title: "Fallout 4", rating: 16 },
  { title: "Orcs Must Die! 2", rating: 16 },
  { title: "Borderlands: The Pre-Sequel", rating: 15 },
];

function App() {
  return (
    <Table 
      columns={columns}
      rows={rows} 
     />
  );
}
```

### Result 

![img](https://i.imgur.com/6AYXwpM.gif)

## Typescript Example

You can import **Row** and **Column** types to reinforce typing
They accept a generic wich are keys of a row data schema

You can avoid using **Row** and **Column** types aswell, is it not required but recommended as you will get more precise warnings

```ts
import "david-mi-react-table/style.css";
import { Table, Row, Column } from "david-mi-react-table";

interface Game {
  title: string;
  rating: number;
}

const columns: Column<keyof Game>[] = [
  { title: "Game", accessor: "title" },
  { title: "Rating (/20)", accessor: "rating" },
];

const rows: Row<keyof Game>[] = [
  { title: "ARK: Survival Evolved", rating: 12 },
  { title: "Trials Fusion", rating: 17 },
  { title: "Counter-Strike: Source", rating: 18 },
  { title: "Dungeon Defenders", rating: 16 },
  { title: "Trials Evolution Gold Edition", rating: 18 },
  { title: "Borderlands 2", rating: 18 },
  { title: "Portal 2", rating: 19 },
  { title: "Deep Rock Galactic", rating: 15 },
  { title: "Counter-Strike 2", rating: 15 },
  { title: "Borderlands GOTY", rating: 13.5 },
  { title: "Fallout 4", rating: 16 },
  { title: "Orcs Must Die! 2", rating: 16 },
  { title: "Borderlands: The Pre-Sequel", rating: 15 },
];

function App() {
  return <Table columns={columns} rows={rows} />;
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

| Key                          | Type   | Description                              | Required |
|------------------------------------|--------|------------------------------------------| -- |
| container | string | main container               | false |
| tableContainer | string | table wrapper | false |
| table | string | table element | false |
| select | string | select page menu on top left| false |
| search | string | search menu on top right | false |
| informations | string | informations part on bottom left | false |
| navigation | string | navigation menu on bottom right | false |

### colors

| Key                          | Type   | Description                              | Required |
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
  footer?: string
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

### React : [Link](https://codesandbox.io/p/sandbox/david-mi-react-table-js-example-z2wf75?file=%2Fsrc%2FApp.js%3A1%2C1)
### React Typescript : [Link](https://codesandbox.io/p/sandbox/david-mi-react-table-ts-example-ngj5wm?file=%2Fsrc%2FApp.tsx%3A11%2C20)
### NextJs : [Link](https://codesandbox.io/p/sandbox/david-mi-react-table-next-example-942fkd?file=%2Fapp%2Fpage.tsx%3A9%2C1)
