"use client"
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Select, MenuItem, TextField } from "@mui/material";

export default function Reserve() {
    return (
        <div className="bg-slate-100 rounded-lg w-[300px] px-6 py-5 flex flex-col gap-4 shadow-lg">
            {/* Name Input */}
            <TextField name="Name-Lastname" label="Name-Lastname" variant="standard" className="w-full" />

            {/* Contact Number */}
            <TextField name="Contact-Number" label="Contact-Number" variant="standard" className="w-full" />

            {/* Venue Selector */}
            <Select variant="standard" name="venue" id="venue" className="w-full">
                <MenuItem value="Bloom">The Bloom Pavilion</MenuItem>
                <MenuItem value="Spark">Spark Space</MenuItem>
                <MenuItem value="GrandTable">The Grand Table</MenuItem>
            </Select>

            {/* Date Picker */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker className="w-full bg-white" />
            </LocalizationProvider>
        </div>
    );
}