import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { MicExternalOn, MicOffRounded, SendRounded } from "@mui/icons-material";
import Grid from "@mui/material/Grid";

const ChatBox = ({
  submitText,
  handleStartListening,
  handleStopListening,
  listening,
  transcript,
  resetTranscript,
}: {
  submitText: any;
  handleStartListening: any;
  handleStopListening: any;
  listening: boolean;
  transcript: string;
  resetTranscript: any;
}) => {
  const [isMicOn, setMic] = useState(false);
  const [text, setText] = useState("");
  const handleSendButtonClick = useCallback(() => {
    submitText(text);
    setText("");
  }, [text]);

  const handleEnterKeyUp = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        handleSendButtonClick();
      }
    },
    [handleSendButtonClick],
  );

  const handleMicOn = useCallback(
    (e) => {
      setMic(true);
      handleStartListening();
    },
    [setMic],
  );

  const handleMicOff = useCallback(
    (e) => {
      setMic(false);
      handleStopListening();
      if (text.length > 1) {
        handleSendButtonClick();
      }
    },
    [setMic, text],
  );

  useEffect(() => {
    if (listening) {
      setText(transcript);
    }
  }, [listening, transcript]);

  return (
    <Grid
      sx={{
        boxShadow: 3,
        position: "absolute",
        width: "100%",
        height: "100px",
        bottom: "0px",
        backgroundColor: "#18181c",
      }}
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={3} width="85%">
        <FormControl sx={{ width: "100%" }}>
          <InputLabel htmlFor="message-input-box">
            Let's talk with me everything, about ME and the others you want.
          </InputLabel>
          <OutlinedInput
            id="message-input-box"
            type="text"
            label="Let's talk with me everything, about ME and the others you want"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyUp={handleEnterKeyUp}
            endAdornment={
              <InputAdornment position="end" sx={{ p: 1 }}>
                <IconButton
                  edge="end"
                  sx={{ mr: 1 }}
                  onMouseDown={handleMicOn}
                  onMouseUp={handleMicOff}
                >
                  {isMicOn ? <MicExternalOn /> : <MicOffRounded />}
                </IconButton>
                <IconButton edge="end" onClick={(e) => handleSendButtonClick()}>
                  <SendRounded />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default ChatBox;
