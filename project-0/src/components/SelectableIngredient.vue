<script lang="ts">
import Tag from './Tag.vue';

export default {
    data() {
        return {
            selected: false,
        };
    },
    props: {
        ingredient: { type: String, required: true }
    },
    components: { Tag },
    methods: {
        onClick() {
            this.selected = !this.selected;

            if (this.selected) {
                this.$emit("addIngredient", this.ingredient);
            }
        }
    },
    emits: ["addIngredient"],
}
</script>

<template>
    <button
        class="ingrediente"
        @click="onClick"
        :aria-pressed="selected"
    >
        <Tag :text="ingredient" :active="selected"/>
    </button>
</template>

<style scoped>
.ingrediente {
    cursor: pointer;
}
</style>
