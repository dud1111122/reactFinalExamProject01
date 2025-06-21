import React, { useState } from "react";
import "../css/ChatPage.css";

function ChatPage() {
  const [contacts] = useState([
    { id: 1, name: "유저1" },
    { id: 2, name: "유저2" },
    { id: 3, name: "유저3" },
    { id: 4, name: "유저4" },
    { id: 5, name: "유저5" },
  ]);

  const [selectedContactId, setSelectedContactId] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState({}); // contactId별 메시지 저장

  const selectedContact = contacts.find((c) => c.id === selectedContactId);

  const product = {
   imageUrl: "https://via.placeholder.com/40",
    name: "해당 상품",
  };

  const handleSendMessage = () => {
    if (!selectedContact) {
      alert("대화 상대를 선택해주세요.");
      return;
    }
    if (message.trim() === "") {
      alert("메시지를 입력해주세요.");
      return;
    }
    setMessages((prev) => {
      const prevMsgs = prev[selectedContact.id] || [];
      return {
        ...prev,
        [selectedContact.id]: [...prevMsgs, message.trim()],
      };
    });
    setMessage("");
  };

  
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); 
      handleSendMessage();
    }
  };

  return (
    <div className="chatpage-container">
      
      <header className="chatpage-header">
      
        <div className="chatpage-logo">
          <img
            src="/images/img_12teamlogovectorized_1.svg"
            alt="12 Team Logo"
            style={{ height: 40 }}
          />
        </div>
        <input
          type="text"
          placeholder="상품명, 유저명, 카테고리 검색"
          className="chatpage-search-input"
        />
        <nav className="chatpage-nav">
          <button>로그아웃</button>
          <button>상품등록</button>
          <button>마이페이지</button>
        </nav>
      </header>

      {/* 본문 */}
      <main className="chatpage-main">
        {/* 왼쪽 대화 상대 리스트 */}
        <aside className="chatpage-aside">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => setSelectedContactId(contact.id)}
              className={`chatpage-contact ${
                selectedContactId === contact.id ? "selected" : ""
              }`}
            >
              <div className="chatpage-contact-avatar" />
              <div>{contact.name}</div>
            </div>
          ))}
        </aside>

        {/* 오른쪽 대화 내용 및 상품 정보 */}
        <section className="chatpage-section">
          <div className="chatpage-header-info">
            {selectedContact ? (
              <>
                <h3>{selectedContact.name}</h3>
                <div
                  className="chatpage-product-info"
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <img src={product.imageUrl} alt="상품 이미지" />
                  <span>{product.name}</span>
                </div>
              </>
            ) : (
              <div className="chatpage-no-selection">
                대화 상대를 선택해주세요.
              </div>
            )}
          </div>

          {/* 메시지 영역 */}
          <div
            className="chatpage-message-area"
            style={{
              minHeight: 200,
              border: "1px solid #ccc",
              padding: 10,
              marginTop: 10,
              overflowY: "auto",
              backgroundColor: "#fafafa",
              borderRadius: 10,
            }}
          >
            {selectedContact && messages[selectedContact.id] ? (
              messages[selectedContact.id].map((msg, idx) => (
                <div
                  key={idx}
                  style={{
                    marginBottom: 6,
                    padding: 8,
                    backgroundColor: "#f1f1f1",
                    borderRadius: 8,
                    maxWidth: "70%",
                    marginLeft: 50, // 오른쪽으로 약간 띄우기
                    textAlign: "right",
                    wordBreak: "break-word",
                  }}
                >
                  {msg}
                </div>
              ))
            ) : (
              <div style={{ color: "#999" }}>메시지가 없습니다.</div>
            )}
          </div>

          {/* 하단 입력 영역 */}
          <div className="chatpage-input-area">
            <input
              type="text"
              placeholder="메시지를 입력하세요."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress} // 엔터 이벤트 처리
            />
            <button onClick={handleSendMessage}>전송</button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ChatPage;
