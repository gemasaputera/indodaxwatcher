import { Col, Row, Table } from "antd";
import React, { useState, useEffect } from "react";
import { currencyFormat } from "../../utils";
import styles from "./styles.module.css";

function LogBook({ data, loading }) {
  const [modifyData, setModifyData] = useState([]);
  const [totalFund, setTotalFund] = useState(0);
  const [totalAsset, setTotalAsset] = useState(0);

  useEffect(() => {
    const funds = data.reduce(
      (prev, next) => +prev + +parseInt(next.total_fund),
      0
    );
    const assets = data.reduce(
      (prev, next) =>
        +prev + +(parseInt(next.total_unit) * parseInt(next.last)),
      0
    );
    setTotalAsset(assets);
    setTotalFund(funds);
    setModifyData(data);
  }, [data]);

  const columns = [
    {
      title: "Market",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Total Unit (Avg)",
      dataIndex: "total_unit",
      key: "total_unit",
    },
    {
      title: "Harga Terakhir",
      dataIndex: "last",
      key: "last",
      render: (text) => {
        return currencyFormat(parseInt(text));
      },
    },
    {
      title: "Modal",
      dataIndex: "total_fund",
      key: "total_fund",
      render: (total_fund) => {
        return currencyFormat(parseInt(total_fund));
      },
    },
    {
      title: "Estimasi Aset",
      render: (record) => {
        return currencyFormat(record.total_unit * parseInt(record.last));
      },
    },
    {
      title: "% Change (Avg)",
      render: (record) => renderChange(record),
    },
  ];

  const renderChange = (item) => {
    const currentAssets = item.total_unit * parseInt(item.last);
    const firstFund = parseInt(item.total_fund);
    const percentage = ((currentAssets - firstFund) / firstFund) * 100;
    return (
      <p
        style={{ color: percentage > 0 ? "green" : "red", fontWeight: "bold" }}
      >
        {percentage.toFixed(2)} %
      </p>
    );
  };

  return (
    <Row>
      <Col className="gutter-row" span={24}>
        <Row>
          <Col span={12}>
            <h3 style={{ color: "rgb(165 165 165)" }}>
              Total Modal IDR {currencyFormat(totalFund)}
            </h3>
          </Col>
          <Col span={12}>
            <Row>
              <Col span={18}>
                <h3 style={{ color: "rgb(165 165 165)" }}>
                  Total Asset IDR {currencyFormat(totalAsset)}
                </h3>
              </Col>
              <Col span={6}>
                <span
                  style={{
                    fontWeight: "bold",
                    color: totalAsset - totalFund > 0 ? "green" : "red",
                  }}
                >
                  {(((totalAsset - totalFund) / totalFund) * 100).toFixed(2)} %
                </span>
              </Col>
            </Row>
          </Col>
        </Row>
        <div className={styles.tableWrapper}>
          <Table
            dataSource={modifyData}
            columns={columns}
            loading={loading}
            pagination={{ position: ["none", "none"] }}
          />
        </div>
      </Col>
    </Row>
  );
}

export default LogBook;
