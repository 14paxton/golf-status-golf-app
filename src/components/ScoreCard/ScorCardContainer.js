import {useForm, FormProvider} from "react-hook-form";
import {useRef} from "react";
import GridLayout from "../ReuseableComponents/GridLayout";
import ScoreCard from "./ScoreCard";

const ScoreCardContainer = () => {
    const methods = useForm();
    const scoreCardForm = useRef()
    const {handleSubmit, reset} = methods;
    const onSubmit = data => console.log(data);
    const clearForm = reset()

    const buttonArray = [
        {label: 'Reset', color: 'white', action: () => onSubmit},
        {label: 'Publish Score', color: 'primary', action: clearForm}
    ]

    return (
        <FormProvider {...methods}>
            <form ref={scoreCardForm} onSubmit={handleSubmit(onSubmit)}>
                <GridLayout buttonArray={buttonArray}>
                    <ScoreCard/>
                </GridLayout>
            </form>
        </FormProvider>

    );
};

export default ScoreCardContainer;
