import React, { useEffect, useState } from "react";
import { LogBook } from "../../components";

function Main() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoading(true);
      fetch("https://indodax.com/api/summaries")
        .then((res) => res.json())
        .then(
          (result) => {
            const getEntries = Object.entries(result.tickers);
            const convertToArray = [];
            getEntries.map((item) => {
              return convertToArray.push({ ticker: item[0], ...item[1] });
            });
            const filterData = convertToArray.filter((el) => {
              return (
                el.ticker === "btt_idr" ||
                el.ticker === "trx_idr" ||
                el.ticker === "bnb_idr" ||
                el.ticker === "dot_idr" ||
                el.ticker === "tad_idr" ||
                el.ticker === "vex_idr" ||
                el.ticker === "vidy_idr"
              );
            });
            const modData = [];
            filterData.map((el) => {
              if (el.ticker === "vidy_idr") {
                return modData.push({
                  ...el,
                  total_unit: 388689.33,
                  total_fund: 11164914.0,
                });
              } else if (el.ticker === "trx_idr") {
                return modData.push({
                  ...el,
                  total_unit: 8353.56,
                  total_fund: 5706600.52,
                });
              } else if (el.ticker === "btt_idr") {
                return modData.push({
                  ...el,
                  total_unit: 119047.71,
                  total_fund: 5000004.03,
                });
              } else if (el.ticker === "vex_idr") {
                return modData.push({
                  ...el,
                  total_unit: 64811.57,
                  total_fund: 6000001.16,
                });
              } else if (el.ticker === "tad_idr") {
                return modData.push({
                  ...el,
                  total_unit: 18.12,
                  total_fund: 2500000.32,
                });
              } else if (el.ticker === "dot_idr") {
                return modData.push({
                  ...el,
                  total_unit: 1.98,
                  total_fund: 1000000.0,
                });
              } else {
                return modData.push({
                  ...el,
                  total_unit: 0.08,
                  total_fund: 500000.0,
                });
              }
            });
            setData(modData);
            setLoading(false);
          },
          (error) => {
            console.log(`error : `, error);
            setLoading(false);
          }
        );
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        boxShadow: "rgb(158 158 158 / 25%) -1px 3px 15px 0px",
        backgroundColor: "#fff",
        margin: "2rem",
        border: "1px solid #eee",
        padding: 50,
        borderRadius: 30,
        overflow: "scroll",
      }}
    >
      <h1 style={{ fontWeight: "bold" }}>Assets Watcher Indodax</h1>
      <LogBook data={data} loading={loading} />
    </div>
  );
}

export default Main;
