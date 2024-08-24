import React from "react";
import BtnTambah from "../element/BtnTambah";

const Table = ({ children, tHead, onclickBtn, type }) => {
  return (
    <>
      <div className="py-4">{type !== "penjualan" && <BtnTambah onclick={onclickBtn}>Tambah</ BtnTambah>}</div>
      <table>
        <thead>
          <tr>{tHead && tHead.map((el, i) => <th key={i}>{el}</th>)}</tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </>
  );
};

const TableR = ({ children }) => {
  return <tr>{children}</tr>;
};

const TableTD = ({ children }) => {
  return <td className="text-sm">{children}</td>;
};

Table.TableR = TableR;
Table.TableTD = TableTD;

export default Table;
