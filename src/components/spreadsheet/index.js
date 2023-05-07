import React from "react";
import ReactGrid from "reactgrid";
import "reactgrid/styles.css";

const Spreadsheet = () => {
    const columns = [
        {
            key: "athlete",
            name: "Athlete",
            width: 200
        },
        {
            key: "sport",
            name: "Sport",
            width: 200
        },
        {
            key: "year",
            name: "Year",
            width: 200
        },
        {
            key: "gold",
            name: "Gold",
            width: 200
        },
        {
            key: "silver",
            name: "Silver",
            width: 200
        },
        {
            key: "bronze",
            name: "Bronze",
            width: 200
        }
    ];

    const rows = [
        {
            athlete: "Michael Phelps",
            sport: "Swimming",
            year: "2008",
            gold: 8,
            silver: 0,
            bronze: 0
        },
        {
            athlete: "Michael Phelps",
            sport: "Swimming",
            year: "2004",
            gold: 6,
            silver: 0,
            bronze: 2
        },
        {
            athlete: "Michael Phelps",
            sport: "Swimming",
            year: "2012",
            gold: 4,
            silver: 2,
            bronze: 0
        },
        {
            athlete: "Natalie Coughlin",
            sport: "Swimming",
            year: "2008",
            gold: 1,
            silver: 2,
            bronze: 3
        },
        {
            athlete: "Missy Franklin",
            sport: "Swimming",
            year: "2012",
            gold: 4,
            silver: 0,
            bronze: 1
        },
        {
            athlete: "Ryan Lochte",
            sport: "Swimming",
            year: "2012",
            gold: 2,
            silver: 2,
            bronze: 1
        }
    ];

    return <ReactGrid columns={columns} rows={rows} />;
};

export default Spreadsheet;