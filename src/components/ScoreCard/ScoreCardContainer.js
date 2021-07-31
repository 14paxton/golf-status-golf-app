import GridLayout from "../ReuseableComponents/GridLayout";
import ScoreCard from "./ScoreCard";
import {useRef, useState} from "react";
import ScoreCardContent from "./ScoreCardContent";

const ScoreCardContainer = () => {
    const scoreCardFormRef = useRef()


    const buttonArray = [
        {type: 'button', label: 'Reset', color: 'secondary', action: console.log('clear')},
        {type: 'submit', label: 'Publish Score', color: 'primary', action: () => console.log('submit')}
    ]

    return (
        <GridLayout buttonArray={buttonArray}>
            <ScoreCard scoreCardFormRef={scoreCardFormRef}/>
        </GridLayout>
    );
};

export default ScoreCardContainer;
