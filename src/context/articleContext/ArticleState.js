import React, { createContext, useReducer } from 'react'
import ArticleReducer from './ArticleReducer'
import axios from 'axios'



const intialState = { article: null,articles:null,articleCounter:null }

export const ArticleGlobalContext = createContext(intialState);

export const ArticleGlobalProvider = ({ children }) => {

    const [state, dispatch] = useReducer(ArticleReducer, intialState)

    const AddArticle = (articleData) => {
        axios.post('/api/article/save', articleData, {
            headers: {
            "x-access-token":localStorage.getItem('jwtToken')
            }
        }
        ).then((res) => {
            dispatch({
                type: 'ADD_ARTICLE',
                payload:res.data
            })
        }).catch((err) => {
            throw err
        })
    }

    const GetAllArticles = () => {
        axios.get('/api/article/findAll').then((res) => {
            dispatch({
                type: 'GET_ALL_ARTICLES',
                //check if payload is res or res.data
                payload:res.data
                
            })
        }).catch((err) => {
            throw err
        })
    }

    const GetArticleById = (articleId) => {
        axios.get(`/api/article/findById/${articleId}`).then((res) => {
            console.log(res.data);
            dispatch({
                type: 'GET_ARTICLE_BY_ID',
                payload:res.data
            })
        }).catch((err) => {
            throw err
        })
    }

    const CountArticles = () => {
        axios.get('/api/article/count').then(res => {
            dispatch({
                type: 'GET_ARTICLES_COUNT',
                payload:res.data
            })
        }).catch((err) => {
            throw err
        })
    }

    const DeleteArticleById = (articleId) => {
        axios.delete(`/api/article/deleteById/${articleId}`).then((res) => {
            dispatch({
                type: 'DELETE_ARTICLE_BY_ID',
                payload:res.data
            })
        }).catch((err) => {
            throw err
        })
    }


    const DeleteAllArticles = () => {
        axios.delete(`/api/article/deleteAll`).then((res) => {
            dispatch({
                type: 'DELETE_ALL_ARTICLES',
                payload:res.data
            })
        }).catch((err) => {
            throw err
        })
    }

    



    return (<ArticleGlobalContext.Provider
        value={{
            article: state.article,
            articles: state.articles,
            articlesCounter: state.articlesCounter,
            

            AddArticle,
            GetAllArticles,
            GetArticleById,
            CountArticles,
            DeleteAllArticles,
            DeleteArticleById
        }}
    >
        {children}
            </ArticleGlobalContext.Provider>)


}

