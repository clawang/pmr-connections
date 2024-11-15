'use client'
import { useState } from 'react';
import Image from 'next/image';
import Connections from './components/connections';
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
        <div className="App">
            <div className="header">
                <Image src="/logo.png" width={100} height={60} alt="Payne Mitchell Ramsey Law Group" />
                {started ?
                    <Image src="/help.png" width={40} height={54} alt="Help" id="gift" onClick={() => setPopup(2)} />
                    :
                    <></>
                }
            </div>
            <div className="game-wrapper">
                {started ?
                    <Connections gameData={data} popup={popup} setPopup={setPopup} />
                    :
                    <div className="start-screen">
                        <div className="start-text">
                            <Image src="/gift.png" width={80} height={107} alt="gift" />
                            <h1>Holiday Connections</h1>
                            <p>Group words that share a common thread.</p>
                            <p>Can you spot the connections?</p>
                            <button onClick={transition}>PLAY</button>
                        </div>
                        <div className="info-wrapper">
                            <p>Each connection you make helps give back to the Legal Aid of NorthWest Texas, ensuring access to justice for individuals and communities in need.</p>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default App;
