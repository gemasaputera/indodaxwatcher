import React, { useEffect, useState } from "react";
import { LogBook } from "../../components";
import styles from "./styles.module.css";

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
                el.ticker === "vidy_idr" ||
                el.ticker === "trx_idr" ||
                el.ticker === "btt_idr" ||
                el.ticker === "vex_idr" ||
                el.ticker === "bnb_idr"
              );
            });
            const modData = [];
            filterData.map((el) => {
              if (el.ticker === "vidy_idr") {
                return modData.push({
                  ...el,
                  total_unit: 215773.23,
                  total_fund: 11000000,
                });
              } else if (el.ticker === "trx_idr") {
                return modData.push({
                  ...el,
                  total_unit: 4127.96,
                  total_fund: 6000000,
                });
              } else if (el.ticker === "btt_idr") {
                return modData.push({
                  ...el,
                  total_unit: 69327.77,
                  total_fund: 3500000,
                });
              } else if (el.ticker === "vex_idr") {
                return modData.push({
                  ...el,
                  total_unit: 16202.89,
                  total_fund: 1800000,
                });
              } else {
                return modData.push({
                  ...el,
                  total_unit: 0.08,
                  total_fund: 500000,
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
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Assets Watcher Indodax</h1>
      <LogBook data={data} loading={loading} />
    </div>
  );
}

export default Main;
