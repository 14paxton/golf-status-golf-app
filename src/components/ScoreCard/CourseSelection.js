import React, {useEffect, useRef, useState} from "react";
import {getUsersSelectionList} from "../../services/userService";
import MultiSelectAutoComplete from "../FormFields/MultiSelectAutoComplete";
import {FormProvider, useForm, useFormContext} from "react-hook-form";
import {fetchGolfCourses} from "../../services/golfCourseService";
import DropDownSelect from "../FormFields/DropDownSelect";
import {FormEnums} from "../Util/enums";

const CourseSelection = ({ methods, handleSubmit}) => {
    const formRef = useRef()
    const [courseList, setCourseList] = useState([]);
    const [userList, setUserList] = useState([]);

    useEffect(async () => {
        const [users, courses] = await Promise.all([
            getUsersSelectionList(),
            fetchGolfCourses()
        ]);

        setUserList(users);
        setCourseList(courses)
    }, []);

    const onSubmit = (data) => {
        console.log(data)
        console.log(methods.getValues())
        handleSubmit(data)
    };

    return (
        <>
            <FormProvider {...methods}>
                <form id={FormEnums.COURSE_SELECTION_FORM.enumKey} ref={formRef} onSubmit={methods.handleSubmit(onSubmit)}>
                    <MultiSelectAutoComplete
                        parentFormId={'course-selection-form'}
                        inputObject={userList ?? []}
                    />
                    <DropDownSelect
                        parentFormId={'course-selection-form'}
                        inputObject={courseList ?? []}
                    />
                </form>
            </FormProvider>
        </>
    );
};

export default CourseSelection;
