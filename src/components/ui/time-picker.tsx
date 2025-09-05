import React from 'react'
import { Label } from './label'
import { Input } from './input'

const TimePicker = () => {
    return (
        <div className="flex flex-col gap-3">
            <Label htmlFor="time-picker" className="px-1">
                Time
            </Label>
            <Input
                type="time"
                id="time-picker"
                step="1"
                defaultValue="10:30:00"
                className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
            />
        </div>
    )
}

export default TimePicker