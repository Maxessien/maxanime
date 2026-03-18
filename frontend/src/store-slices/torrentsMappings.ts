import { createSlice } from "@reduxjs/toolkit";

export interface TorrentMappings {
	res: string;
	magnet: string;
    title: string
}
const initialState: {[key: string]: TorrentMappings[]} = {}
const torrentMappingsSlice = createSlice({
    name: "torrentsMappings",
    initialState,
    reducers: {
        setMappings: (state, {payload}: {payload: {key: string, value: TorrentMappings[]}})=>{
            state[payload.key] = payload.value
        },
        removeMappings: (state, {payload}: {payload: string})=>{
            delete(state[payload])
        }
    }
})


export const {removeMappings, setMappings} = torrentMappingsSlice.actions
export default torrentMappingsSlice