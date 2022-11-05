import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Word } from '../types/types'

export const wordsAPI = createApi({
    reducerPath: 'wordsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3002/words',
        prepareHeaders: (headers: Headers) => {
            headers.set('Authorization', `Bearer Ara`)
            return headers
        }
    }),
    tagTypes: ['words'],
    endpoints: (builder) => ({
        getAllWords: builder.query<Word[], void>({
            query: () =>  `/`,
            providesTags: (result) =>
                result
                ? [
                    ...result.map(({ id }: any) => ({ type: 'words' as const, id })),
                    { type: 'words', id: 'LIST' },
                    ]
                : [{ type: 'words', id: 'LIST' }],  
                transformResponse: (resp: Word[]) => resp.sort((a: Word, b: Word) => a.id - b.id)
        }),
        getWordsByGroup: builder.query<Word[], number>({
            query: (group) =>  `/group/${group}`,
            providesTags: (result) =>
                result
                ? [
                    ...result.map(({ id }: any) => ({ type: 'words' as const, id })),
                    { type: 'words', id: 'LIST' },
                    ]
                : [{ type: 'words', id: 'LIST' }],
        }),
        setWord: builder.mutation<number, any>({ //Надо установить npm install --save @types/formdata
            query: (body) => ({
                url: `/`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['words']
        }),
        putWord: builder.mutation<void, any>({
            query: (body) => ({
                url: `/`,
                method: 'PUT',
                body
            }),
            invalidatesTags: ['words']
        }),
        deleteWord: builder.mutation<void, number>({
            query: (id) => ({
                url: `/`,
                method: 'DELETE',
                body: {id}
            }),
            invalidatesTags: ['words']
        })
    })
})

export const { useGetAllWordsQuery, useSetWordMutation, useGetWordsByGroupQuery, usePutWordMutation, useDeleteWordMutation } = wordsAPI