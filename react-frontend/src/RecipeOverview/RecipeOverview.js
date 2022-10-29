import styles from './RecipeOverview.module.css'

import RecipeCard from './RecipeCard/RecipeCard';

export default function RecipeOverview(){
    return (
        <div className={styles.container}>
            {Array(20).fill(null).map( () => <RecipeCard/>)}
        </div>
    );
}