import GridLayout from "../ReuseableComponents/GridLayout";
import ScoreCard from "./ScoreCard";
import {useCallback, useEffect, useRef, useState} from "react";
import ScoreCardContent from "./ScoreCardContent";
import CourseSelection from "./CourseSelection";
import {useForm} from "react-hook-form";
import {FormEnums} from "../Util/enums";

const ScoreCardContainer = () => {
    const {COURSE_SELECTION_FORM, SCORE_CARD_FORM} = FormEnums
    const [selectedUsers, setSelectedUsers] = useState()
    const [selectedCourse, setSelectedCourse] = useState()
    const [submitLabel, setSubmitLabel] = useState('Create Round')
    const [formType, setFormType] = useState(COURSE_SELECTION_FORM.enumKey)
    const methods = useForm();

    const handleCourseSelectionSubmit = (data) => {
        setSelectedUsers(data)
        setSelectedCourse(data)
        setSubmitLabel('Publish')
        setFormType(SCORE_CARD_FORM.enumKey)
    }

    const resetForms = () => {
        setSelectedUsers(null)
        setSelectedCourse(null)
        setSubmitLabel('Create Round')
        setFormType(COURSE_SELECTION_FORM.enumKey)
    }


    const buttonArray = [
        {
            id:     'clearForm',
            type:   'button',
            label:  'Reset',
            color:  'secondary',
            action: resetForms
        },
        {
            id:    'submitForm',
            form:  formType,
            type:  'submit',
            label: submitLabel,
            color: 'primary',
        }
    ]

    return (
        <GridLayout buttonArray={buttonArray}>
            {(selectedUsers && selectedCourse)
             ? <ScoreCard methods={methods}/>
             : <CourseSelection
                 methods={methods}
                 handleSubmit={handleCourseSelectionSubmit}
             />
            }
        </GridLayout>
    );
};

export default ScoreCardContainer;
