import { useState } from 'react';
import { default as NextImage } from 'next/image';
import { addShare } from '../../firebase/firebase';

function PopUp({ popup, setPopup }: {
    popup: number,
    setPopup: (popup: number) => void,
}) {
    const [buttonState, setButtonState] = useState<number>(0);

    const sendShare = () => {
        addShare(new Date());
        const text = "https://pmr-connections.vercel.app/";
        navigator.clipboard.writeText(text);
        setButtonState(1);
        setTimeout(() => setButtonState(0), 1000);
    }

    return (
        <div id="popup" className={popup > 0 ? "show" : ""}>
            <div id="popup-content">
                <div className="close-x" onClick={() => setPopup(0)}></div>
                {popup === 1 ?
                    <>
                        <NextImage src="/gift.png" width={80} height={107} alt="Gift" />
                        <h2>Happy Holidays!</h2>
                        <div className="popup-paragraph">
                            <p>Thanks for playing!</p>
                            <p>Let's keep the connections going this holiday season.</p>
                        </div>
                        <button onClick={sendShare} id="first-share">{buttonState === 0 ? "Invite others to Play" : "Copied to Clipboard"}</button>
                    </>
                    :
                    <div className="instructions">
                        <h3>How to Play</h3>
                        <p>Find groups of four items that share something in common.</p>
                        <ul>
                            <li>Select four items and tap ‘Submit’ to check if your guess is correct.</li>
                            <li>Find the groups without making 4 mistakes!</li>
                        </ul>
                        <h4>Category Examples</h4>
                        <p>FISH: Bass, Flounder, Salmon, Trout</p>
                        <p>FIRE ___: Ant, Drill, Island, Opal</p>
                        <p>Categories will always be more specific than “Names,” “Verbs” or “5-Letter-Words.”</p>
                        <br/>
                        <p>Each puzzle has exactly one solution. Watch out for words that seem to belong to multiple categories!</p>
                    </div>
                }
            </div>
        </div>
    );
}

export default PopUp;