import React, { useContext, useEffect } from 'react'
import Question from './Question'
import { QuestionGlobalContext} from '../../../context/questionContext/QuestionState'
import { useHistory } from 'react-router'


const QuestionsGrid = () => {
        const history = useHistory()
    const context = useContext(QuestionGlobalContext)
    const {GetAllQuestions,questions } = context

    useEffect(() => {
        GetAllQuestions()
    }, [])
    const goToQuestions = () => {
        history.push('/questions')
    }

    while (questions === null) {
        return (
            <h1>Loading..</h1>
        )
    }
    return (
        <div style={{paddingTop:'8%'}}>
            <h2>Questions</h2>
        <div className="questions-grid-container">
                {
                    questions === [] ? (<h2>No questions to be found..</h2>) : (
                        questions.slice(0,2).map((question) => {
                            return (<Question key={question.id}
                                date={question.date}
                                text={question.text}
                                subject={question.subject}
                                views={question.views}
                                id={question.id}
                            />)
                        }   
                        )
                    )
            }
            
            </div>

            <button onClick={goToQuestions}>More</button>
        </div>
    )
}

export default QuestionsGrid