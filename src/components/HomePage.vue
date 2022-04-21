<template>
    <div class="home">
     <!-- declare dans le template    -->
     <RestaurantRow/>
    </div>
</template>

<script>
//import
import RestaurantRow from "./RestaurantRow.vue"
export default {
    name:'HomePage',
    //instancier
    components: {
    RestaurantRow,
}
}
</script>

<style>

</style>