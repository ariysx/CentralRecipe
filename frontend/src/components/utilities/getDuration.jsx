export default function GetRecipeDuration({recipe}){
    const getDuration = () => {
        let total = (recipe.duration[0].cooking.hour * 60) + recipe.duration[0].cooking.minute
        total += (recipe.duration[0].preparation.hour * 60) + recipe.duration[0].preparation.minute
        total += (recipe.duration[0].rest.hour * 60) + recipe.duration[0].rest.minute

        let x = 60
        let y = total
        let div = Math.trunc(y/x);
        // let rem = y % x;

        if(total < 60){
            return total + ' Mins'
        } else {
            // return div + ':' + rem + ' Hours'
            return div + ' Hours'
        }
    }

    return (
        <>
            {getDuration()}
        </>
    )
}