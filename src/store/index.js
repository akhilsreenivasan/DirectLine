import { createStore } from "redux";
export const initialState = {
    user: [],
    hacks: []
}
export const hackIdeas = (state = initialState, action) => {
    let { hacks } = state;
    switch (action.type) {
        case 'SAVE_USER_DATA':
            return Object.assign({}, state, { user: action.data });
        case 'CLEAR_USER_DATA':
            return Object.assign({}, state, { user: [] });
        case 'GET_ALL_HACKS':
            return Object.assign({}, state, { hacks: action.data });
        case 'ADD_NEW_CHALLENGE':
            localStorage.setItem('AllHacks', JSON.stringify([...hacks, action.data]));
            return Object.assign({}, state, { hacks: [...hacks, action.data] });
        case 'ADD_VOTE':
            let data = [...hacks];
            let index = data.indexOf(action.data.challenge);
            let { user } = action.data;
            if (!action.data.vote) {
                data[index].votedList.push(user.id);
                localStorage.setItem('AllHacks', JSON.stringify(data));
                return Object.assign({}, state, { hacks: data });
            } else {
                let index1 = data[index].votedList.indexOf(user.id);
                data[index].votedList.splice(index1, 1);
                localStorage.setItem('AllHacks', JSON.stringify(data));
                return Object.assign({}, state, { hacks: data });
            }
    }
    return state;
}
const store = createStore(hackIdeas);

export default store;