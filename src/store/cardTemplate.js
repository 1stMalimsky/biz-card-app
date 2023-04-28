import { createSlice } from "@reduxjs/toolkit";

const initialState = [{
    name: "Title",
    stateName: "title"
},
{
    name: "Sub Title",
    stateName: "subTitle"
},
{
    name: "Description",
    stateName: "description"
},
{
    name: "Address",
    stateName: "address"
},
{
    name: "Image Url",
    stateName: "url"
},
{
    name: "Image Alt",
    stateName: "alt"
},
{
    name: "Phone Number",
    stateName: "phone"
},
]

const cardTemplateSlice = createSlice({
    name: "cardTemplate",
    initialState,
    reducers: {
        returnState() {
            return initialState;
        },
    },
});

export const cardTemplateActions = cardTemplateSlice.actions;

export default cardTemplateSlice.reducer;