import SideBar from "./components/SideBar";
import Header from "./components/Header";
import TranscribePage from "./api/transcribe/TranscribePage";
export default function Home() {
  return (
    <>
      <SideBar />
      <Header />
      <div>
        <main
          className="main-content"
          style={{
            paddingTop: "10rem",
          }}
        >
          <TranscribePage />
        </main>
      </div>
    </>
  );
}
