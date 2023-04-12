import type { Row } from "../lib/types"

export interface Data {
  firstName: string
  lastName: string,
  startDate: string,
  department: string,
  birthDate: string,
  state: string,
  street: string,
  city: string,
  zipCode: number
}

export const rows: Row<keyof Data>[] = [
  {
    "firstName": "Miriam",
    "lastName": "Moses",
    "startDate": "2022-12-23",
    "department": "Marketing",
    "birthDate": "1996-02-06",
    "state": "GA",
    "street": "Fairfax Ave",
    "city": "Charlotte",
    "zipCode": 40218
  },
  {
    "firstName": "Hanan",
    "lastName": "Karin",
    "startDate": "2015-04-12",
    "department": "Marketing",
    "birthDate": "1973-12-03",
    "state": "WA",
    "street": "Ventura Blvd",
    "city": "Los Angeles",
    "zipCode": 80246
  },
  {
    "firstName": "Basanti",
    "lastName": "Dan",
    "startDate": "2019-10-28",
    "department": "Sales",
    "birthDate": "1997-01-19",
    "state": "KY",
    "street": "Washington Blvd",
    "city": "Durham",
    "zipCode": 94588
  },
  {
    "firstName": "Emine",
    "lastName": "Olivier",
    "startDate": "2022-05-15",
    "department": "Engineering",
    "birthDate": "1985-04-01",
    "state": "ND",
    "street": "Sunset Blvd",
    "city": "San Diego",
    "zipCode": 33950
  },
  {
    "firstName": "Kim",
    "lastName": "Mehmet",
    "startDate": "2020-02-11",
    "department": "Sales",
    "birthDate": "1965-02-18",
    "state": "UT",
    "street": "Sunset Strip",
    "city": "Lexington",
    "zipCode": 55415
  },
  {
    "firstName": "Mina",
    "lastName": "Dipak",
    "startDate": "2022-01-10",
    "department": "Legal",
    "birthDate": "1988-09-17",
    "state": "DE",
    "street": "Beverly Dr",
    "city": "San Jose",
    "zipCode": 60005
  },
  {
    "firstName": "Raj",
    "lastName": "Nicole",
    "startDate": "1999-02-26",
    "department": "Human Resources",
    "birthDate": "1959-08-27",
    "state": "RI",
    "street": "Beverly Glen Blvd",
    "city": "Dallas",
    "zipCode": 32092
  },
  {
    "firstName": "Yu",
    "lastName": "Mona",
    "startDate": "2012-05-31",
    "department": "Legal",
    "birthDate": "1993-09-30",
    "state": "VT",
    "street": "West Rd",
    "city": "Pittsburgh",
    "zipCode": 55306
  },
  {
    "firstName": "Raj",
    "lastName": "Rashid",
    "startDate": "2022-03-15",
    "department": "Marketing",
    "birthDate": "2003-09-26",
    "state": "ID",
    "street": "Mullholland Dr",
    "city": "Anchorage",
    "zipCode": 50010
  },
  {
    "firstName": "Liming",
    "lastName": "Clara",
    "startDate": "2023-03-11",
    "department": "Human Resources",
    "birthDate": "1990-09-14",
    "state": "DC",
    "street": "Houston St",
    "city": "Oakland",
    "zipCode": 75013
  },
  {
    "firstName": "Tony",
    "lastName": "Salvador",
    "startDate": "2002-08-24",
    "department": "Marketing",
    "birthDate": "1980-05-17",
    "state": "MT",
    "street": "Santa Fe Ave",
    "city": "Laredo",
    "zipCode": 98375
  },
  {
    "firstName": "Lina",
    "lastName": "Prakash",
    "startDate": "1995-03-12",
    "department": "Human Resources",
    "birthDate": "1974-05-26",
    "state": "MP",
    "street": "Whitley Ave",
    "city": "Baton Rouge",
    "zipCode": 75082
  },
  {
    "firstName": "Herbert",
    "lastName": "Jorge",
    "startDate": "2020-06-07",
    "department": "Engineering",
    "birthDate": "1982-04-03",
    "state": "KS",
    "street": "Sunset Plaza Dr",
    "city": "Fort Wayne",
    "zipCode": 87505
  },
  {
    "firstName": "Jianjun",
    "lastName": "Mahendra",
    "startDate": "2012-02-18",
    "department": "Human Resources",
    "birthDate": "1976-11-06",
    "state": "OH",
    "street": "Tremont St",
    "city": "Philadelphia",
    "zipCode": 45431
  },
  {
    "firstName": "Mamadou",
    "lastName": "Oscar",
    "startDate": "2023-04-07",
    "department": "Human Resources",
    "birthDate": "1987-10-24",
    "state": "SD",
    "street": "Mullholland Dr",
    "city": "Scottsdale",
    "zipCode": 19103
  },
  {
    "firstName": "Ida",
    "lastName": "Tomasz",
    "startDate": "2023-04-03",
    "department": "Human Resources",
    "birthDate": "2001-06-03",
    "state": "AR",
    "street": "Vermont Ave",
    "city": "Washington",
    "zipCode": 95050
  },
  {
    "firstName": "Robert",
    "lastName": "Tadesse",
    "startDate": "2005-05-31",
    "department": "Human Resources",
    "birthDate": "1977-01-01",
    "state": "DC",
    "street": "Western Ave",
    "city": "Milwaukee",
    "zipCode": 17201
  },
  {
    "firstName": "Evelyn",
    "lastName": "Ida",
    "startDate": "1998-12-24",
    "department": "Marketing",
    "birthDate": "1966-03-27",
    "state": "AL",
    "street": "Mulholland Dr",
    "city": "Virginia Beach",
    "zipCode": 92821
  },
  {
    "firstName": "Roger",
    "lastName": "Sharon",
    "startDate": "2022-10-09",
    "department": "Legal",
    "birthDate": "1988-08-02",
    "state": "NH",
    "street": "Houston St",
    "city": "Toledo",
    "zipCode": 98121
  },
  {
    "firstName": "Leonard",
    "lastName": "Zahra",
    "startDate": "2014-01-16",
    "department": "Marketing",
    "birthDate": "1983-04-09",
    "state": "ID",
    "street": "San Vicente Blvd",
    "city": "Pittsburgh",
    "zipCode": 75104
  }
]