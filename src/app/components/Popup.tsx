import { useState } from 'react';
import { GameItem } from '../types';
import shareImage from '../assets/share-image.png';
import {default as NextImage, StaticImageData} from 'next/image';

function PopUp({ popup, setPopup }: {
    popup: number,
    setPopup: (popup: number) => void,
}) {
    const [buttonState, setButtonState] = useState<number>(0);

    const startShare = async () => {
        imageToBlob(shareImage, share);
    }

    const imageToBlob = (image: StaticImageData, sharingFunction: (blob: Blob) => void) => {
        const c = document.createElement("canvas");
        const ctx = c.getContext("2d");
        c.width = image.width;     // update canvas size to match image
        c.height = image.height;
        const imageToDraw = new Image();
        imageToDraw.src = image.src;
        ctx!.drawImage(document.getElementById("share-image") as HTMLImageElement, 0, 0);       // draw in image
        c.toBlob(function (blob) {        // get content as JPEG blob
            // here the image is a blob
            sharingFunction(blob!);
        }, "image/jpeg", 0.75);
    }

    const share = (blob: BlobPart) => {
        let text = "Connections: PMR\n";
        const files = [new File([blob], "PMR-Connections.jpeg", { type: "image/jpeg" })];
        if (navigator.share && navigator.canShare({ files })) {
            navigator.share({ files });
        } else {
            navigator.clipboard.writeText(text);
            setButtonState(1);
            setTimeout(() => setButtonState(0), 1000);
        }
    }

    return (
        <div id="popup" className={popup > 0 ? "show" : ""}>
            <div id="popup-content">
                <div className="close-x" onClick={() => setPopup(0)}></div>
                {popup === 1 ?
                    <>
                        <NextImage src="/gift.png" width={80} height={107} alt="Gift" />
                        <h2>Cheers!</h2>
                        <p>How'd you do?</p>
                        <p>Share to your stories to invite others to play!</p>
                        <img src={shareImage.src} id="share-image" />
                        <button onClick={startShare}>{buttonState === 0 ? "Share Your Results" : "Copied to Clipboard"}</button>
                    </>
                    :
                    <div className="instructions">
                        <h3>How to Play</h3>
                        <p>Find groups of four items that share something in common.</p>
                        <ul>
                            <li>Select four items and tap 'Submit' to check if your guess is correct.</li>
                            <li>Find the groups without making 4 mistakes!</li>
                        </ul>
                        <h4>Category Examples</h4>
                        <p>FISH: Bass, Flounder, Salmon, Trout</p>
                        <p>FIRE ___: Ant, Drill, Island, Opal</p>
                        <p>Categories will always be more specific than "Names," "Verbs" or "5-Letter-Words."</p>
                        <p>Each puzzle has exactly one solution. Watch out for words that seem to belong to multiple categories!</p>
                    </div>
                }
            </div>
        </div>
    );
}

export default PopUp;