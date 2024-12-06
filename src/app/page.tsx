'use client'
import { useState } from 'react';
import Image from 'next/image';
import Connections from './components/connections';
import PlausibleProvider from 'next-plausible'
import './App.scss';

const data = {
    categories: [
        {
            level: 0,
            members: ["Brief", "Subpoena", "Suit", "Charge"],
            title: "Legal Documents"
        },
        {
            level: 1,
            members: ["Bell", "Nutcracker", "Garland", "Wreath"],
            title: "Holiday Decorations"
        },
        {
            level: 2,
            members: ["Judge", "Bailiff", "Witness", "Lawyer"],
            title: "People Found in a Courthouse"
        },
        {
            level: 3,
            members: ["Gingerbread", "Light", "Green", "Club"],
            title: "____ House"
        }
    ]
};

function App() {
    const [started, setStarted] = useState(false);
    const [popup, setPopup] = useState(0);

    const transition = () => {
        if (!document.startViewTransition) {
            setStarted(true);
            return;
        }

        document.startViewTransition(() => setStarted(true));
    }

    return (
        <PlausibleProvider domain="pmr-connections.vercel.app">
            <div className="App">
                <div className="header">
                    <Image src="/logo.png" width={100} height={60} alt="Payne Mitchell Ramsey Law Group" />
                    <Image src="/help.png" width={40} height={54} alt="Help" id="gift" onClick={() => setPopup(2)} />
                </div>
                <div className="game-wrapper">
                    <Connections gameData={data} popup={popup} setPopup={setPopup} />
                    <div className="start-screen">
                        <div className="info-wrapper">
                            <p>For every connection game successfully completed, Payne Mitchell Ramsey will donate to Legal Aid of NorthWest Texas. If you would like to further contribute to this cause, you can make a direct donation  <a href="https://legalaidtx.org/support-our-work/donate/" target="_blank">here</a>.</p>
                            {/* <p>Want to donate directly to legal aid?</p>
                            <a href="https://legalaidtx.org/support-our-work/donate/" target="_blank"><button className="donate-button">Donate Today</button></a> */}
                        </div>
                    </div>
                    {
                        // <div className="start-screen">
                        //     <div className="start-text">
                        //         <Image src="/gift.png" width={80} height={107} alt="gift" />
                        //         <h1>Holiday Connections</h1>
                        //         <p>Group words that share a common thread.</p>
                        //         <p>Can you spot the connections?</p>
                        //         <button onClick={transition}>PLAY</button>
                        //     </div>
                        //     <div className="info-wrapper">
                        //         <p>Each connection you make helps give back to the Legal Aid of NorthWest Texas, ensuring access to justice for individuals and communities in need.</p>
                        //         <p>Want to donate directly to legal aid?</p>
                        //         <a href="https://legalaidtx.org/support-our-work/donate/" target="_blank"><button className="donate-button">Donate Today</button></a>
                        //     </div>
                        // </div>
                    }
                </div>
            </div>
        </PlausibleProvider>
    );
}

export default App;
