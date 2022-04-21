<template>
    <div class="restaurant--row">
        <h2 class="title">
            Nos restaurant
        </h2>
        <div class="wrapper--card">
            <!-- 3 importation dans le template -->
            <RestaurantCard v-for="(card,index) in tree_restaurant" :info_restaurant ="card" :key='index'/>
        </div> 
    </div>
</template>

<script>
// 1- appeler le componenent
import RestaurantCard from './RestaurantCard.vue'
export default {
    name: "RestaurantRow",
// 2- puis initialiser le component    
    components: {
        RestaurantCard,
    },
    props : {
        tree_restaurant:Array
    }
}
</script>

<style lang="scss">
.restaurant--row {
    .title {
        font-size: 2rem;
    }
    .wrapper--card {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
}

</style>