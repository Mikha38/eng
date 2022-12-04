import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Text, TextTitle } from '../types/types'

// добавить пагинацию
export const getAllGlobalTextsTitlesThunk = createAsyncThunk<TextTitle[]>(
    'Thunk: getAllGlobalTextTitles',
    async function() {
        const response = await fetch(`http://localhost:3002/texts/titles-with-refs`)
        const data = await response.json()
        return data
    }
)
export const textsSlice = createSlice<TextTitle[], {}>({
    name: 'textsSlice',
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllGlobalTextsTitlesThunk.fulfilled, (_, action) => action.payload)
        builder.addCase(getAllGlobalTextsTitlesThunk.rejected, (_, __) => [])
    }
})
export const getOneTextThunk = createAsyncThunk<Text, number | string>(
    'Thunk: getOneText',
    async function(id) {
        const response = await fetch(`http://localhost:3002/texts/${id}`)
        const data = await response.json()
        return data
    }
)
const oneTextInitialState: Text = {
    id: 0,
    title: 'Загрузка',
    img: 'Loading.jpg',
    text_body: '',
    content_references: null
}
const oneTextErrorState: Text = {
    id: 0,
    title: 'Ошибка!',
    img: 'Error.jpg',
    text_body: 'Вероятно это на стороне сервера...',
    content_references: null
}
export const oneTextSlice = createSlice<Text, {}>({
    name: 'oneTextSlice',
    initialState: oneTextInitialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getOneTextThunk.pending, (_, __) => oneTextInitialState)
        builder.addCase(getOneTextThunk.fulfilled, (_, action) => action.payload)
        builder.addCase(getOneTextThunk.rejected, (_, __) => oneTextErrorState)
    }
})