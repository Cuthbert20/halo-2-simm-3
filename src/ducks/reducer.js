//setting up inialState
const initialState = {
    username: '',
    user_id: '',
    user_image: ''
}

//action types
const DISPLAY_USER = 'DISPLAY_USER'
const UPDATE_USER = 'UPDATE_USER'

//action builders
export function displayUser(user_id, username, user_image){
    return {
        type: DISPLAY_USER,
        payload: {
            user_id,
            username,
            user_image
        }
    }
}
export function updateUser(username, user_image){
    return {
        type: UPDATE_USER,
        payload: {
            username,
            user_image
        }
    }
}

//reducer
export default (state = initialState, action) => {
    const {type, payload} = action
    switch(type){
        case DISPLAY_USER:
            const { username, user_id, user_image } = payload
            return{...state, user_id, username, user_image}
        case UPDATE_USER:
            // const { username, user_image } = payload
            return{...state, username, user_image }
        default:
            return state
    }
}