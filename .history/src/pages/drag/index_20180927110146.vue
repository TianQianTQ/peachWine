<template>
  <div class='container'>
    <ul class='myul'>
        <li class='myli'
          v-for='(item, index) in liList'
          :key='index'
          :dataIndex="index"
            draggable="true"
            @click="attackerItemEvent(item, index)"
            @dragstart="dragStart($event, item)"
            @dragover="dragOver($event, item)"
            @dragend="dragEnd($event, item)"
            @drop="drop($event, item)"
        ></li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>
<style scoped>
.myul{
    display:flex;
    align-items: center;
    justify-content:center;
    width: 100%;
    height: 100%;

}
.myli{
    width:300px;
    height:300px;
    border:1px solid red;
    margin:auto 20px;
}

</style>
