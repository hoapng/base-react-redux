import axios from '../utils/axiosCustomize';

const postCreatNewUser = (email, password, username, role, image) => {
    //submit data
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);
    return axios.post('api/v1/participant', data)
}

const getAllUsers = () => {
    return axios.get('api/v1/participant/all')
}

const putUpdateUser = (id, username, role, image) => {
    //submit data
    const data = new FormData();
    data.append('id', id);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);
    return axios.put('api/v1/participant', data)
}

const deleteUsers = (userId) => {
    return axios.delete('api/v1/participant', { data: { id: userId } })
}

const getUsersWithPaginate = (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`)
}

const postLogin = (email, password) => {
    return axios.post('api/v1/login',
        // { email, password }
        { email: email, password: password, delay: 1000 }
    )
}

const postRegister = (email, password, username) => {
    return axios.post('api/v1/register',
        { email, password, username }
        // {email: email, password: password}
    )
}

const getQuizByUser = () => {
    return axios.get('api/v1/quiz-by-participant')
}

const getDataQuiz = (id) => {
    return axios.get(`api/v1/questions-by-quiz?quizId=${id}`)
}

const postSubmitQuiz = (data) => {
    // console.log('data postSubmitQuiz', data)
    return axios.post('api/v1/quiz-submit', { ...data })
}

const postCreatNewQuiz = (description, name, difficulty, image) => {
    //submit data
    const data = new FormData();
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', image);
    return axios.post('api/v1/quiz', data)
}

const getAllQuizForAdmin = () => {
    return axios.get('api/v1/quiz/all')
}

const putUpdateQuizForAdmin = (id, description, name, difficulty, image) => {
    //submit data
    const data = new FormData();
    data.append('id', id);
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', image);
    return axios.put('api/v1/quiz', data)
}

const deleteQuizForAdmin = (id) => {
    return axios.delete(`api/v1/quiz/${id}`)
}

const postCreatNewQuestionForQuiz = (quiz_id, description, image) => {
    //submit data
    const data = new FormData();
    data.append('quiz_id', quiz_id);
    data.append('description', description);
    data.append('questionImage', image);
    return axios.post('api/v1/question', data)
}

const postCreatNewAnswerForQuestion = (description, correct_answer, question_id) => {
    //submit data
    return axios.post('api/v1/answer', { description, correct_answer, question_id })
}

export {
    postCreatNewUser,
    getAllUsers,
    putUpdateUser,
    deleteUsers,
    getUsersWithPaginate,
    postLogin,
    postRegister,
    getQuizByUser,
    getDataQuiz,
    postSubmitQuiz,
    postCreatNewQuiz,
    getAllQuizForAdmin,
    putUpdateQuizForAdmin,
    deleteQuizForAdmin,
    postCreatNewQuestionForQuiz,
    postCreatNewAnswerForQuestion
}