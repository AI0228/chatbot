import { useCallback, useEffect, useState } from "react";
import type { Container, Engine } from "tsparticles-engine";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import ChatBox from "./components/Chatbox";
import Grid from "@mui/material/Grid";
import { ChatList, IChatItemProps } from "react-chat-elements";
import "./App.css";
import constants from "./components/Constants";
import Message from "./components/Message";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import PersonalContact from "./components/PersonalContact";
import { Button, IconButton } from "@mui/material";
import { CloudDownload, Mail } from "@mui/icons-material";

const App = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      console.log("Browser doesn't support speech recognition.");
    }
  }, [browserSupportsSpeechRecognition]);

  const particlesInit = useCallback(async (engine: Engine) => {
    // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(
    async (container: Container | undefined) => {},
    [],
  );

  const conversation = new Message(constants);

  const [messages, setMessages] = useState<any[]>([]);

  const msg = new SpeechSynthesisUtterance();

  const handleAddChatToList = useCallback(
    (text: string) => {
      setMessages((messages: any) => [
        ...messages,
        {
          avatar: "/you.png",
          alt: "kursat_avatar",
          title: "You",
          subtitle: text,
        } as IChatItemProps,
      ]);

      let correction = new Promise<string>((resolve) => resolve(text));
      correction.then(async (correction) => {
        const prompt = conversation.get_prompt(correction).trim();
        const response = await fetch("https://api.openai.com/v1/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer " +
              String("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"),
          },
          body: JSON.stringify({
            model: "davinci:ft-personal-2023-02-27-15-49-11",
            prompt: prompt,
            stop: constants["USER_PREFIX"].trim(),
            max_tokens: constants["MAX_TOKENS"],
            frequency_penalty: constants["FREQUENCY_PENALTY"],
            presence_penalty: constants["PRESENCE_PENALTY"],
          }),
        });

        const data = await response.json();
        const random = Math.floor(Math.random() * data.choices.length);
        const resMessage = data.choices[random].text;
        conversation.set_completion(resMessage ?? "");
        msg.text = resMessage ?? "";
        window.speechSynthesis.speak(msg);
        setMessages((messages: any) => [
          ...messages,
          {
            avatar: "/guru.png",
            alt: "kursat_avatar",
            title: "Guru",
            subtitle: resMessage ?? "",
          } as IChatItemProps,
        ]);
      });
    },
    [messages],
  );

  const handleStartListening = useCallback(() => {
    SpeechRecognition.startListening();
  }, [SpeechRecognition]);

  const handleStopListening = useCallback(() => {
    SpeechRecognition.stopListening();
  }, [SpeechRecognition]);

  const onOpenCV = useCallback(() => {
    const link = document.createElement("a");
    link.href = "/files/CV.pdf";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.click();
  }, []);

  const onSendMail = useCallback(() => {
    const link = document.createElement("a");
    link.href = "mailto:smartguru478@gmail.com";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.click();
  }, []);

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "absolute"
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            backgroundImage: 'url("/images/back.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(8px)",
            zIndex: "-1",
          }}
        ></div>
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            backgroundColor: "#0d063a6b",
          }}
        ></div>
        <ChatBox
          submitText={handleAddChatToList}
          handleStartListening={handleStartListening}
          handleStopListening={handleStopListening}
          listening={listening}
          transcript={transcript}
          resetTranscript={resetTranscript}
        />
        <Grid
          container
          sx={{ bottom: "120px", position: "absolute" }}
          alignItems="center"
          justifyContent="center"
        >
          <Grid
            item
            xs={6}
            sx={{
              height: "300px",
              overflow: "auto",
              display: "flex",
              flexDirection: "column-reverse",
            }}
          >
            <ChatList
              id="chat-list"
              lazyLoadingImage="Loading"
              className="chat-list"
              dataSource={messages}
            />
          </Grid>
        </Grid>
        <PersonalContact />
        <div style={{ textAlign: "center", marginTop: "30vh" }}>
          <h2 style={{ marginBottom: "0px" }}>Senior Software Engineer</h2>
          <h1
            style={{
              fontSize: "100px",
              color: "#db6d4d",
              fontFamily: "cursive",
              marginTop: "0px",
              marginBottom: "0px",
              WebkitTextStroke: "2px black",
            }}
          >
            Steven Yuan
          </h1>
          <h5>I'm ready to start everything. Nothing is impossible for me.</h5>
          <div>
            <IconButton
              size="large"
              aria-label="cv"
              title="Open CV"
              onClick={onOpenCV}
            >
              <CloudDownload />
            </IconButton>
            <IconButton
              size="large"
              aria-label="mail"
              title="Send mail"
              onClick={onSendMail}
            >
              <Mail />
            </IconButton>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "100px",
            overflow: "hidden",
            height: "1.5rem",
            color: "#ffffff2b",
          }}
        >
          C++ | C# | Python | Node.js | TypeScript | React | Express | Nest.js |
          Machine Learning | NLP | Tensorflow | PyTorch | AWS | Digital Ocean |
          Azure | Git | C++ | C# | Python | Node.js | TypeScript | React |
          Express | Nest.js | Machine Learning | NLP | Tensorflow | PyTorch |
          AWS | Digital Ocean | Azure | Git | C++ | C# | Python | Node.js |
          TypeScript | React | Express | Nest.js | Machine Learning | NLP |
          Tensorflow | PyTorch | AWS | Digital Ocean | Azure | Git | C++ | C# |
          Python | Node.js | TypeScript | React | Express | Nest.js | Machine
          Learning | NLP | Tensorflow | PyTorch | AWS | Digital Ocean | Azure |
          Git
        </div>
      </div>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 120,
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 100,
              enable: true,
              opacity: 0.3,
              width: 0.5,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: true,
              speed: 2,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 1000,
              },
              value: 80,
            },
            opacity: {
              value: 0.3,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
      />
    </>
  );
};

export default App;
