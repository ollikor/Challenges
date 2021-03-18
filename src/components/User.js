import { useEffect, useState } from "react";
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";

import { Challenge } from './Challenge';
import { Card } from './Card';
import { Loader } from './Loader';

export function User() {

    const [challenges, setChallenges] = useState(null);
    const [challenge, showChallenge] = useState(false);
    const [title, setTitle] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [loader, showLoader] = useState(false);

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        showLoader(true);
        const challenges = await API.graphql({ query: queries.listChallenges });
        setChallenges(challenges);
        showLoader(false);
    }

    async function saveChallenge() {
        if (title !== "") {
            let dateString;
            let newStartDate;
            const date = new Date();
            if (startDate !== null) {
                newStartDate = new Date(startDate);
                dateString = `${newStartDate.getDate()}.${newStartDate.getMonth()}.${newStartDate.getFullYear()}`
            } else {
                newStartDate = new Date();
                dateString = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
            }
            try {
                const challenge = {
                    title: title,
                    startDate: newStartDate,
                    startDateString: dateString,
                    days: 0
                }
                await API.graphql(graphqlOperation(
                    mutations.createChallenge,
                    { input: challenge }
                ));
                getData();
                showChallenge(false);
            } catch (error) {
                console.log(error);
            }
            setTitle('');
            setStartDate(null)
        }
    }

    return (
        <div>
            <div className="User-container">
                
                {loader ? 
                <Loader /> :
                challenges !== null
                    && challenges.data.listChallenges.items.length > 0
                    ? challenges.data.listChallenges.items.map((item, index) => (
                        <Card
                            key={index}
                            index={index}
                            id={item.id}
                            title={item.title}
                            startDate={item.startDate}
                            startDateString={item.startDateString}
                            lastLoggedDate={item.updatedAt}
                            value={item.days}
                            refresh={() => getData()}
                        />
                    ))
                    :
                    <div>
                        <h3>No challenges</h3>
                        <p>Press Plus-button on the bottom of the screen to create a new challenge</p>
                    </div>}
            </div>
            <div className="Add-challenge-container">
                {challenge ? (
                    <Challenge
                        saveChallenge={() => saveChallenge()}
                        setTitle={(value) => setTitle(value)}
                        setStartDate={(value) => setStartDate(value)}
                    />
                ) : null}
                <button
                    type="button"
                    className="Plus-button"
                    onClick={() => showChallenge(!challenge)}
                >
                    {challenge === true ?
                        <FontAwesomeIcon icon={faTimes} />
                        :
                        <FontAwesomeIcon icon={faPlus} />
                    }
                </button>
            </div>
        </div>
    );
}