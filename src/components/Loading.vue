<template>
    <v-dialog :scrim="false" persistent width="auto">
        <v-card color="rgb(108, 108, 108)" class="transparent-card">
            <v-card-text>
                Loading...
                <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>
    
<script>
export default {
    name: "LoadingView",
    data() {
        return {};
    }
};
</script>
    
<style></style>