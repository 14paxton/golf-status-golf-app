import FieldsAccordion from "../FormFields/FieldsAccordion";
import React, {useEffect, useState} from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const buildScoreCard = (selectedCourse, selectedUsers) => {
    return selectedCourse?.holes?.map((hole) => {
        return (
            {
                scoreCardHoleFormInputs: {
                    id:             `${hole?.hole}`,
                    accordionLabel: <span>{`HOLE ${hole?.hole}/  Sponsor: ${hole?.advertiser}/   Par: ${hole?.par}`}</span>,
                    inputs:         selectedUsers.map(user => {
                        return {
                            id:    `${user.displayOption}`,
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
