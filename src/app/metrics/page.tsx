'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getMetrics } from '../../firebase/firebase';
import '../App.scss';

function App() {
    const [authenticated, setAuth] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");
    const [metrics, setMetrics] = useState<any>(null);
    const [visitors, setVisitors] = useState(-1);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        if (!metrics) {
            getData();
        }
        if (!visitors || visitors < 0) {
            fetch('https://plausible.io/api/v2/query', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.NEXT_PUBLIC_PLAUSIBLE_KEY}`,
                },
                body: JSON.stringify({
                    "site_id": "pmr-connections.vercel.app",
                    "metrics": ["visitors"],
                    "date_range": "all",
                })
            })
                .then((response) => response.json())
                .then((body) => {
                    const data = body as any;
                    // console.log(data.results?.[0]?.metrics?.[0]);
                    if (data.results?.[0]?.metrics?.[0]) {
                        setVisitors(data.results[0].metrics[0]);
                    }
                });
        }
    }, []);

    const getData = async () => {
        const tempMetrics = await getMetrics();
        if (tempMetrics) {
            setMetrics(tempMetrics);
        }
    }

    const submit = () => {
        if (password === "jinglebells") {
            setAuth(true);
        } else {
            setError(true);
        }
    }

    return (
        <div className="App">
            <div className="header">
                <Image src="/logo.png" width={100} height={60} alt="Payne Mitchell Ramsey Law Group" />
            </div>
            <div className="screen">
                {authenticated ?
                    <>
                        <h1>Metrics</h1>
                        {metrics ?
                            <div className="metrics-wrapper">
                                <div className="table">
                                    <div className="table-column">
                                        <div className="table-cell heading">Total Plays</div>
                                        <div className="table-cell">{metrics.count}</div>
                                    </div>
                                    <div className="table-column">
                                        <div className="table-cell heading">Total Games Won</div>
                                        <div className="table-cell">{metrics.hasWon}</div>
                                    </div>
                                    <div className="table-column">
                                        <div className="table-cell heading">Total Unique Players</div>
                                        <div className="table-cell">{visitors}</div>
                                    </div>
                                    <div className="table-column">
                                        <div className="table-cell heading">Average Mistakes</div>
                                        <div className="table-cell">{metrics.mistakes.toFixed(2)}</div>
                                    </div>
                                    <div className="table-column">
                                        <div className="table-cell heading">Number of shares</div>
                                        <div className="table-cell">{metrics.shareCount}</div>
                                    </div>
                                </div>
                            </div>
                            :
                            <>Loading...</>
                        }
                    </>
                    :
                    <div className="password-screen">
                        <h2>Enter password to view metrics</h2>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button onClick={submit}>Submit</button>
                        {
                            error ?
                                <p className="error">Incorrect password.</p>
                                :
                                <></>
                        }
                    </div>
                }
            </div>
        </div>
    );
}

export default App;
