import { Fragment} from "react";
import './challenges.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

const Challenges = (props) => {
    const upVote = (challenge, vote) => {
        props.upVote(challenge, vote);
    }
    return (
        <Fragment>
            <div className="challenge">
                {(props.hackdata || []).map((challenge) => {
                    return (
                        <div className="items" key={challenge.id}>
                            <h2>{challenge.title}</h2>
                            <div style={{ padding: '15px' }}>
                                <p>{challenge.description}</p>
                                {challenge.tags.length ? <div style={{ marginBottom: '15px', marginBottom: '5px', display: 'flex', flexWrap: 'wrap' }}>
                                    {(challenge.tags || []).map((tag) => <span key={tag} className="tags">{tag}</span>)}
                                </div> : ''}
                                <div>CreatedBy: {challenge.userName}</div>
                                <span>Date: {new Date(challenge.creationDate).toLocaleString()}</span>
                                <div onClick={upVote.bind(this, challenge, challenge.votedList.indexOf(props.user.id) >= 0)} className={`font ${challenge.votedList.indexOf(props.user.id) >= 0 ? 'active' : ''}`}><FontAwesomeIcon icon={faThumbsUp} /> {challenge.votedList.length}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </Fragment>
    )
}

export default Challenges;