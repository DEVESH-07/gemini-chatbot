import { useState } from "react";
import TextField from "@mui/material/TextField";
import "./App.css";
import { Paper } from "@mui/material";
import Box from "@mui/material/Box";
import axios from "axios";
import LinearProgress from "@mui/material/LinearProgress";
import Dog from "./components/components";
import { baseUrl } from "./utils/const";

function App() {
  const [query, setQuery] = useState("");
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleEnterKey = (event) => {
    if (event.key === "Enter") {
      setLoading(true);
      setQuery("");
      setConversation((prevItems) => [
        ...prevItems,
        { role: "User", text: query },
      ]);
      callApi();
    }
  };

  async function callApi() {
    const formData = new FormData();
    formData.append("text", query);
    const url = baseUrl;
    await axios({
      method: "POST",
      url: url,
      data: formData,
    }).then((res) => {
      setLoading(false);
      setConversation((prevItems) => [
        ...prevItems,
        { role: "Bot", text: res.data.response },
      ]);
      console.log(res.data);
    });
  }

  return (
    <div className="main">
      <Box sx={{ width: "100%", position: "absolute", top: 0 }}>
        {loading ? <LinearProgress color="success" sx={{ height: 6 }} /> : null}
      </Box>
      <div id="chat">
        {conversation.length > 0
          ? conversation.map((item) => {
              return (
                <Box
                  sx={{
                    maxWidth: "fit-content",
                    minWidth: 150,
                    height: "auto",
                    padding: 2,
                    backgroundColor:
                      item.role === "Bot" ? "#DDC7A0" : "#5e63ff",
                    borderRadius: 3,
                    wordWrap: "break-word",
                    position: "relative",
                    margin: 2,
                  }}
                >
                  <p>{item.text}</p>
                </Box>
              );
            })
          : <Dog/>
          }
      </div>
      <TextField
        label={"Ask Anything"}
        id="filled-basic"
        variant="filled"
        margin="normal"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        onKeyDown={handleEnterKey}
        sx={{
          backgroundColor: "#ffffff",
          borderRadius: 12,
        }}
      />
    </div>
  );
}

export default App;
