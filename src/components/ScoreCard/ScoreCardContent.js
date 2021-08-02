import FieldsAccordion from "../FormFields/FieldsAccordion";

const scoreCard = [...Array(9)].map((e, index) => {
    return (
        {
            scoreCardHoleFormInputs: {
                id:             `hole-${index + 1}-golfers`,
                accordionLabel: `HOLE ${index + 1}`,
                inputs:         [
                    {
                        id:    `hole-${index + 1}-golfer-brandon`,
                        type:  'text',
                        label: "Brandon"
                    },
                    {
                        id:    `hole-${index + 1}-golferted`,
                        type:  'text',
                        label: "Ted"
                    },
                    {
                        id:    `hole-${index + 1}-golferduane`,
                        type:  'text',
                        label: "Duane"
                    }
                ]
            }
        }
    )
})

const ScoreCardContent = ({golferStats, setGolferStats}) => {

    return (
        scoreCard.map((holeData, index) => {
            return (
                <FieldsAccordion
                    setFormData={setGolferStats}
                    formData={golferStats}
                    startExpanded={false}
                    fieldsObject={holeData.scoreCardHoleFormInputs}
                    key={`${index}-field-accordian`}
                />
            )
        })
    );
}

export default ScoreCardContent;
