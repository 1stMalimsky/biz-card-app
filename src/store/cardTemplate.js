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
{
    name: "Country",
    stateName: "country"
},
{
    name: "City",
    stateName: "city"
},
{
    name: "Street",
    stateName: "street"
},
{
    name: "House Number",
    stateName: "houseNumber"
},
{
    name: "Zipcode",
    stateName: "zipCode"
},
{
    name: "Website",
    stateName: "web"
},
{
    name: "Email Address",
    stateName: "email"
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