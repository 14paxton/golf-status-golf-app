import Tabs from "../ReuseableComponents/Tabs";
import { useState} from "react";
import ScoreCardContent from "./ScoreCardContent";
import {FormProvider, useForm, useFormContext} from "react-hook-form";
import {FormEnums} from "../Util/enums";


const styles = {
    color:           '#68C222',
    width:           '33.3%',
    backgroundColor: '#FFFFFF',
    fontSize:        15,
    minWidth:        '50%', textTransform: 'none'
};


const ScoreCard = ({formRef, selectedUsers, selectedCourse}) => {
    const methods = useForm();
    const [golferStats, setGolferStats] = useState();
    const {handleSubmit,  getValues} = methods;
    const onSubmit = data => console.log(getValues());
    const handleChange = (value) => {
        setGolferStats({...getValues(), ...value})
    }

    const tabs = [
        {
            key:     '1',
            label:   "Score Card",
            content: (<ScoreCardContent
                golferStats={golferStats}
                setGolferStats={handleChange}
                selectedUsers={selectedUsers}
                selectedCourse={selectedCourse}
            />)
        },
        {
            key:     '2',
            label:   "Current Standings",
            content: (
                         <div>Current Standings</div>
                     )
        }
    ]

    return (
        <FormProvider {...methods}>
            <form id={FormEnums.SCORE_CARD_FORM.enumKey} ref={formRef} onSubmit={handleSubmit(onSubmit)}>
                <Tabs
                    tabs={tabs}
                    indicatorColor={'primary'}
                    styling={styles}
                    tabMenuColor={'#FFFFFF'}
                />
            </form>
        </FormProvider>
    );
}

export default ScoreCard;
