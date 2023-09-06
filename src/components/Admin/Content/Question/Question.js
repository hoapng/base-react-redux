import { useState } from 'react'
import './Question.scss'
import Select from 'react-select'
import { GrAddCircle } from 'react-icons/gr';
import { HiMinusCircle } from 'react-icons/hi'
import { BiImageAdd } from 'react-icons/bi'
import { v4 as uuidv4 } from 'uuid';
import _ from "lodash"

const Question = (props) => {

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]

    const [selectedQuiz, setSelectedQuiz] = useState({})

    const [questions, setQuestions] = useState([
        {
            id: uuidv4(),
            description: 'description 1',
            imageFile: '',
            imageName: '',
            answers: [
                {
                    id: uuidv4(),
                    description: 'answer 1',
                    isCorrect: false
                },
            ]
        }
    ])

    const handleAddRemoveQuestion = (type, id) => {
        if (type === 'ADD') {
            const newQuestion = {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false
                    },
                ]
            }
            setQuestions([...questions, newQuestion])
        }
        if (type === 'REMOVE') {
            let questionsCLone = _.cloneDeep(questions);
            questionsCLone = questionsCLone.filter(item => item.id !== id)
            setQuestions(questionsCLone)
        }
    }

    const handleAddRemoveAnswer = (type, questionId, answerId) => {
        let questionsCLone = _.cloneDeep(questions);
        if (type === 'ADD') {
            const newAnswer = {
                id: uuidv4(),
                description: '',
                isCorrect: false
            }
            let index = questionsCLone.findIndex(item => item.id === questionId)
            questionsCLone[index].answers.push(newAnswer)
            setQuestions(questionsCLone)
        }
        if (type === 'REMOVE') {
            let index = questionsCLone.findIndex(item => item.id === questionId)
            questionsCLone[index].answers = questionsCLone[index].answers.filter(item => item.id !== answerId)
            setQuestions(questionsCLone)
        }
    }

    console.log("questions", questions)
    return (
        <div className='questions-container'>
            <div className='title'>
                Mange Question
            </div>
            <hr />
            <div className='add-new-question'>
                <div className='col-6 form-group'>
                    <label className='mb-2'>Select Quiz:</label>
                    <Select
                        defaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={options}
                    />
                </div>
                <div className='mt-3 mb-2'>
                    Add question:
                </div>
                {questions && questions.length > 0 && questions.map((question, index) => {
                    return (
                        <div className='q-main mb-4' key={question.id}>
                            <div className='questions-content'>
                                <div className='form-floating description'>
                                    <input
                                        type='type'
                                        className='form-control'
                                        value={question.description}></input>
                                    <label>Question {index + 1} Description</label>
                                </div>
                                <div className='group-upload'>
                                    <BiImageAdd className='label-up'></BiImageAdd>
                                    <input type={'file'} hidden></input>
                                    <span>No file</span>
                                </div>
                                <div className='btn-add'>
                                    <span onClick={() => handleAddRemoveQuestion("ADD", '')}>
                                        <GrAddCircle className='icon-add' />
                                    </span>
                                    {questions.length > 1 &&
                                        <span onClick={() => handleAddRemoveQuestion("REMOVE", question.id)}>
                                            <HiMinusCircle className='icon-remove' />
                                        </span>}
                                </div>
                            </div>
                            {question.answers && question.answers.length > 0 && question.answers.map((answer, index) => {
                                return (
                                    <div key={answer.id} className='answers-content'>
                                        <input
                                            className='form-check-input iscorrect'
                                            type='checkbox'
                                        />
                                        <div className='form-floating description'>
                                            <input type='type' className='form-control' value={answer.description}></input>
                                            <label>Answers {index + 1}</label>
                                        </div>
                                        <div className='btn-group'>
                                            <span onClick={() => handleAddRemoveAnswer("ADD", question.id)}>
                                                <GrAddCircle className='icon-add' />
                                            </span>
                                            {question.answers.length > 1 &&
                                                <span onClick={() => handleAddRemoveAnswer("REMOVE", question.id, answer.id)}>
                                                    <HiMinusCircle className='icon-remove' />
                                                </span>}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default Question