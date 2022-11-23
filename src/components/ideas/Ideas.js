import Challenges from "./challenges/challenges";
import ideacss from "./ideas.css";
import { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
const Ideas = (props) => {
  const [toggle, setToggle] = useState(true);
  const [sortByVote, setSortByVote] = useState(true);
  const [sortByDate, setSortByDate] = useState(true);
  const [hackdata, setHackdata] = useState([]);
  const [sortedData, setsortedData] = useState([]);
  const [lastSort, setlastSort] = useState();
  const dispatch = useDispatch();
  const allHacks = useSelector((state) => state.hacks);
  const { user } = props;
  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("AllHacks")) || [];
    dispatch({ type: "GET_ALL_HACKS", data });
  }, []);
  useEffect(() => {
    setHackdata(allHacks);
    if (toggle) {
      if (lastSort?.name == "vote") {
        sortVote(lastSort.flag, allHacks);
      } else if (lastSort?.date == "vote") {
        sortDate(lastSort.flag, allHacks);
      } else {
        setsortedData(allHacks);
      }
    } else {
      const filtered = allHacks.filter((ch) => ch.userId == user.id);
      if (lastSort?.name == "vote") {
        sortVote(lastSort.flag, filtered);
      } else if (lastSort?.date == "vote") {
        sortDate(lastSort.flag, filtered);
      } else {
        setsortedData(filtered);
      }
    }
  }, [allHacks]);
  const sortByDateFn = (flag) => {
    setSortByDate((prev) => {
      return !prev;
    });
    setlastSort({ name: "date", flag });
    sortDate(flag, sortedData);
  };
  const sortDate = (flag, dataset) => {
    let data = [...dataset];
    if (flag) {
      data.sort((a, b) => a.creationDate - b.creationDate);
    } else {
      data.sort((a, b) => b.creationDate - a.creationDate);
    }
    setsortedData(data);
  };
  const sortByVoteFn = (flag) => {
    setSortByVote((prev) => {
      return !prev;
    });
    setlastSort({ name: "vote", flag });
    sortVote(flag, sortedData);
  };
  const sortVote = (flag, datset) => {
    let data = [...datset];
    if (flag) {
      data.sort((a, b) => a.votedList.length - b.votedList.length);
    } else {
      data.sort((a, b) => b.votedList.length - a.votedList.length);
    }
    setsortedData(data);
  };
  const toggleData = (flag) => {
    setToggle((prev) => {
      return !prev;
    });
    if (!flag) {
      if (lastSort?.name == "vote") {
        sortVote(lastSort.flag, allHacks);
      } else if (lastSort?.date == "vote") {
        sortDate(lastSort.flag, allHacks);
      } else {
        setsortedData(allHacks);
      }
    } else {
      const filtered = hackdata.filter((ch) => ch.userId == user.id);
      if (lastSort?.name == "vote") {
        sortVote(lastSort.flag, filtered);
      } else if (lastSort?.date == "vote") {
        sortDate(lastSort.flag, filtered);
      } else {
        setsortedData(filtered);
      }
    }
  };
  const upVote = (challenge, vote) => {
    dispatch({ type: "ADD_VOTE", data: { challenge, vote, user } });
  };
  return (
    <div className={ideacss.challenges}>
      <h2>{toggle ? "All Challenges" : "My Challenges"}</h2>
      <Button
        size="small"
        data-testid="toggle-challenges"
        color="secondary"
        disabled={false}
        variant="outlined"
        style={{ marginTop: "15px" }}
        onClick={toggleData.bind(this, toggle)}
      >
        {!toggle ? "View All Challenges" : "View My Challenges"}
      </Button>
      <Button
        disabled={!sortedData.length}
        color="primary"
        size="small"
        variant="contained"
        style={{ marginTop: "15px", marginLeft: "15px" }}
        onClick={sortByDateFn.bind(this, sortByDate)}
      >
        {sortByDate ? "SortBy Date (ASC)" : "SortBy Date (DSC)"}
      </Button>
      <Button
        disabled={!sortedData.length}
        color="primary"
        size="small"
        variant="contained"
        style={{ marginTop: "15px", marginLeft: "15px" }}
        onClick={sortByVoteFn.bind(this, sortByVote)}
      >
        {sortByVote ? "SortBy Vote (ASC)" : "SortBy Vote (DSC)"}
      </Button>
      {!sortedData.length ? (
        <p style={{ textAlign: "center", marginTop: "90px" }}>
          No Challenges Available
        </p>
      ) : (
        ""
      )}
      {
        <Challenges
          hackdata={sortedData}
          user={user}
          upVote={upVote}
        ></Challenges>
      }
    </div>
  );
};

export default Ideas;
