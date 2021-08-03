import FieldsAccordion from "../FormFields/FieldsAccordion";
import React, {useEffect, useMemo, useState} from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const buildScoreCard = (selectedCourse, selectedUsers) => {
    return selectedCourse?.holes?.map((hole) => {
        return (
            {
                scoreCardHoleFormInputs: {
                    id:             `${selectedCourse.id}-${selectedCourse.name}-hole-${hole?.id}`,
                    accordionLabel: `HOLE ${hole?.hole} sponsor ${hole?.advertiser}`,
                    inputs:         selectedUsers.map(user => {
                        return {
                            id:    `${selectedCourse.id}-${selectedCourse.name}-${hole.id}-${hole?.hole}-${user.id}`,
                            type:  'text',
                            label: user?.displayOption
                        }
                    })
                }
            }
        )
    })
}

const ScoreCardContent = ({golferStats, setGolferStats, selectedUsers, selectedCourse}) => {
    const [scoreCard, setScoreCard] = useState()

    console.log(selectedCourse)
    useEffect(() => {
        if(!selectedUsers['multi-select-course-selection-form-availableUsers']){
            setScoreCard(buildScoreCard(selectedCourse, selectedUsers))
        }

    }, [selectedUsers, selectedCourse]);


    return (
        <>
            {!scoreCard
             ? <CircularProgress color='inherit' size={20}/>
             : scoreCard?.map((holeData, index) => {
                    return (
                        <FieldsAccordion
                            setFormData={setGolferStats}
                            formData={golferStats}
                            startExpanded={false}
                            fieldsObject={holeData.scoreCardHoleFormInputs}
                            key={`${index}-field-accordian`}
                        />
                    )
                })}
        </>

    );
}

export default ScoreCardContent;
