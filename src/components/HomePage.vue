<template>
    <div class="home">
        <!-- declare dans le template    -->
        <RestaurantRow/>
    </div>
</template>

<script>
//IMPORT
import BDD from '../BDD';
import { onMounted } from 'vue';
//COMPONENTS
import RestaurantRow from "./RestaurantRow.vue"
export default {
    name:'HomePage',
    // COMPONENTS (instancier)
    components: {
    RestaurantRow,
    },
    //Le setup()hook sert de point d'entrée pour l'utilisation de l'API de composition dans les composants dans les cas suivants :
    //Utilisation de l'API de composition sans étape de génération ;
    //Intégration avec le code basé sur Composition-API dans un composant API Options.
    setup() {
        //model de donnée
        class Restaurant {
            constructor(name,note,image,drive_time) {
                this.name = name,
                this.note = note,
                this.image = image,
                this.drive_time = drive_time
            }
        }
        //tableaux qui contiendra les restaurant (3 resto par default de restaurantrow)
        let data_restaurant = []
            // ou function makerestaurant()
            //boucle restaurant boucle sur chaque element de la bdd
        const makeDataRestaurant = () => {
            //création d'un tableau
            let three_restaurant = [];
            for (const restaurant of BDD) {
                //creation de l'objet (new restaurant avec toute les proprieter de l'objet boucler)
                const new_restaurant = new Restaurant(restaurant.name,restaurant.note,restaurant.image,restaurant.drive_time);
               //si tree restaurant a deja 2 objet (class)
                if (three_restaurant.length == 2) {
                // chaque tour de boucle ont push le new restaurant dans le tableau
                three_restaurant.push(new_restaurant);
                data_restaurant.push(three_restaurant);
                //et on vide tree restaurant
                three_restaurant = [];
                } else {
                three_restaurant.push(new_restaurant);
                }
            }
            console.log(data_restaurant);
        }
        //cycle de vie au moment de l'affichage de l'aaplication
        onMounted(makeDataRestaurant)
    },
}
</script>

<style>

</style>