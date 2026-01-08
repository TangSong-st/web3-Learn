import React, { useState, useEffect, useRef } from "react";

function App() {
  // 计数器
  const [count, setCount] = useState(0);

  // 输入框内容
  const [text, setText] = useState("");

  // 消息列表
  const [list, setList] = useState([]);

  // 输入框 ref，用于自动聚焦
  const inputRef = useRef(null);

  // 列表容器 ref，用于自动滚动
  const listEndRef = useRef(null);

  // 页面加载时执行一次
  useEffect(() => {
    console.log("页面加载完成");
  }, []);

  // 添加消息
  const addItem = () => {
    if (text.trim() === "") return; // 空消息不加
    setList([...list, text]);
    setText(""); // 清空输入框

    // 聚焦输入框
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // 删除消息
  const removeItem = (indexToRemove) => {
    setList(list.filter((_, i) => i !== indexToRemove));
  };

  // 回车添加
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addItem();
    }
  };

  // 每次 list 更新 → 自动滚动到底部
  useEffect(() => {
    if (listEndRef.current) {
      listEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [list]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px", fontFamily: "Arial" }}>
      <h1 style={{ color: "#4a90e2" }}>Day 2 - Mini Chat & Counter</h1>

      {/* 计数器 */}
      <div style={{ marginBottom: "20px" }}>
        <p style={{ fontSize: "20px" }}>Counter: {count}</p>
        <button 
          onClick={() => setCount(count + 1)}
          style={{
            padding: "8px 16px",
            fontSize: "16px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginBottom: "20px"
          }}
        >
          +1
        </button>
      </div>

      {/* 输入框 + 添加按钮 */}
      <div style={{ marginBottom: "20px" }}>
        <input
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter message"
          style={{
            padding: "8px",
            width: "200px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginRight: "10px"
          }}
        />
        <button 
          onClick={addItem}
          style={{
            padding: "8px 16px",
            fontSize: "16px",
            backgroundColor: "#4a90e2",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Add
        </button>
      </div>

      {/* 消息列表 */}
      <div 
        style={{
          maxHeight: "200px", 
          overflowY: "auto", 
          margin: "0 auto", 
          width: "250px", 
          textAlign: "left"
        }}
      >
        <ul style={{ listStyle: "none", padding: 0 }}>
          {list.map((item, index) => (
            <li 
              key={index} 
              style={{
                marginBottom: "10px",
                border: "1px solid #ccc",
                padding: "5px 10px",
                borderRadius: "5px",
                backgroundColor: "#f9f9f9",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <span>{item}</span>
              <button 
                onClick={() => removeItem(index)}
                style={{
                  marginLeft: "10px",
                  background: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "3px",
                  cursor: "pointer"
                }}
              >
                X
              </button>
            </li>
          ))}
          {/* 空 div，用于滚动到底部 */}
          <div ref={listEndRef}></div>
        </ul>
      </div>
    </div>
  );
}

export default App;
