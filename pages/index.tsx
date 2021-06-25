import Head from "next/head";
import Modal from "../components/shared/Modal";
import FirstStep from "../components/FirstStep";
import SecondStep from "../components/SecondStep";
import ThirdStep from "../components/ThirdStep";
import { useRecoilState, useRecoilValue } from "recoil";
import { viewAtom } from "../atoms/viewAtom";
import { modalAtom } from "../atoms/modalAtom";
import Listing from "../components/Listing";
import { completedAtom } from "../atoms/completedAtom";

export default function Home() {
  const view = useRecoilValue(viewAtom);
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalAtom);
  const isCompleted = useRecoilValue(completedAtom);

  const modalPageMap = {
    firstPage: <FirstStep />,
    secondPage: <SecondStep />,
    thirdPage: <ThirdStep />,
  };

  return (
    <div>
      <Head>
        <title>Sell Your Coffee</title>
        <meta name="description" content="Gotta sell that coffee" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <button
          className="p-3 m-3 bg-yellow-800 text-white rounded transition duration-200 ease-in-out transform hover:scale-110"
          onClick={() => setIsModalOpen((isOpen) => !isOpen)}
        >
          {isCompleted ? "Edit" : "Add"} Your Coffee!
        </button>
        <Modal handleClose={() => setIsModalOpen(false)} isOpen={isModalOpen}>
          {modalPageMap[view]}
        </Modal>
        {isCompleted && <Listing />}
      </main>
    </div>
  );
}
