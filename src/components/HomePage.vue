<template>
    <div class="home">
        <div class="header">
            <img src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/ee037401cb5d31b23cf780808ee4ec1f.svg" alt="logo uber eats">
            <div class="wrapper--input">
            <!-- vmodel pour lier un ref  user_restaurant-->
            <input v-model="user_search_restaurant" type="text" placeholder="De quoi avez vous envie ?">
            <div class="search">
            <!-- boucle sur chaque restaurant de la recherche -->
                <div v-for="(restaurant,index) in search_restaurant" :key='index' class="container--restaurant--search">
                    <div class="wrapper--img">
                        <img :src="restaurant.image" alt="image restaurant">
                    </div>
                    <p>{{restaurant.name}}</p>
                </div>
            </div>
        </div>
        </div>
        <div class="banniere"></div>
        <!-- declare dans le template    -->
        <!-- ajoute de la props restaure pour recupêrer les data -->
        <RestaurantRow v-for="(data,index) in data_restaurant" :key='index' :tree_restaurant="data"/>
    </div>
</template>

<script>
//IMPORT
import BDD from '../BDD';
// destructuring appleler directement de vue
//watch regarder une variable
import { onMounted,ref ,watch} from 'vue';
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
        //ref un accès direct aux éléments DOM sous-jacents. Pour ce faire, nous pouvons utiliser l' refattribut spécial
        //ref communiquer au v-for que la valeur de data restaurant a changer , il prend en compte en consequence
        let data_restaurant = ref([]);
        let all_restaurant = []
            // ou function makerestaurant()
            //boucle restaurant boucle sur chaque element de la bdd
        const makeDataRestaurant = () => {
            //création d'un tableau
            let three_restaurant = [];
            for (const restaurant of BDD) {
                //creation de l'objet (new restaurant avec toute les proprieter de l'objet boucler)
                const new_restaurant = new Restaurant(restaurant.name,restaurant.note,restaurant.image,restaurant.drive_time);
               //si tree restaurant a deja 2 objet (class)
               //tableaux pour recuperer tous les restaurant
                all_restaurant.push(new_restaurant);
                if (three_restaurant.length == 2) {
                // chaque tour de boucle ont push le new restaurant dans le tableau
                three_restaurant.push(new_restaurant);
                //.value faire reference au tableau datarestaurant (egale la valuer dans la reference)
                data_restaurant.value.push(three_restaurant);
                //et on vide tree restaurant
                three_restaurant = [];
                } else {
                three_restaurant.push(new_restaurant);
                }
            }
        }
        //User search restaurant
        //ref un accès direct aux éléments DOM sous-jacents. Pour ce faire, nous pouvons utiliser l' refattribut spécial
        let user_search_restaurant = ref('');
        //permet de changer un tableau q'uil soit imutablke dinamique
        let search_restaurant = ref([]);
        //regarder une variable avec watch 2param (variable regarder,)
        watch(user_search_restaurant,new_value => {
            //regex verifier les  caractere
            let regex = RegExp(new_value.toLowerCase());  //retourne en minuscule  
            //tester les chaine de caractere ,teste le nom des restaurant
            let new_search_restaurant = all_restaurant.filter(restaurant => regex.test(restaurant.name.toLowerCase()));//retourne en minuscul
            // si le tableau et vide  , on recherch rien on retourne un tableaux vide
            if (new_value == 0) {
                search_restaurant.value = []
            } else {
                //sinon tout passe dans le tableaux
                //changer la vulue de la reference
                search_restaurant.value = new_search_restaurant;
            }
        })

        //cycle de vie au moment de l'affichage de l'aaplication
        onMounted(makeDataRestaurant);

        //return dans le template
        return  {
                data_restaurant,
                user_search_restaurant,
                search_restaurant
            }
    },
}
</script>

<style lang ="scss">
.home {
    .header {
        height: 120px;
        width:100%;
        display: flex;
        align-items: center; 
        justify-content: space-between;
        img {
            width: 150px; 
        }
        .wrapper--input {
            position:relative;
            input {
                background-color:#f6f6f6;
                border: none;
                height: 60px;
                width: 400px;
                outline:none;
                padding-left: 20px;
            }
            .search{
                position: absolute;
                top:100%;
                width: 100%;
                background-color: #fff;
                overflow: hidden;
                .container--restaurant--search {
                    display: flex;
                    align-items: center;
                    padding: 10px;
                    &:hover {
                        background-color:#f6f6f6  
                    }

                    .wrapper--img{
                        height: 60px;
                        width: 60px;
                        img {
                            height: 100%;
                            width: auto;
                            margin-right: 25px;
                            border-radius:50%
                        }
                    }
                    p {
                        margin-left: 16px;
                    }
                }
            }    
        }
    }
    .banniere {
        height:200px;
        width:100%;
        background-image: url('https://www.ubereats.com/restaurant/_static/7b308f7cbbf8e335ceda0447a8bd7c63.png');
        background-position: bottom center;
    }
}


</style> 