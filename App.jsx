import Sidebar from "../src/components/Sidebar";
import Chatbot from "../src/components/Chatbot";

function App() {
  const clearChat = () => {
    window.location.reload();
  };

  return (
    <div className="flex">
      <Sidebar clearChat={clearChat} />
      <Chatbot />
    </div>
  );
}

export default App;
