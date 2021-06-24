import Head from "next/head";

import Modal from "../components/shared/Modal";
import FirstStep from "../components/FirstStep";
import SecondStep from "../components/SecondStep";
import ThirdStep from "../components/ThirdStep";
import { useRecoilValue } from "recoil";
import { coffeeClassifiedAtom } from "../atoms/coffeeClassifiedAtom";
import { useState } from "react";
import { viewAtom } from "../atoms/viewAtom";

export default function Home() {
  const coffeeState = useRecoilValue(coffeeClassifiedAtom);
  const [isOpen, setIsOpen] = useState(false);
  const view = useRecoilValue(viewAtom);

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
          className="p-3 m-3 bg-yellow-800 text-white rounded"
          onClick={() => setIsOpen((isOpen) => !isOpen)}
        >
          Add Your Coffee!
        </button>
        <Modal handleClose={() => setIsOpen(false)} isOpen={isOpen}>
          {modalPageMap[view]}
        </Modal>

        <pre>{JSON.stringify(coffeeState, null, 2)}</pre>
      </main>
    </div>
  );
}
