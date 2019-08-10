//setting up inialState
const initialState = {
    username: '',
    user_id: '',
    user_image: ''
}

//action types
const DISPLAY_USER = 'DISPLAY_USER'

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

//reducer
export default (state = initialState, action) => {
    const {type, payload} = action
    switch(type){
        case DISPLAY_USER:
            const { username, user_id, user_image } = payload
            return{...state, user_id, username, user_image}
        default:
            return state
    }
}