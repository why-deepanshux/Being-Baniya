import React, { useRef, useState } from "react";
import { Input, Table, Select, Radio } from "antd";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import search from "../../assets/search.svg";
import { unparse , parse } from "papaparse";
const { Search } = Input;
const { Option } = Select;



const TableTransactions = ({
  transactions,
  addTransaction,
  fetchAllTransactions,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortKey, setSortKey] = useState("");

  function exportToCsv() {
    const csv = unparse({
      fields: ["name", "type", "date", "amount", "tag"],
      data: transactions,
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "transactions.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function importFromCsv(event) {
    event.preventDefault();

    // Check if a file was selected
    const file = event.target.files ? event.target.files[0] : null;
    if (!file) {
      toast.error("No file selected or invalid file.");
      return;
    }

    // Parse the CSV file
    parse(file, {
      header: true, // Expect headers in the first row
      skipEmptyLines: true, // Skip empty lines
      complete: async function (results) {
        const importedTransactions = results.data;

        // Check if the data is valid
        if (importedTransactions.length === 0) {
          toast.error("No transactions found in CSV");
          return;
        }

        // Process each transaction and add it to the database
        for (const transaction of importedTransactions) {
          // Ensure each required field is available
          if (
            !transaction.name ||
            !transaction.amount ||
            !transaction.date ||
            !transaction.tag ||
            !transaction.type
          ) {
            toast.error("Missing required fields in one or more transactions");
            continue;
          }

          // Prepare the transaction data
          const newTransaction = {
            name: transaction.name,
            type: transaction.type,
            date: transaction.date,
            amount: parseFloat(transaction.amount), // Ensure amount is a number
            tag: transaction.tag,
          };

          // Add the transaction to Firebase
          try {
            await addTransaction(newTransaction, true); // Add to DB
          } catch (error) {
            toast.error("Error adding transaction: " + error.message);
          }
        }

        // Fetch all transactions after import
        fetchAllTransactions();
        toast.success("All Transactions Added Successfully!");
      },
      error: function (error) {
        toast.error("Error parsing CSV file: " + error.message);
      },
    });

    // Reset file input after handling the file
    event.target.value = null;
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
    },
  ];

  const filteredTransactions = transactions.filter((transaction) => {
    const searchMatch = searchTerm
      ? transaction.name.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    const tagMatch = selectedTag ? transaction.tag === selectedTag : true;
    const typeMatch = typeFilter ? transaction.type === typeFilter : true;

    return searchMatch && tagMatch && typeMatch;
  });

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortKey === "date") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortKey === "amount") {
      return a.amount - b.amount;
    } else {
      return 0;
    }
  });

  const dataSource = sortedTransactions.map((transaction, index) => ({
    key: index,
    ...transaction,
  }));
  return (
    <div
      style={{
        width: "100%",
        padding: "0rem 2rem",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <div className="input-flex">
          <img src={search} width="16" />
          <input
            placeholder="Search by Name"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select
          className="select-input"
          onChange={(value) => setTypeFilter(value)}
          value={typeFilter}
          placeholder="Filter"
          allowClear
        >
          <Option value="">All</Option>
          <Option value="income">Income</Option>
          <Option value="expense">Expense</Option>
        </Select>
      </div>

      {/* <Select
        style={{ width: 200, marginRight: 10 }}
        onChange={(value) => setSelectedTag(value)}
        placeholder="Filter by tag"
        allowClear
      >
        <Option value="food">Food</Option>
        <Option value="education">Education</Option>
        <Option value="office">Office</Option>
      </Select> */}
      <div className="my-table">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            marginBottom: "1rem",
            flexWrap: "wrap",
          }}
        >
          <h2>My Transactions</h2>

          <Radio.Group
            className="input-radio"
            onChange={(e) => setSortKey(e.target.value)}
            value={sortKey}
          >
            <Radio.Button value="">No Sort</Radio.Button>
            <Radio.Button value="date">Sort by Date</Radio.Button>
            <Radio.Button value="amount">Sort by Amount</Radio.Button>
          </Radio.Group>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              width: "400px",
            }}
          >
            <button className="btn" onClick={exportToCsv}>
              Export to CSV
            </button>
            <label
              for="file-csv"
              className="btn btn-blue"
              onClick={importFromCsv}
            >
              Import from CSV
            </label>
            <input
              id="file-csv"
              type="file"
              accept=".csv"
              required
              style={{ display: "none" }}
            />
          </div>
        </div>

        <Table columns={columns} dataSource={dataSource} />
      </div>
    </div>
  );
};

export default TableTransactions;
