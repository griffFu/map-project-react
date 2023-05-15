import React from "react";
import Papa from "papaparse";
import "/Users/griffinfulton/Documents/Programming/React/plant-map/src/App.css";

export default function App() {
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    async function getData() {
      const response = await fetch("/id_example.csv");
      const reader = response.body.getReader();
      const result = await reader.read(); // raw array
      const decoder = new TextDecoder("utf-8");
      const csv = decoder.decode(result.value); // the csv text
      const results = Papa.parse(csv, { header: true }); // object with { data, errors, meta }
      const rows = results.data; // array of objects
      setRows(rows);
      console.log(rows);
    }
    getData();
  }, []); // [] means just do this once, after initial render
  return (
    <div>
      {rows.map((row) => {
        return (
          <div key={row.id} class={row.location}>
            <h2>{row.location}</h2>
          </div>
        );
      })}
    </div>
  );
}
